/**
 * Provides fallback brunch cooking slots data when Supabase is unavailable
 * @returns {Array} Array of brunch cooking slot objects
 */
export function getFallbackBrunchCookingSlots() {
  return [
    { 
      time: "11:00 - 12:00", 
      positions: [
        { name: "" },
        { name: "" }
      ]
    },
    { 
      time: "12:00 - 13:00", 
      positions: [
        { name: "" },
        { name: "" }
      ]
    },
    { 
      time: "13:00 - 14:00", 
      positions: [
        { name: "" },
        { name: "" }
      ]
    }
  ];
}
