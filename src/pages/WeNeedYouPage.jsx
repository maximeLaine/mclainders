import React, { useState, useEffect } from 'react';
import { fetchDJSpots, fetchBrunchCookingSlots } from '../utils/supabase';
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
  
  // Brunch cooking section state
  const [cookingSlots, setCookingSlots] = useState([]);
  
  // Loading and error states for better UX
  const [loading, setLoading] = useState(false);
  const [cookingSlotsLoading, setCookingSlotsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cookingSlotsError, setCookingSlotsError] = useState(null);
  const [cookingError, setCookingError] = useState(null);
  const [cookingLoading, setCookingLoading] = useState(false);
  
  // Handle DJ spot reservation
  const handleSpotReserved = (updatedSpots) => {
    setDjSpots(updatedSpots);
  };
  
  // Handle cooking slot reservation
  const handleCookingSlotReserved = (updatedSlots) => {
    setCookingSlots(updatedSlots);
  };
  
  useEffect(() => {
    const loadDJSpots = async () => {
      setLoading(true);
      setError(null);
      try {
        const spots = await fetchDJSpots();
        if (spots) {
          setDjSpots(spots);
        }
      } catch (err) {
        console.error('Error loading DJ spots:', err);
        setError('Erreur lors du chargement des créneaux DJ');
      } finally {
        setLoading(false);
      }
    };

    loadDJSpots();
  }, []);
  
  useEffect(() => {
    const loadCookingSlots = async () => {
      setCookingSlotsLoading(true);
      setCookingSlotsError(null);
      try {
        const slots = await fetchBrunchCookingSlots();
        if (slots) {
          setCookingSlots(slots);
        }
      } catch (err) {
        console.error('Error loading cooking slots:', err);
        setCookingSlotsError('Erreur lors du chargement des créneaux de cuisine');
      } finally {
        setCookingSlotsLoading(false);
      }
    };

    loadCookingSlots();
  }, []);
  
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
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8 max-w-3xl mx-auto text-center">
              <p>{error}</p>
            </div>
          )}
          
          {/* Loading state */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent">
                <span className="sr-only">Chargement...</span>
              </div>
              <p className="mt-4 text-gray-600">Chargement des créneaux...</p>
            </div>
          ) : (
            /* DJ Spots Form Component */
            <DJSpotForm spots={djSpots} onSpotReserved={handleSpotReserved} />
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
          {cookingSlotsError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8 max-w-3xl mx-auto text-center">
              <p>{cookingSlotsError}</p>
            </div>
          )}
          
          {/* Loading state */}
          {cookingSlotsLoading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent">
                <span className="sr-only">Chargement...</span>
              </div>
              <p className="mt-4 text-gray-600">Chargement des créneaux...</p>
            </div>
          ) : (
            <BrunchCookingForm 
              slots={cookingSlots} 
              onSpotReserved={handleCookingSlotReserved} 
            />
          )}
        </div>
      </section>
      
      {/* Brunch Help Section removed - only using cooking slots now */}
        
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
