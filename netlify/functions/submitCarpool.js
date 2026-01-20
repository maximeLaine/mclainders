const { createClient } = require('@supabase/supabase-js');

// Constants for status codes and messages
const STATUS_OK = 200;
const STATUS_BAD_REQUEST = 400;
const STATUS_METHOD_NOT_ALLOWED = 405;
const STATUS_SERVER_ERROR = 500;

const MSG_METHOD_NOT_ALLOWED = 'Method not allowed';
const MSG_MISSING_FIELDS = 'Informations manquantes. Veuillez remplir tous les champs obligatoires.';
const MSG_DB_CONFIG_MISSING = 'Configuration de la base de données manquante.';
const MSG_DB_CONNECTION_ERROR = 'Erreur de connexion à la base de données.';
const MSG_INSERT_ERROR = 'Erreur lors de l\'enregistrement de votre offre.';
const MSG_SUCCESS = 'Votre offre de covoiturage a été enregistrée avec succès!';
const MSG_UNKNOWN_ERROR = 'Une erreur est survenue lors de l\'enregistrement.';

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: STATUS_OK,
      headers,
      body: JSON.stringify({ message: 'Preflight call successful' }),
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: STATUS_METHOD_NOT_ALLOWED,
      headers,
      body: JSON.stringify({ success: false, message: MSG_METHOD_NOT_ALLOWED }),
    };
  }

  try {
    // Parse and validate the incoming request body
    const data = JSON.parse(event.body);
    const { name, whatsapp, departureCity, departureDay, departureTime, seatsAvailable, comments } = data;

    // Validate required fields
    if (!name || !whatsapp || !departureCity || !departureDay || !departureTime || !seatsAvailable) {
      return {
        statusCode: STATUS_BAD_REQUEST,
        headers,
        body: JSON.stringify({ success: false, message: MSG_MISSING_FIELDS }),
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
        body: JSON.stringify({ success: false, message: MSG_DB_CONFIG_MISSING }),
      };
    }

    let supabase;
    try {
      supabase = createClient(supabaseUrl, supabaseKey);
    } catch (clientError) {
      console.error('Error creating Supabase client:', clientError);
      return {
        statusCode: STATUS_SERVER_ERROR,
        headers,
        body: JSON.stringify({ success: false, message: MSG_DB_CONNECTION_ERROR }),
      };
    }

    // Validate WhatsApp format (33 followed by 9 digits)
    const whatsappRegex = /^33[0-9]{9}$/;
    if (!whatsappRegex.test(whatsapp)) {
      return {
        statusCode: STATUS_BAD_REQUEST,
        headers,
        body: JSON.stringify({ success: false, message: 'Format WhatsApp invalide. Utilisez le format 33 suivi de 9 chiffres (ex: 33612345678).' }),
      };
    }

    // Insert the carpool offer
    const { error: insertError } = await supabase
      .from('carpool_offers')
      .insert({
        name,
        whatsapp,
        departure_city: departureCity,
        departure_day: departureDay,
        departure_time: departureTime,
        seats_available: parseInt(seatsAvailable, 10),
        comments: comments || null,
        created_at: new Date().toISOString()
      });

    if (insertError) {
      console.error('Error inserting carpool offer:', insertError);
      return {
        statusCode: STATUS_SERVER_ERROR,
        headers,
        body: JSON.stringify({ success: false, message: MSG_INSERT_ERROR }),
      };
    }

    // Return success response
    return {
      statusCode: STATUS_OK,
      headers,
      body: JSON.stringify({ success: true, message: MSG_SUCCESS }),
    };
  } catch (error) {
    console.error('Exception processing request:', error);
    return {
      statusCode: STATUS_SERVER_ERROR,
      headers,
      body: JSON.stringify({ success: false, message: MSG_UNKNOWN_ERROR }),
    };
  }
};
