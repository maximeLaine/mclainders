import React, { useState, useEffect } from 'react';
import DJSpotForm from '../components/DJSpotForm';
import ProposalForm from '../components/ProposalForm';

const WeNeedYouPage = () => {
  // DJ section state
  const [djSpots, setDjSpots] = useState([
    { time: "20:00 - 20:30", name: "" },
    { time: "20:30 - 21:00", name: "" },
    { time: "21:00 - 21:30", name: "" },
    { time: "21:30 - 22:00", name: "" },
    { time: "22:00 - 22:30", name: "" },
    { time: "22:30 - 23:00", name: "" },
    { time: "23:00 - 23:30", name: "" },
    { time: "23:30 - 00:00", name: "" },
  ]);
  
  // Handle DJ spot reservation
  const handleSpotReserved = (updatedSpots) => {
    setDjSpots(updatedSpots);
  };
  
  // Fetch existing DJ spots on component mount
  useEffect(() => {
    // This would fetch existing DJ spot reservations from your backend
    // For now, we'll use the initial state
    // Example of how you might fetch data:
    /*
    const fetchDJSpots = async () => {
      try {
        const response = await fetch('/.netlify/functions/getDJSpots');
        if (response.ok) {
          const data = await response.json();
          // Update spots with existing reservations
          setDjSpots(data.spots);
        }
      } catch (error) {
        console.error('Error fetching DJ spots:', error);
      }
    };
    
    fetchDJSpots();
    */
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
          <h2 className="text-4xl text-center mb-8">Devenez DJ pour la soirée</h2>
          
          <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
            Si vous souhaitez nous partager vos meilleures musiques, le DJ floor sera à vous pour 30 min 
            (entre 7 à 10 musiques) - vous devrez fournir votre playlist à Michel au moins 2 mois avant la date.
          </p>
          
          <div className="flex justify-center">
            <div className="w-24 h-px bg-gray-400 my-8"></div>
          </div>
          
          <h3 className="text-2xl text-center font-light mb-8">Sélectionnez votre crénneau</h3>
          {/* DJ Spots Form Component */}
          <DJSpotForm spots={djSpots} onSpotReserved={handleSpotReserved} />
        </div>
      </section>
        
      {/* Proposal Section */}
      <section className="py-20 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl text-center mb-8">Faites-nous vos propositions</h2>
          
          <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
            Si vous avez d'autres propositions à nous faire, n'hésitez pas à nous les partager via le formulaire ci-dessous.
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
