const { createClient } = require('@supabase/supabase-js');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

async function sendWhatsAppNotification({ name, giftName, amount, message }) {
  if (!process.env.WHAPI_TOKEN || !process.env.WHAPI_PHONE_NUMBER) {
    console.log('Whapi not configured, skipping WhatsApp notification...');
    return;
  }

  const text = `🎁 *Nouvelle participation liste de mariage !*\n\n👤 *${name}*\n🎁 ${giftName} — *${amount} €*${message ? `\n💬 ${message}` : ''}`;

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
        body: text,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Whapi error for ${phone}: ${response.status} - ${errorText}`);
    } else {
      console.log(`WhatsApp notification sent to ${phone}`);
    }
  }
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Méthode non autorisée' }),
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { giftId, giftName, name, email, amount, message } = data;

    if (!giftId || !email || !amount || amount < 1) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, message: 'Données incomplètes' }),
      };
    }

    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ success: false, message: 'Configuration base de données manquante' }),
      };
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: existing } = await supabase
      .from('wedding_contributions')
      .select('id')
      .eq('email', email)
      .eq('gift_id', giftId)
      .maybeSingle();

    if (existing) {
      return {
        statusCode: 409,
        headers,
        body: JSON.stringify({ success: false, message: 'Tu as déjà participé à ce cadeau.' }),
      };
    }

    const { error } = await supabase.from('wedding_contributions').insert([{
      gift_id: giftId,
      name: name || 'Anonyme',
      email,
      amount: parseInt(amount, 10),
      message: message || '',
    }]);

    if (error) {
      console.error('Erreur Supabase:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ success: false, message: "Erreur lors de l'enregistrement" }),
      };
    }

    try {
      await sendWhatsAppNotification({
        name: name || 'Anonyme',
        giftName: giftName || `Cadeau #${giftId}`,
        amount: parseInt(amount, 10),
        message,
      });
    } catch (whatsappError) {
      console.error('WhatsApp error:', whatsappError);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Participation enregistrée avec succès' }),
    };
  } catch (error) {
    console.error('Erreur:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, message: 'Erreur serveur' }),
    };
  }
};
