import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

interface ContactPayload {
  name: string
  email: string
  message: string
}

function jsonResponse(data: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

function validate(body: unknown): ContactPayload | string {
  if (!body || typeof body !== 'object') return 'Invalid body'
  const b = body as Record<string, unknown>
  const name = typeof b.name === 'string' ? b.name.trim() : ''
  const email = typeof b.email === 'string' ? b.email.trim() : ''
  const message = typeof b.message === 'string' ? b.message.trim() : ''
  if (!name || name.length > 200) return 'Nome non valido'
  const isEmail = /^\S+@\S+\.\S+$/.test(email)
  const isPhone = /^\+?[\d\s().-]{6,20}$/.test(email) && email.replace(/\D/g, '').length >= 6
  if (!email || email.length > 320 || (!isEmail && !isPhone)) return 'Telefono o email non validi'
  if (!message || message.length > 4000) return 'Messaggio non valido'
  return { name, email, message }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') return jsonResponse({ error: 'Method not allowed' }, 405)

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !serviceKey) return jsonResponse({ error: 'Server misconfigured' }, 500)

  let parsed: unknown
  try { parsed = await req.json() } catch { return jsonResponse({ error: 'Invalid JSON' }, 400) }
  const result = validate(parsed)
  if (typeof result === 'string') return jsonResponse({ error: result }, 400)

  const supabase = createClient(supabaseUrl, serviceKey)

  const { data: inserted, error: insertError } = await supabase
    .from('contacts')
    .insert(result)
    .select('id')
    .single()

  if (insertError) {
    console.error('contact insert failed', insertError)
    return jsonResponse({ error: 'Impossibile salvare il messaggio' }, 500)
  }

  // Best-effort: enqueue notification email. Will deliver once email domain is verified.
  try {
    const emailResp = await fetch(`${supabaseUrl}/functions/v1/send-transactional-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${serviceKey}`,
      },
      body: JSON.stringify({
        templateName: 'contact-form-notification',
        recipientEmail: 'erikbaraca119@gmail.com',
        idempotencyKey: `contact-${inserted.id}`,
        templateData: result,
      }),
    })
    if (!emailResp.ok) {
      const t = await emailResp.text()
      console.warn('email enqueue non-ok', emailResp.status, t)
    }
  } catch (err) {
    console.warn('email enqueue failed', err)
  }

  return jsonResponse({ success: true, id: inserted.id })
})