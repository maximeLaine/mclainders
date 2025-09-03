const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client with environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
  }
});

exports.handler = async (event, context) => {
  // Debug logs
  console.log('Function reserveDJSpot called');
  console.log('Supabase URL:', supabaseUrl);
  console.log('Supabase Key defined:', !!supabaseKey);
  
  // Check if method is POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  try {
    // Get data from request body
    const data = JSON.parse(event.body);
    console.log('Data received:', data);
    
    // Validate required data
    if (!data.name || !data.email || !data.spotTime || data.spotIndex === undefined) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Incomplete data' }),
      };
    }

    // Check if the spot is already reserved
    const { data: existingSpot, error: checkError } = await supabase
      .from('dj_spots')
      .select('name')
      .eq('time_slot', String(data.spotTime))
      .eq('spot_index', data.spotIndex)
      .maybeSingle();

    if (checkError) {
      console.error('Error checking DJ spot availability:', checkError);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Erreur lors de la vérification de la disponibilité.' }),
      };
    }

    if (existingSpot && existingSpot.name) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Ce créneau DJ est déjà réservé. Veuillez en choisir un autre.' }),
      };
    }

    // Update the existing DJ spot with the reservation details
    const { data: updatedData, error } = await supabase
      .from('dj_spots')
      .update({
        name: data.name,
        email: data.email
      })
      .eq('time_slot', String(data.spotTime))
      .eq('spot_index', data.spotIndex);

    if (error) {
      console.error('Supabase error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error saving data', error }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'DJ spot reserved successfully', data: updatedData }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server error', error: error.toString() }),
    };
  }
};
