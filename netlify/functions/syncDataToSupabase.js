const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  try {
    // Get the data type to sync from the request
    const { dataType } = JSON.parse(event.body);
    
    if (!dataType) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Data type is required' }),
      };
    }

    // Define paths to JSON files
    const dataFiles = {
      accommodations: path.join(__dirname, '../../src/data/accommodations.json'),
      attractions: path.join(__dirname, '../../src/data/beaujolais_attractions.json'),
    };

    // Check if the requested data type exists
    if (!dataFiles[dataType]) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: `Unknown data type: ${dataType}` }),
      };
    }

    // Read the JSON file
    const jsonData = JSON.parse(fs.readFileSync(dataFiles[dataType], 'utf8'));
    
    // Map table names to data types
    const tableMappings = {
      accommodations: 'accommodations',
      attractions: 'attractions',
    };

    // Get the table name
    const tableName = tableMappings[dataType];

    // Clear existing data in the table
    const { error: deleteError } = await supabase
      .from(tableName)
      .delete()
      .not('id', 'is', null);

    if (deleteError) {
      console.error(`Error clearing ${tableName} table:`, deleteError);
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          message: `Error clearing ${tableName} table`, 
          error: deleteError 
        }),
      };
    }

    // Insert the new data
    const { data, error } = await supabase
      .from(tableName)
      .insert(jsonData);

    if (error) {
      console.error(`Error inserting data into ${tableName}:`, error);
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          message: `Error inserting data into ${tableName}`, 
          error 
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: `Successfully synced ${jsonData.length} items to ${tableName}` 
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server error', error: error.toString() }),
    };
  }
};
