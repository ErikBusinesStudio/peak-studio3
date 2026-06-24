import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  message?: string
}

const Email = ({ name, email, message }: Props) => (
  <Html lang="it" dir="ltr">
    <Head />
    <Preview>Nuovo contatto da {name || 'visitatore'} — Peak Studio</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Nuovo messaggio dal sito</Heading>
        <Text style={muted}>Hai ricevuto una richiesta dal form di Peak Studio.</Text>
        <Hr style={hr} />
        <Section style={row}>
          <Text style={label}>Nome</Text>
          <Text style={value}>{name || '—'}</Text>
        </Section>
        <Section style={row}>
          <Text style={label}>Email</Text>
          <Text style={value}>{email || '—'}</Text>
        </Section>
        <Section style={row}>
          <Text style={label}>Messaggio</Text>
          <Text style={value}>{message || '—'}</Text>
        </Section>
        <Hr style={hr} />
        <Text style={muted}>Rispondi direttamente all'indirizzo del visitatore per iniziare la conversazione.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (data: Record<string, any>) => `Nuovo contatto: ${data?.name || 'visitatore'} — Peak Studio`,
  displayName: 'Contact form notification',
  to: 'erikbaraca119@gmail.com',
  previewData: {
    name: 'Mario Rossi',
    email: 'mario@example.com',
    message: 'Ciao, vorrei un sito per la mia pizzeria.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', padding: '24px 0' }
const container = { backgroundColor: '#ffffff', padding: '32px 28px', maxWidth: '560px', margin: '0 auto', border: '1px solid #eeeeee', borderRadius: '12px' }
const h1 = { color: '#130008', fontSize: '22px', fontWeight: 700, margin: '0 0 8px' }
const muted = { color: '#666666', fontSize: '13px', lineHeight: '20px', margin: '4px 0' }
const hr = { borderColor: '#eeeeee', margin: '20px 0' }
const row = { margin: '12px 0' }
const label = { color: '#A21330', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, margin: '0 0 4px' }
const value = { color: '#111111', fontSize: '15px', lineHeight: '22px', margin: 0, whiteSpace: 'pre-wrap' as const }