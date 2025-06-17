const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Preflight call successful' })
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Method not allowed' })
    };
  }

  try {
    // Parse the incoming request body
    const data = JSON.parse(event.body);
    const { name, email, spotTime, spotIndex, positionIndex } = data;

    // Validate required fields
    if (!name || !email || !spotTime || positionIndex === undefined) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Informations manquantes. Veuillez fournir un nom, un email et un créneau.' 
        })
      };
    }

    // Initialize Supabase client
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Configuration de la base de données manquante.' 
        })
      };
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if the slot is already taken
    const { data: existingSlot, error: checkError } = await supabase
      .from('brunch_cooking_slots')
      .select('*')
      .eq('time_slot', spotTime)
      .eq('position', positionIndex + 1)
      .not('name', 'is', null);

    if (checkError) {
      console.error('Error checking slot availability:', checkError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Erreur lors de la vérification de la disponibilité.' 
        })
      };
    }

    if (existingSlot && existingSlot.length > 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Ce créneau a déjà été réservé. Veuillez en choisir un autre.' 
        })
      };
    }

    // Update the slot with the reservation details
    const { error: updateError } = await supabase
      .from('brunch_cooking_slots')
      .update({ name, email })
      .eq('time_slot', spotTime)
      .eq('position', positionIndex + 1);

    if (updateError) {
      console.error('Error reserving cooking slot:', updateError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Erreur lors de la réservation du créneau.' 
        })
      };
    }

    // Return success response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Votre créneau de cuisine a été réservé avec succès!' 
      })
    };
  } catch (error) {
    console.error('Exception processing request:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        message: 'Une erreur est survenue lors de la réservation.' 
      })
    };
  }
};
