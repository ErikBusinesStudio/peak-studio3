import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Peak Studio'

interface ReviewNotificationProps {
  name?: string
  role?: string
  text?: string
  rating?: number
  approveUrl?: string
  rejectUrl?: string
}

const ReviewNotificationEmail = ({
  name = 'Anonimo',
  role = '',
  text = '',
  rating = 5,
  approveUrl = '#',
  rejectUrl = '#',
}: ReviewNotificationProps) => (
  <Html lang="it" dir="ltr">
    <Head />
    <Preview>Nuova recensione da {name} — {rating}/5 stelle</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Nuova recensione in attesa</Heading>
        <Text style={textStyle}>
          Hai ricevuto una nuova recensione su {SITE_NAME}. Rivedila prima della pubblicazione.
        </Text>
        <Section style={card}>
          <Text style={meta}><strong>Nome:</strong> {name}</Text>
          {role && <Text style={meta}><strong>Ruolo:</strong> {role}</Text>}
          <Text style={meta}><strong>Valutazione:</strong> {'★'.repeat(rating)}{'☆'.repeat(5 - rating)} ({rating}/5)</Text>
          <Hr style={hr} />
          <Text style={quote}>"{text}"</Text>
        </Section>
        <Section style={{ textAlign: 'center', margin: '30px 0' }}>
          <Button href={approveUrl} style={approveBtn}>Approva e pubblica</Button>
          <Text style={{ margin: '12px 0' }}>
            <a href={rejectUrl} style={rejectLink}>Rifiuta recensione</a>
          </Text>
        </Section>
        <Text style={footer}>{SITE_NAME} — Sistema di moderazione recensioni</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ReviewNotificationEmail,
  subject: 'Nuova recensione in attesa di approvazione',
  displayName: 'Notifica nuova recensione',
  to: 'erikbaraca119@gmail.com',
  previewData: {
    name: 'Mario Rossi',
    role: 'Cliente',
    text: 'Servizio eccellente, super consigliato!',
    rating: 5,
    approveUrl: 'https://example.com/approve',
    rejectUrl: 'https://example.com/reject',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#000000', margin: '0 0 16px' }
const textStyle = { fontSize: '14px', color: '#55575d', lineHeight: '1.5', margin: '0 0 20px' }
const card = { backgroundColor: '#f7f7f8', border: '1px solid #e5e5e7', borderRadius: '8px', padding: '20px' }
const meta = { fontSize: '14px', color: '#1a1a1a', margin: '4px 0' }
const quote = { fontSize: '15px', color: '#1a1a1a', fontStyle: 'italic', lineHeight: '1.6', margin: '8px 0 0' }
const hr = { borderColor: '#e5e5e7', margin: '14px 0' }
const approveBtn = { backgroundColor: '#16a34a', color: '#ffffff', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }
const rejectLink = { color: '#dc2626', fontSize: '13px', textDecoration: 'underline' }
const footer = { fontSize: '12px', color: '#999999', margin: '24px 0 0', textAlign: 'center' as const }