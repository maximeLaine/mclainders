import React, { useState } from 'react';
import { useSupabaseData } from '../hooks/useSupabaseData';
import DJSpotForm from '../components/DJSpotForm';
import ProposalForm from '../components/ProposalForm';
import BrunchCookingForm from '../components/BrunchCookingForm';

/**
 * WeNeedYouPage Component
 * Allows guests to participate in the wedding by reserving DJ spots and making proposals
 */
const WeNeedYouPage = () => {
  // DJ section state
  const [djSpots, setDjSpots] = useState([
    { time: "20:30 - 21:00", name: "" },
    { time: "21:00 - 21:30", name: "" },
    { time: "21:30 - 22:00", name: "" },
    { time: "22:00 - 22:30", name: "" },
    { time: "22:30 - 23:00", name: "" },
    { time: "23:00 - 23:30", name: "" },
    { time: "23:30 - 00:00", name: "" },
    { time: "00:00 - 00:30", name: "" },
    { time: "00:30 - 01:00", name: "" },
  ]);
  const [cookingSlots, setCookingSlots] = useState([]);

  // Use the generic Supabase data fetching hook
  const { data: djSpotsData, loading: loadingDJ, error: errorDJ } = useSupabaseData('dj_spots', { orderBy: 'time_slot' });

  // Group flat brunch_cooking_slots data into the format expected by BrunchCookingForm
  function groupCookingSlots(data) {
    if (!Array.isArray(data)) return [];
    const grouped = {};
    data.forEach(row => {
      if (!grouped[row.time_slot]) {
        grouped[row.time_slot] = { time: row.time_slot, positions: [] };
      }
      grouped[row.time_slot].positions[row.spot_index] = { name: row.name || "", spot_index: row.spot_index };
    });
    return Object.values(grouped);
  }

  const { data: cookingSlotsData, loading: loadingCooking, error: errorCooking } = useSupabaseData('brunch_cooking_slots', { orderBy: 'time_slot', transform: groupCookingSlots });

  // Handle DJ spot reservation
  const handleSpotReserved = (updatedSpots) => {
    setDjSpots(updatedSpots);
  };

  // Handle cooking slot reservation
  const handleCookingSlotReserved = (updatedSlots) => {
    setCookingSlots(updatedSlots);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[75vh] bg-cover bg-center" style={{ backgroundImage: "url('/gallery/ombre.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-5xl md:text-7xl font-light mb-6">Nous avons besoin de vous</h1>
          <p className="text-xl max-w-2xl">Participez à notre mariage en apportant votre touche personnelle</p>
        </div>
      </div>
        
      {/* DJ Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl text-center mb-8 text-gray-800">Devenez DJ pour la soirée 🎧</h2>
          
          <p className="text-center text-lg mb-12 max-w-3xl mx-auto text-gray-700 leading-relaxed">
            Si vous souhaitez nous partager vos meilleures musiques, le DJ floor sera à vous pour 30 min 
            (entre 7 à 10 musiques) - vous devrez fournir votre playlist à Michel au moins 2 mois avant la date.
          </p>
          
          <div className="flex justify-center">
            <div className="w-24 h-px bg-gray-400 my-8"></div>
          </div>
          
          <h3 className="text-2xl text-center font-semibold mb-8 text-orange-600">Sélectionnez votre créneau</h3>
          
          {/* Error state */}
          {errorDJ && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8 max-w-3xl mx-auto text-center">
              <p>{errorDJ}</p>
            </div>
          )}
          
          {/* Loading state */}
          {loadingDJ ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent">
                <span className="sr-only">Chargement...</span>
              </div>
              <p className="mt-4 text-gray-600">Chargement des créneaux...</p>
            </div>
          ) : (
            /* DJ Spots Form Component */
            <DJSpotForm spots={djSpotsData || djSpots} onSpotReserved={handleSpotReserved} />
          )}
        </div>
      </section>

      {/* Brunch Cooking Section */}
      <section className="py-20 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl text-center mb-8 text-gray-800">Cuisiner pour le brunch</h2>
          
          <p className="text-center text-lg mb-12 max-w-3xl mx-auto text-gray-700 leading-relaxed">
            Le lendemain du mariage, nous organisons un brunch et nous cherchons des volontaires pour aider à la cuisine. 
            Chaque créneau a deux places disponibles. Sélectionnez un créneau et une position pour vous inscrire.
          </p>
          
          <div className="flex justify-center">
            <div className="w-24 h-px bg-gray-400 my-8"></div>
          </div>
          
          <h3 className="text-2xl text-center font-semibold mb-8 text-orange-600">Sélectionnez votre créneau de cuisine</h3>
          
          {/* Error state */}
          {errorCooking && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8 max-w-3xl mx-auto text-center">
              <p>{errorCooking}</p>
            </div>
          )}
          
          {/* Loading state */}
          {loadingCooking ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent">
                <span className="sr-only">Chargement...</span>
              </div>
              <p className="mt-4 text-gray-600">Chargement des créneaux...</p>
            </div>
          ) : (
            <BrunchCookingForm 
              slots={(cookingSlotsData || cookingSlots || [])} 
              onSpotReserved={handleCookingSlotReserved} 
            />
          )}
        </div>
      </section>
        
      {/* Proposal Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl text-center mb-8 text-gray-800">Vous voulez nous faire des surprises ?🎉</h2>
          
          <p className="text-center text-lg mb-12 max-w-3xl mx-auto text-gray-700 leading-relaxed">
            N'hésitez pas à les partager à nos maitres et metresse de céremorie via le formulaire ci-dessous.
          </p>
          
          <div className="flex justify-center">
            <div className="w-24 h-px bg-gray-400 my-8"></div>
          </div>
          
          {/* Proposal Form Component */}
          <ProposalForm />
        </div>
      </section>
    </div>
  );
};

export default WeNeedYouPage;
