/**
 * Supabase Client and Data Access Module
 * 
 * This module provides a Supabase client instance and functions to
 * fetch data from various Supabase tables with fallback mechanisms.
 * Includes functions for accommodations, attractions, DJ spots, and brunch cooking slots.
 */

import { createClient } from '@supabase/supabase-js';
import { getFallbackBrunchCookingSlots } from './getFallbackBrunchCookingSlots';

/**
 * Initialize the Supabase client
 * Using only SUPABASE_URL and SUPABASE_KEY for simplicity
 */
let supabaseUrl;
let supabaseKey;
let supabase;

try {
  // Log environment variable availability for debugging
  console.log('Environment variables check:', {
    SUPABASE_URL_exists: !!import.meta.env.SUPABASE_URL,
    SUPABASE_KEY_exists: !!import.meta.env.SUPABASE_KEY
  });
  
  supabaseUrl = import.meta.env.SUPABASE_URL;
  supabaseKey = import.meta.env.SUPABASE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase environment variables are missing');
    // Provide fallback values or handle the error appropriately
  }
  
  /**
   * Supabase client instance
   */
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('Supabase client initialized successfully');
} catch (error) {
  console.error('Error initializing Supabase client:', error);
  // Create a dummy client or handle the error appropriately
  supabase = { from: () => ({ select: () => ({ data: null, error: 'Supabase client initialization failed' }) }) };
}

export { supabase };

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
      console.warn('Supabase environment variables are missing. Using fallback data.');
      return null;
    }

    const { data, error } = await supabase
      .from('dj_spots')
      .select('*')
      .order('time_slot', { ascending: true });

    if (error) {
      console.error('Error fetching DJ spots from Supabase:', error);
      return null;
    }

    if (!data || data.length === 0) {
      console.warn('No DJ spots found in Supabase.');
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Exception when fetching DJ spots:', error);
    return null;
  }
}

/**
 * Fetch brunch cooking slots from Supabase
 * @returns {Promise<Array|null>} Array of brunch cooking slot objects or null if error
 */
export async function fetchBrunchCookingSlots() {
  try {
    // Check if Supabase environment variables are available
    if (!supabaseUrl || !supabaseKey) {
      console.warn('Supabase environment variables are missing. Using fallback data.');
      return getFallbackBrunchCookingSlots();
    }

    const { data, error } = await supabase
      .from('brunch_cooking_slots')
      .select('*')
      .order('time_slot', { ascending: true })
      .order('position', { ascending: true });

    if (error) {
      console.error('Error fetching brunch cooking slots from Supabase:', error);
      return getFallbackBrunchCookingSlots();
    }

    if (!data || data.length === 0) {
      console.warn('No brunch cooking slots found in Supabase. Using fallback data.');
      return getFallbackBrunchCookingSlots();
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
    
    return Object.values(slots);
  } catch (error) {
    console.error('Exception when fetching brunch cooking slots:', error);
    return getFallbackBrunchCookingSlots();
  }
}

/**
 * Reserve a brunch cooking slot
 * @param {string} timeSlot - The time slot (e.g., "11:00 - 12:00")
 * @param {number} position - The position within the time slot (1 or 2)
 * @param {string} name - Name of the person reserving
 * @param {string} email - Email of the person reserving
 * @returns {Promise<Object>} Result object with success status and message
 */
export async function reserveBrunchCookingSlot(timeSlot, position, name, email) {
  try {
    // Check if Supabase environment variables are available
    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase environment variables are missing.');
      return { success: false, message: 'Configuration de la base de données manquante.' };
    }

    // Check if the slot is already taken
    const { data: existingSlot, error: checkError } = await supabase
      .from('brunch_cooking_slots')
      .select('*')
      .eq('time_slot', timeSlot)
      .eq('position', position)
      .not('name', 'is', null);

    if (checkError) {
      console.error('Error checking slot availability:', checkError);
      return { success: false, message: 'Erreur lors de la vérification de la disponibilité.' };
    }

    if (existingSlot && existingSlot.length > 0) {
      return { success: false, message: 'Ce créneau a déjà été réservé. Veuillez en choisir un autre.' };
    }

    // Update the slot with the reservation details
    const { error: updateError } = await supabase
      .from('brunch_cooking_slots')
      .update({ name, email })
      .eq('time_slot', timeSlot)
      .eq('position', position);

    if (updateError) {
      console.error('Error reserving cooking slot:', updateError);
      return { success: false, message: 'Erreur lors de la réservation du créneau.' };
    }

    return { success: true, message: 'Votre créneau de cuisine a été réservé avec succès!' };
  } catch (error) {
    console.error('Exception when reserving cooking slot:', error);
    return { success: false, message: 'Une erreur est survenue lors de la réservation.' };
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

/**
 * Provides fallback attraction data when Supabase is unavailable
 * @returns {Array} Array of example attraction objects
 */
export function getFallbackAttractions() {
  return [
    {
      id: 1,
      name: "Domaine des Terres Dorées",
      description: "Visite de ce domaine viticole réputé avec dégustation de vins du Beaujolais.",
      address: "69620 Theizé",
      website: "https://www.terresdorees.fr",
      image: "/gallery/beaujolais/terres-dorees.jpg",
      distance: "15 min en voiture",
      category: "Vin"
    },
    {
      id: 1,
      name: "Domaine des Terres Dorées",
      description: "Vignoble réputé proposant des dégustations de vins du Beaujolais dans un cadre pittoresque. Découvrez les méthodes de vinification traditionnelles et les cépages locaux.",
      website: "https://www.terresdorees.com",
      address: "69380 Charnay, France",
      distance: "15 km du lieu de la fête",
      image: "/gallery/beaujolais/terres-dorees.jpg",
      category: "Vin & Gastronomie"
    },
    {
      id: 2,
      name: "Château de Bagnols",
      description: "Magnifique château médiéval du 13ème siècle transformé en hôtel de luxe. Même si vous n'y séjournez pas, vous pouvez visiter ses jardins et admirer son architecture remarquable.",
      website: "https://www.chateaudebagnols.fr",
      address: "69620 Bagnols, France",
      distance: "8 km du lieu de la fête",
      image: "/gallery/beaujolais/chateau-bagnols.jpg",
      category: "Patrimoine"
    },
    {
      id: 3,
      name: "Village de Oingt",
      description: "L'un des plus beaux villages de France, avec ses ruelles pavées et ses maisons en pierre dorée. Offre une vue panoramique sur les vignobles environnants.",
      website: "https://www.beaujolaisvert.com/oingt",
      address: "69620 Oingt, France",
      distance: "12 km du lieu de la fête",
      image: "/gallery/beaujolais/oingt-village.jpg",
      category: "Patrimoine"
    }
  ];
}
