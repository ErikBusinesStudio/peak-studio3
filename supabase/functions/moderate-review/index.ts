import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function htmlPage(title: string, message: string, color = '#16a34a'): Response {
  const html = `<!DOCTYPE html><html lang="it"><head><meta charset="utf-8"><title>${title}</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{font-family:-apple-system,BlinkMacSystemFont,Arial,sans-serif;background:#0a0a0a;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:24px}
.card{background:#161616;border:1px solid #262626;border-radius:14px;padding:36px;max-width:460px;text-align:center}
h1{color:${color};margin:0 0 12px;font-size:22px}p{color:#a3a3a3;line-height:1.6;margin:0}</style>
</head><body><div class="card"><h1>${title}</h1><p>${message}</p></div></body></html>`
  return new Response(html, { status: 200, headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' } })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  const url = new URL(req.url)
  const token = url.searchParams.get('token')
  const action = url.searchParams.get('action')

  if (!token || (action !== 'approve' && action !== 'reject')) {
    return htmlPage('Link non valido', 'Il link di moderazione non è valido.', '#dc2626')
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const supabase = createClient(supabaseUrl, serviceKey)

  const { data: review, error } = await supabase
    .from('reviews')
    .select('id, status, name')
    .eq('approval_token', token)
    .maybeSingle()

  if (error || !review) {
    return htmlPage('Recensione non trovata', 'Il token non corrisponde a nessuna recensione.', '#dc2626')
  }

  if (review.status !== 'pending') {
    return htmlPage(
      'Già moderata',
      `Questa recensione è già stata ${review.status === 'approved' ? 'approvata' : 'rifiutata'}.`,
      '#f59e0b',
    )
  }

  const newStatus = action === 'approve' ? 'approved' : 'rejected'
  const { error: updateError } = await supabase
    .from('reviews')
    .update({ status: newStatus, reviewed_at: new Date().toISOString() })
    .eq('id', review.id)

  if (updateError) {
    console.error('Update failed', updateError)
    return htmlPage('Errore', 'Non è stato possibile aggiornare la recensione.', '#dc2626')
  }

  if (newStatus === 'approved') {
    return htmlPage('Recensione approvata ✓', `La recensione di ${review.name} è ora pubblicata sul sito.`, '#16a34a')
  }
  return htmlPage('Recensione rifiutata', `La recensione di ${review.name} è stata rifiutata e non sarà pubblicata.`, '#dc2626')
})