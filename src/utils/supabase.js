/**
 * Supabase Client and Data Access Module
 * 
 * This module provides a Supabase client instance and functions to
 * fetch data from various Supabase tables with fallback mechanisms.
 * Includes functions for accommodations, attractions, DJ spots, and brunch cooking slots.
 */

import { createClient } from '@supabase/supabase-js';

/**
 * Initialize the Supabase client
 * Using only SUPABASE_URL and SUPABASE_KEY for simplicity
 */
let supabaseUrl;
let supabaseKey;
let supabase;

try {
  supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase environment variables are missing');
  }
  
  /**
   * Supabase client instance
   */
  supabase = createClient(supabaseUrl, supabaseKey, {
    realtime: {
      enabled: false
    }
  });
} catch (error) {
  console.error('Error initializing Supabase client:', error);
  // Create a dummy client or handle the error appropriately
  supabase = { from: () => ({ select: () => ({ data: null, error: 'Supabase client initialization failed' }) }) };
}

export { supabase };

