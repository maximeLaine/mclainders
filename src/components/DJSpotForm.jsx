import React, { useState } from 'react';

const DJSpotForm = ({ spots, onSpotReserved }) => {
  const [djSpots, setDjSpots] = useState(spots);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [djName, setDjName] = useState("");
  const [djEmail, setDjEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  // DJ spot selection handler
  const handleSpotSelect = (index) => {
    if (djSpots[index].name) return; // Spot already taken
    setSelectedSpot(index);
  };
  
  // DJ form submission
  const handleDjSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedSpot === null || !djName || !djEmail) return;
    
    setSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Prepare data to submit
      const dataToSubmit = {
        name: djName,
        email: djEmail,
        spotTime: djSpots[selectedSpot].time,
        spotIndex: selectedSpot
      };
      
      // Send data to serverless function
      const response = await fetch('/.netlify/functions/reserveDJSpot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        // Update the selected spot with the user's name
        const updatedSpots = [...djSpots];
        updatedSpots[selectedSpot] = {
          ...updatedSpots[selectedSpot],
          name: djName
        };
        
        setDjSpots(updatedSpots);
        setSubmitStatus({ success: true, message: 'Merci ! Votre créneau DJ a été réservé.' });
        
        // Reset form
        setDjName("");
        setDjEmail("");
        setSelectedSpot(null);
        
        // Notify parent component
        onSpotReserved(updatedSpots);
      } else {
        setSubmitStatus({ success: false, message: `Erreur: ${result.message || 'Une erreur est survenue'}` });
      }
    } catch (error) {
      console.error('Erreur:', error);
      setSubmitStatus({ success: false, message: 'Une erreur est survenue lors de l\'envoi du formulaire.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {djSpots.map((spot, index) => (
          <div 
            key={index}
            onClick={() => handleSpotSelect(index)}
            className={`
              border rounded-lg p-6 text-center cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md
              ${spot.name ? 'bg-gray-100 cursor-not-allowed' : 'hover:border-purple-500 hover:-translate-y-1'}
              ${selectedSpot === index ? 'border-purple-500 ring-2 ring-purple-200 transform scale-105' : 'border-gray-200'}
            `}
          >
            <p className="font-medium">{spot.time}</p>
            {spot.name ? (
              <p className="text-sm mt-2">Réservé par {spot.name}</p>
            ) : (
              <p className="text-sm mt-2 text-gray-500">Disponible</p>
            )}
          </div>
        ))}
      </div>
      
      {selectedSpot !== null && !submitStatus?.success && (
        <form onSubmit={handleDjSubmit} className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="mb-4">
            <label htmlFor="djName" className="block text-sm font-medium text-gray-700 mb-1">
              Votre nom
            </label>
            <input
              type="text"
              id="djName"
              value={djName}
              onChange={(e) => setDjName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="djEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Votre email
            </label>
            <input
              type="email"
              id="djEmail"
              value={djEmail}
              onChange={(e) => setDjEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition disabled:bg-gray-400"
          >
            {submitting ? 'Réservation en cours...' : 'Réserver ce créneau'}
          </button>
        </form>
      )}
      
      {submitStatus && (
        <div className={`max-w-md mx-auto p-4 rounded-md ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {submitStatus.message}
        </div>
      )}
    </div>
  );
};

export default DJSpotForm;
