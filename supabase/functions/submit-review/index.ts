import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// In-memory per-IP throttle (best-effort; resets on cold start)
const ipHits = new Map<string, number[]>()
const PER_IP_WINDOW_MS = 60_000 * 10 // 10 minutes
const PER_IP_MAX = 3 // max 3 submissions per IP per window

function rateLimitIp(ip: string): boolean {
  const now = Date.now()
  const arr = (ipHits.get(ip) || []).filter((t) => now - t < PER_IP_WINDOW_MS)
  if (arr.length >= PER_IP_MAX) {
    ipHits.set(ip, arr)
    return false
  }
  arr.push(now)
  ipHits.set(ip, arr)
  return true
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown'
  if (!rateLimitIp(ip)) {
    return new Response(JSON.stringify({ error: 'Troppe richieste. Riprova più tardi.' }), {
      status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const supabase = createClient(supabaseUrl, serviceKey)

  let body: any
  try { body = await req.json() } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }

  const name = String(body.name || '').trim().slice(0, 100)
  const role = String(body.role || 'Cliente').trim().slice(0, 100) || 'Cliente'
  const text = String(body.text || '').trim().slice(0, 500)
  const rating = Math.max(1, Math.min(5, parseInt(body.rating) || 5))

  if (!name || !text) {
    return new Response(JSON.stringify({ error: 'Nome e recensione obbligatori' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }

  // Global throttle: cap total inbound reviews per minute to protect inbox
  const oneMinuteAgo = new Date(Date.now() - 60_000).toISOString()
  const { count: recentCount } = await supabase
    .from('reviews')
    .select('id', { count: 'exact', head: true })
    .gte('created_at', oneMinuteAgo)
  if ((recentCount ?? 0) >= 10) {
    return new Response(JSON.stringify({ error: 'Servizio temporaneamente saturo. Riprova tra poco.' }), {
      status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const { data: inserted, error } = await supabase
    .from('reviews')
    .insert({ name, role, text, rating, status: 'pending' })
    .select('id, approval_token')
    .single()

  if (error || !inserted) {
    console.error('Insert failed', error)
    return new Response(JSON.stringify({ error: 'Impossibile salvare la recensione' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }

  const fnBase = `${supabaseUrl}/functions/v1/moderate-review`
  const approveUrl = `${fnBase}?token=${inserted.approval_token}&action=approve`
  const rejectUrl = `${fnBase}?token=${inserted.approval_token}&action=reject`

  // Trigger email notification
  try {
    await supabase.functions.invoke('send-transactional-email', {
      body: {
        templateName: 'review-notification',
        idempotencyKey: `review-${inserted.id}`,
        templateData: { name, role, text, rating, approveUrl, rejectUrl },
      },
    })
  } catch (e) {
    console.error('Email dispatch failed (review still saved):', e)
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})