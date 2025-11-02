import { useState, useMemo } from 'react';
import Modal from './common/Modal';

const DJSpotForm = ({ spots, onSpotReserved }) => {
  const [djSpots, setDjSpots] = useState(spots);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [djName, setDjName] = useState("");
  const [djEmail, setDjEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Memoize sorted spots to avoid re-sorting on every render
  const sortedSpots = useMemo(() => {
    return [...djSpots].sort((a, b) => (a.spot_index ?? 0) - (b.spot_index ?? 0));
  }, [djSpots]);

  // DJ spot selection handler
  const handleSpotSelect = (index) => {
    if (djSpots[index].name) return; // Spot already taken
    setSelectedSpot(index);
    setIsModalOpen(true);
    setSubmitStatus(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSpot(null);
    setDjName("");
    setDjEmail("");
    setSubmitStatus(null);
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
        spotTime: djSpots[selectedSpot].time_slot || djSpots[selectedSpot].time,
        spotIndex: djSpots[selectedSpot].spot_index ?? selectedSpot
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

        // Notify parent component
        onSpotReserved(updatedSpots);

        // Close modal after short delay to show success message
        setTimeout(() => {
          closeModal();
        }, 2000);
      } else {
        setSubmitStatus({ success: false, message: `Erreur: ${result.message || 'Une erreur est survenue'}` });
      }
    } catch (error) {
      setSubmitStatus({ success: false, message: 'Une erreur est survenue lors de l\'envoi du formulaire.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {sortedSpots.map((spot, index) => (
          <div
            key={index}
            onClick={() => handleSpotSelect(index)}
            className={`
              border rounded-lg p-6 text-center cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md
              ${spot.name ? 'bg-gray-100 cursor-not-allowed' : 'hover:border-orange-500 hover:-translate-y-1'}
              ${selectedSpot === index ? 'border-orange-500 ring-2 ring-orange-200 transform scale-105' : 'border-gray-200'}
            `}
          >
            <div className="font-medium">🎵 {spot.time_slot || spot.time}</div>
            {spot.name ? (
              <p className="text-sm mt-2">🎧 Réservé par {spot.name}</p>
            ) : (
              <p className="text-sm mt-2 text-gray-500">✨ Disponible</p>
            )}
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={`🎵 Réserver le créneau ${selectedSpot !== null ? djSpots[selectedSpot]?.time_slot || djSpots[selectedSpot]?.time : ''}`}
      >
        {submitStatus?.success ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-xl font-semibold text-green-600 mb-2">
              {submitStatus.message}
            </p>
            <p className="text-gray-600">Cette fenêtre va se fermer automatiquement...</p>
          </div>
        ) : (
          <form onSubmit={handleDjSubmit}>
            <div className="mb-4">
              <label htmlFor="djName" className="block text-sm font-medium text-gray-700 mb-1">
                👤 Votre nom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="djName"
                value={djName}
                onChange={(e) => setDjName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Votre nom complet"
                required
                autoFocus
              />
            </div>
            <div className="mb-6">
              <label htmlFor="djEmail" className="block text-sm font-medium text-gray-700 mb-1">
                ✉️ Votre email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="djEmail"
                value={djEmail}
                onChange={(e) => setDjEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="votre@email.com"
                required
              />
            </div>

            {submitStatus && !submitStatus.success && (
              <div className="mb-4 p-4 rounded-md bg-red-100 text-red-800">
                {submitStatus.message}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-full hover:bg-gray-300 transition-colors duration-300 font-semibold"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600 transition-colors duration-300 disabled:bg-gray-400 font-semibold"
              >
                {submitting ? '⏳ Réservation...' : '🎉 Réserver'}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default DJSpotForm;
