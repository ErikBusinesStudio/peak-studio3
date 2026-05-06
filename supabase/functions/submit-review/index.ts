import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
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