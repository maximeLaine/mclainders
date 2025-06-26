const { createClient } = require('@supabase/supabase-js');

// Constants for status codes and messages
const STATUS_OK = 200;
const STATUS_BAD_REQUEST = 400;
const STATUS_METHOD_NOT_ALLOWED = 405;
const STATUS_SERVER_ERROR = 500;

const MSG_METHOD_NOT_ALLOWED = 'Method not allowed';
const MSG_MISSING_FIELDS = 'Informations manquantes. Veuillez fournir un nom, un email et un créneau.';
const MSG_DB_CONFIG_MISSING = 'Configuration de la base de données manquante.';
const MSG_DB_CONNECTION_ERROR = 'Erreur de connexion à la base de données.';
const MSG_SLOT_ALREADY_RESERVED = 'Ce créneau a déjà été réservé. Veuillez en choisir un autre.';
const MSG_AVAILABILITY_ERROR = 'Erreur lors de la vérification de la disponibilité.';
const MSG_RESERVATION_ERROR = 'Erreur lors de la réservation du créneau.';
const MSG_DB_OPERATION_ERROR = "Erreur lors de l'opération sur la base de données.";
const MSG_SUCCESS = 'Votre créneau de cuisine a été réservé avec succès!';
const MSG_UNKNOWN_ERROR = 'Une erreur est survenue lors de la réservation.';

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
    const { name, email, spotTime, spotIndex } = data;

    if (!name || !email || !spotTime || spotIndex === undefined) {
      return {
        statusCode: STATUS_BAD_REQUEST,
        headers,
        body: JSON.stringify({ success: false, message: MSG_MISSING_FIELDS }),
      };
    }

    // Initialize Supabase client
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
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

    // Check if the slot is already taken
    const { data: existingSlot, error: checkError } = await supabase
      .from('brunch_cooking_slots')
      .select('name')
      .eq('time_slot', spotTime)
      .eq('spot_index', spotIndex)
      .maybeSingle();

    if (checkError) {
      console.error('Error checking slot availability:', checkError);
      return {
        statusCode: STATUS_SERVER_ERROR,
        headers,
        body: JSON.stringify({ success: false, message: MSG_AVAILABILITY_ERROR }),
      };
    }

    if (existingSlot && existingSlot.name) {
      return {
        statusCode: STATUS_BAD_REQUEST,
        headers,
        body: JSON.stringify({ success: false, message: MSG_SLOT_ALREADY_RESERVED }),
      };
    }

    // Update the slot with the reservation details
    const { error: updateError } = await supabase
      .from('brunch_cooking_slots')
      .update({ name, email })
      .eq('time_slot', spotTime)
      .eq('spot_index', spotIndex);

    if (updateError) {
      console.error('Error reserving cooking slot:', updateError);
      return {
        statusCode: STATUS_SERVER_ERROR,
        headers,
        body: JSON.stringify({ success: false, message: MSG_RESERVATION_ERROR }),
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
 