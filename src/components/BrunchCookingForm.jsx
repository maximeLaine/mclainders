import React, { useState, useEffect } from 'react';
import { FaUtensils } from 'react-icons/fa';

const BrunchCookingForm = ({ slots: initialSlots, onSpotReserved }) => {
  const [cookingSlots, setCookingSlots] = useState(initialSlots || []);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch cooking slots from the serverless function
  useEffect(() => {
    const fetchCookingSlots = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/.netlify/functions/fetchBrunchCookingSlots');
        const data = await response.json();

        if (data.success && data.slots) {
          setCookingSlots(data.slots);
        } else {
          setError(data.message || 'Erreur lors de la récupération des créneaux');
        }
      } catch (error) {
        console.error('Error fetching cooking slots:', error);
        setError('Erreur lors de la récupération des créneaux');
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if we don't already have slots from props
    if (!initialSlots || initialSlots.length === 0) {
      fetchCookingSlots();
    }
  }, [initialSlots]);

  // Slot selection handler
  const handleSlotSelect = (slotIndex, positionIndex) => {
    if (cookingSlots[slotIndex].positions[positionIndex].name) return; // Position already taken
    setSelectedSlot(cookingSlots[slotIndex]);

    setSelectedPosition(positionIndex);
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSlot || selectedPosition === null || !name || !email) {
      setSubmitStatus({
        success: false,
        message: "Veuillez remplir tous les champs."
      });
      return;
    }

    setSubmitting(true);
    setSubmitStatus(null);

    try {
      // Get the index of the selected slot in the array
      const spotIndex = cookingSlots.findIndex(slot => slot.time === selectedSlot.time);
      
      if (spotIndex === -1) {
        throw new Error("Créneau non trouvé");
      }


      // Prepare data for submission
      const dataToSubmit = {
        name,
        email,
        spotTime: selectedSlot.time,
        spotIndex,
        positionIndex: selectedPosition
      };

      console.log('Submitting data:', dataToSubmit);


      // Send the reservation to the serverless function
      const response = await fetch('/.netlify/functions/reserveBrunchCookingSlot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit),
      });

      const result = await response.json();

      if (result.success) {
        // Create a copy of the slots to update locally
        const updatedSlots = [...cookingSlots];
        const slotIndex = updatedSlots.findIndex(slot => slot.time === selectedSlot.time);

        if (slotIndex !== -1) {
          // Update the position with the name
          updatedSlots[slotIndex].positions[selectedPosition].name = name;

          // Update state
          setCookingSlots(updatedSlots);

          // Call the callback to update parent component
          if (onSpotReserved) {
            onSpotReserved(updatedSlots);
          }

          // Reset form
          setSelectedSlot(null);
          setSelectedPosition(null);
          setName("");
          setEmail("");
        }

        // Show success message
        setSubmitStatus({
          success: true,
          message: result.message || "Votre créneau de cuisine a été réservé avec succès!"
        });
      } else {
        // Show error message
        setSubmitStatus({
          success: false,
          message: result.message || "Erreur lors de la réservation du créneau."
        });
      }
    } catch (error) {
      console.error('Error submitting cooking slot reservation:', error);
      setSubmitStatus({
        success: false,
        message: "Erreur lors de la réservation du créneau."
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {cookingSlots.map((slot, slotIndex) => (
          <div key={slotIndex} className="border rounded-lg p-6 bg-white shadow-sm">
            <h4 className="font-medium text-center mb-4">👨‍🍳 {slot.time}</h4>
            <div className="grid grid-cols-1 gap-4">
              {slot.positions.map((position, posIndex) => (
                <div 
                  key={`${slotIndex}-${posIndex}`}
                  onClick={() => handleSlotSelect(slotIndex, posIndex)}
                  className={`
                    border rounded-lg p-4 text-center cursor-pointer transition-all duration-300
                    ${position.name ? 'bg-gray-100 cursor-not-allowed' : 'hover:border-orange-500 hover:-translate-y-1'}
                    ${selectedSlot && selectedSlot.time === slot.time && selectedPosition === posIndex ? 'border-orange-500 ring-2 ring-orange-200 transform scale-105' : 'border-gray-200'}

                  `}
                >
                  <p className="font-medium">🍳 Place {posIndex + 1}</p>
                  {position.name ? (
                    <p className="text-sm mt-2">👨‍🍳 Réservé par {position.name}</p>
                  ) : (
                    <p className="text-sm mt-2 text-gray-500">✨ Disponible</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {selectedSlot !== null && selectedPosition !== null && !submitStatus?.success && (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              👤 Votre nom
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              ✉️ Votre email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600 transition-colors duration-300 disabled:bg-gray-400 font-semibold"
          >
            {submitting ? '⏳ Réservation en cours...' : 'Réserver ce créneau'}
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

export default BrunchCookingForm;
