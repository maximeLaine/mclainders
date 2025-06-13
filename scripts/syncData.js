const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: SUPABASE_URL and SUPABASE_KEY environment variables must be set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Get the data type from command line arguments
const dataType = process.argv[2];

if (!dataType) {
  console.error('Usage: node syncData.js <dataType>');
  console.error('Available data types: accommodations, attractions');
  process.exit(1);
}

// Define paths to JSON files
const dataFiles = {
  accommodations: path.join(__dirname, '../src/data/accommodations.json'),
  attractions: path.join(__dirname, '../src/data/beaujolais_attractions.json'),
};

// Check if the requested data type exists
if (!dataFiles[dataType]) {
  console.error(`Error: Unknown data type: ${dataType}`);
  console.error('Available data types: accommodations, attractions');
  process.exit(1);
}

// Map table names to data types
const tableMappings = {
  accommodations: 'accommodations',
  attractions: 'attractions',
};

// Get the table name
const tableName = tableMappings[dataType];

async function syncData() {
  try {
    console.log(`Reading data from ${dataFiles[dataType]}...`);
    // Read the JSON file
    const jsonData = JSON.parse(fs.readFileSync(dataFiles[dataType], 'utf8'));
    
    console.log(`Found ${jsonData.length} items to sync to ${tableName} table`);

    // Clear existing data in the table
    console.log(`Clearing existing data from ${tableName} table...`);
    const { error: deleteError } = await supabase
      .from(tableName)
      .delete()
      .not('id', 'is', null);

    if (deleteError) {
      console.error(`Error clearing ${tableName} table:`, deleteError);
      process.exit(1);
    }

    // Insert the new data
    console.log(`Inserting ${jsonData.length} items into ${tableName} table...`);
    const { data, error } = await supabase
      .from(tableName)
      .insert(jsonData);

    if (error) {
      console.error(`Error inserting data into ${tableName}:`, error);
      process.exit(1);
    }

    console.log(`Successfully synced ${jsonData.length} items to ${tableName}`);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

syncData();
