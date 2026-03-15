import { useState } from 'react';

/**
 * useIbanEmail — Sends IBAN coordinates to the participant's email
 * via the Netlify function sendIbanEmail
 */
export function useIbanEmail() {
  const [sending, setSending] = useState(false);

  const sendIban = async ({ name, email, giftName, amount }) => {
    if (!email || !email.includes('@')) return;
    setSending(true);
    try {
      await fetch('/.netlify/functions/sendIbanEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, giftName, amount }),
      });
    } catch (err) {
      console.error('Failed to send IBAN email:', err);
    } finally {
      setSending(false);
    }
  };

  return { sendIban, sending };
}
