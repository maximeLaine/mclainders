const { createClient } = require('@supabase/supabase-js');

/**
 * Netlify function to redirect to WhatsApp without exposing the phone number
 * The phone number is fetched server-side and never sent to the client
 */

const STATUS_OK = 200;
const STATUS_REDIRECT = 302;
const STATUS_BAD_REQUEST = 400;
const STATUS_NOT_FOUND = 404;
const STATUS_SERVER_ERROR = 500;

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

exports.handler = async (event) => {
  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: STATUS_OK, headers, body: '' };
  }

  // Only allow GET
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: STATUS_BAD_REQUEST,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { id } = event.queryStringParameters || {};

    if (!id) {
      return {
        statusCode: STATUS_BAD_REQUEST,
        headers,
        body: JSON.stringify({ error: 'Missing carpool offer ID' }),
      };
    }

    // Initialize Supabase client
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase configuration');
      return {
        statusCode: STATUS_SERVER_ERROR,
        headers,
        body: JSON.stringify({ error: 'Server configuration error' }),
      };
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch the carpool offer (from main table, not public view)
    const { data: offer, error } = await supabase
      .from('carpool_offers')
      .select('id, name, whatsapp, departure_city, departure_day')
      .eq('id', parseInt(id, 10))
      .single();

    if (error || !offer) {
      console.error('Error fetching carpool offer:', error);
      return {
        statusCode: STATUS_NOT_FOUND,
        headers,
        body: JSON.stringify({ error: 'Carpool offer not found' }),
      };
    }

    // Build WhatsApp message
    const message = `Bonjour ${offer.name}, je suis intéressé(e) par votre covoiturage depuis ${offer.departure_city} le ${offer.departure_day}.`;
    const whatsappUrl = `https://wa.me/${offer.whatsapp}?text=${encodeURIComponent(message)}`;

    // Redirect to WhatsApp
    return {
      statusCode: STATUS_REDIRECT,
      headers: {
        ...headers,
        'Location': whatsappUrl,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
      body: '',
    };

  } catch (error) {
    console.error('Error in contactCarpool:', error);
    return {
      statusCode: STATUS_SERVER_ERROR,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
