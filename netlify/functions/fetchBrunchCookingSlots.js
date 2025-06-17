const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Preflight call successful' })
    };
  }

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Method not allowed' })
    };
  }

  try {
    // Initialize Supabase client with detailed logging
    console.log('Function fetchBrunchCookingSlots called');
    
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    
    console.log('Environment variables check:', {
      SUPABASE_URL_exists: !!supabaseUrl,
      SUPABASE_KEY_exists: !!supabaseKey,
      SUPABASE_URL_prefix: supabaseUrl ? supabaseUrl.substring(0, 10) + '...' : 'undefined',
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

    // Fetch all brunch cooking slots
    try {
      const { data, error } = await supabase
        .from('brunch_cooking_slots')
        .select('*')
        .order('time_slot', { ascending: true })
        .order('position', { ascending: true });

      if (error) {
        console.error('Error fetching brunch cooking slots:', error);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            success: false, 
            message: 'Erreur lors de la récupération des créneaux de cuisine.' 
          })
        };
      }

      // Transform the data to match the expected format in the UI
      const slots = {};
      data.forEach(slot => {
        if (!slots[slot.time_slot]) {
          slots[slot.time_slot] = {
            time: slot.time_slot,
            positions: []
          };
        }
        
        slots[slot.time_slot].positions[slot.position - 1] = {
          name: slot.name || ""
        };
      });
      
      // Return success response with the slots data
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true, 
          slots: Object.values(slots)
        })
      };
    } catch (queryError) {
      console.error('Error querying brunch cooking slots:', queryError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Erreur lors de la récupération des créneaux de cuisine.'
        })
      };
    }
  } catch (error) {
    console.error('Exception processing request:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        message: 'Une erreur est survenue lors de la récupération des créneaux.' 
      })
    };
  }
};
