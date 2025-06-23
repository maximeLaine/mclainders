const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client with environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
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

    // Insert data into the dj_spots table in Supabase
    // Ensure spotTime is treated as a text string, not a timestamp
    const { data: insertedData, error } = await supabase
      .from('dj_spots')
      .insert([
        {
          name: data.name,
          email: data.email,
          time_slot: String(data.spotTime), // Explicitly convert to string
          spot_index: data.spotIndex
        },
      ]);

    if (error) {
      console.error('Supabase error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error saving data', error }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'DJ spot reserved successfully', data: insertedData }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server error', error: error.toString() }),
    };
  }
};
