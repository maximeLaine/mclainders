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
    console.log('Received data:', data);
    const { name, email, spotTime, spotIndex, positionIndex } = data;
    
    // Log all received fields for debugging
    console.log('Extracted fields:', { name, email, spotTime, spotIndex, positionIndex });

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

    // Initialize Supabase client with detailed logging
    console.log('Function reserveBrunchCookingSlot called');
    
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    console.log('Environment variables check:', {
      SUPABASE_URL_exists: !!supabaseUrl,
      SUPABASE_KEY_exists: !!supabaseKey,
      SUPABASE_URL_prefix: supabaseUrl ? supabaseUrl.substring(0, 10) + '...' : 'undefined',
      received_data: { name, email, spotTime, positionIndex }
    });

    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase configuration');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Configuration de la base de données manquante.' 
        })
      };
    }

    let supabase;
    try {
      supabase = createClient(supabaseUrl, supabaseKey);
      console.log('Supabase client created successfully');
    } catch (clientError) {
      console.error('Error creating Supabase client:', clientError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Erreur de connexion à la base de données.' 
        })
      };
    }

    try {
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
    } catch (queryError) {
      console.error('Error during database operations:', queryError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Erreur lors de l\'opération sur la base de données.' 
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
