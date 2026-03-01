const { createClient } = require('@supabase/supabase-js');

/**
 * Fetch all RSVPs and recent RSVPs (last 14 days) from Supabase
 */
async function getRSVPData() {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

  const { data: allRsvps, error: allError } = await supabase
    .from('rsvp')
    .select('*')
    .order('created_at', { ascending: false });

  if (allError) throw allError;

  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  const { data: recentRsvps, error: recentError } = await supabase
    .from('rsvp')
    .select('*')
    .gte('created_at', twoWeeksAgo.toISOString())
    .order('created_at', { ascending: false });

  if (recentError) throw recentError;

  return { allRsvps, recentRsvps };
}

/**
 * Format the bi-weekly summary message
 */
function formatSummaryMessage(allRsvps, recentRsvps) {
  const total = allRsvps.length;
  const attendingSaturday = allRsvps.filter(r => r.presence_saturday).length;
  const attendingSunday = allRsvps.filter(r => r.presence_sunday).length;
  const absent = allRsvps.filter(r => !r.presence_saturday && !r.presence_sunday).length;
  const withChildren = allRsvps.filter(r => r.with_children).length;
  const totalChildren = allRsvps.reduce((sum, r) => sum + (r.children_count || 0), 0);

  const today = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  let message = `📊 *Bilan RSVP - ${today}*\n\n`;
  message += `📨 *Réponses totales :* ${total}\n\n`;
  message += `✅ *Présents samedi :* ${attendingSaturday}\n`;
  message += `✅ *Présents dimanche :* ${attendingSunday}\n`;

  if (withChildren > 0) {
    message += `👶 *Avec enfants :* ${withChildren} (${totalChildren} enfant${totalChildren > 1 ? 's' : ''})\n`;
  }

  message += `❌ *Absents :* ${absent}\n`;

  if (recentRsvps.length > 0) {
    message += `\n📅 *Nouvelles réponses (14 derniers jours) :* ${recentRsvps.length}\n`;

    const displayed = recentRsvps.slice(0, 10);
    for (const rsvp of displayed) {
      const sat = rsvp.presence_saturday ? '✅' : '❌';
      const sun = rsvp.presence_sunday ? '✅' : '❌';
      message += `• ${rsvp.first_name} ${rsvp.last_name} — Sam ${sat} Dim ${sun}\n`;
    }

    if (recentRsvps.length > 10) {
      message += `... et ${recentRsvps.length - 10} autre(s)\n`;
    }
  } else {
    message += `\n📅 *Aucune nouvelle réponse ces 14 derniers jours*\n`;
  }

  return message;
}

/**
 * Send WhatsApp message via Whapi to all configured phone numbers
 */
async function sendWhatsAppMessage(message) {
  if (!process.env.WHAPI_TOKEN || !process.env.WHAPI_PHONE_NUMBER) {
    console.log('Whapi not configured, skipping WhatsApp summary...');
    return;
  }

  const phoneNumbers = process.env.WHAPI_PHONE_NUMBER.split(',').map(n => n.trim());

  for (const phone of phoneNumbers) {
    const response = await fetch('https://gate.whapi.cloud/messages/text', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WHAPI_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: `${phone}@s.whatsapp.net`,
        body: message,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Whapi error for ${phone}: ${response.status} - ${errorText}`);
    } else {
      console.log(`WhatsApp summary sent to ${phone}`);
    }
  }
}

/**
 * Scheduled function — runs on the 1st and 15th of each month at 9:00 UTC
 * Configured in netlify.toml: schedule = "0 9 1,15 * *"
 *
 * Manual test trigger (POST with secret token):
 *   curl -X POST https://mclainders.netlify.app/.netlify/functions/rsvpBiweeklySummary \
 *     -H "x-test-token: <SUMMARY_TEST_TOKEN>" \
 *     -H "Content-Type: application/json"
 */
exports.handler = async (event) => {
  // Allow manual HTTP trigger for testing (requires WHAPI_TOKEN as auth)
  if (event && event.httpMethod === 'POST') {
    const token = event.headers && event.headers['x-test-token'];
    if (!process.env.WHAPI_TOKEN || token !== process.env.WHAPI_TOKEN) {
      return { statusCode: 401, body: 'Unauthorized' };
    }
  }

  try {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
      console.error('Supabase not configured');
      return { statusCode: 500, body: 'Supabase not configured' };
    }

    const { allRsvps, recentRsvps } = await getRSVPData();
    const message = formatSummaryMessage(allRsvps, recentRsvps);
    await sendWhatsAppMessage(message);

    console.log(`Bi-weekly RSVP summary sent: ${allRsvps.length} total RSVPs, ${recentRsvps.length} recent`);
    return { statusCode: 200, body: 'Summary sent' };
  } catch (error) {
    console.error('Error sending bi-weekly RSVP summary:', error);
    return { statusCode: 500, body: 'Error sending summary' };
  }
};
