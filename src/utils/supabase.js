/**
 * Supabase Client and Data Access Module
 * 
 * This module provides a Supabase client instance and functions to
 * fetch data from various Supabase tables with fallback mechanisms.
 */

import { createClient } from '@supabase/supabase-js';

/**
 * Initialize the Supabase client
 * In Vite, environment variables need to be prefixed with VITE_
 * We check for both formats to be safe
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_KEY;

/**
 * Supabase client instance
 */
export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Fetch accommodations from Supabase
 * @returns {Promise<Array>} Array of accommodation objects
 */
export async function fetchAccommodations() {
  try {
    // Check if Supabase environment variables are available
    if (!supabaseUrl || !supabaseKey) {
      console.warn('Supabase environment variables are missing. Using fallback data.');
      return getFallbackAccommodations();
    }

    const { data, error } = await supabase
      .from('accommodations')
      .select('*');

    if (error) {
      console.error('Error fetching accommodations from Supabase:', error);
      return getFallbackAccommodations();
    }

    if (!data || data.length === 0) {
      console.warn('No accommodations found in Supabase. Using fallback data.');
      return getFallbackAccommodations();
    }
    
    return data;
  } catch (error) {
    console.error('Exception fetching accommodations from Supabase:', error);
    return getFallbackAccommodations();
  }
}

/**
 * Fetch attractions from Supabase
 * @returns {Promise<Array|null>} Array of attraction objects or null if error
 */
export async function fetchAttractions() {
  try {
    // Check if Supabase environment variables are available
    if (!supabaseUrl || !supabaseKey) {
      console.warn('Supabase environment variables are missing.');
      return null;
    }

    const { data, error } = await supabase
      .from('attractions')
      .select('*');
      
    if (error) {
      console.error('Error fetching attractions:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Exception fetching attractions:', error);
    return null;
  }
}

/**
 * Fetch DJ spots from Supabase
 * @returns {Promise<Array|null>} Array of DJ spot objects or null if error
 */
export async function fetchDJSpots() {
  try {
    // Check if Supabase environment variables are available
    if (!supabaseUrl || !supabaseKey) {
      console.warn('Supabase environment variables are missing.');
      return null;
    }

    const { data, error } = await supabase
      .from('dj_spots')
      .select('*');
      
    if (error) {
      console.error('Error fetching DJ spots:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Exception fetching DJ spots:', error);
    return null;
  }
}

/**
 * Provides fallback accommodation data when Supabase is unavailable
 * @returns {Array} Array of example accommodation objects
 */
function getFallbackAccommodations() {
  return [
    {
      id: 1,
      name: "Gîte du Beaujolais",
      type: "Gîte",
      capacity: "4-6 personnes",
      distance: "5 km du lieu",
      contact: "06 12 34 56 78",
      website: "https://example.com/gite",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3"
    },
    {
      id: 2,
      name: "Maison de Campagne",
      type: "Maison",
      capacity: "8-10 personnes",
      distance: "3 km du lieu",
      contact: "Airbnb: maison-beaujolais",
      website: "https://airbnb.com/maison-beaujolais",
      image: null
    },
    {
      id: 3,
      name: "Chambre d'hôtes Vignoble",
      type: "Chambre d'hôtes",
      capacity: "2 personnes",
      distance: "1 km du lieu",
      contact: "04 78 12 34 56",
      website: null,
      image: null
    }
  ];
}
