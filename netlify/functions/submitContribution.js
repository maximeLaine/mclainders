const { createClient } = require('@supabase/supabase-js');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

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
    const { giftId, name, email, amount, message } = data;

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
        body: JSON.stringify({ success: false, message: 'Erreur lors de l\'enregistrement' }),
      };
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
