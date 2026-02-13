import { useState, useEffect } from 'react';
import Modal from './common/Modal';

/**
 * BrunchCookingForm Component
 * Allows users to reserve a brunch cooking slot
 */
const BrunchCookingForm = ({ slots: initialSlots, onSpotReserved }) => {
  // State
  const [cookingSlots, setCookingSlots] = useState(Array.isArray(initialSlots) ? initialSlots : []);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update slots if initialSlots prop changes
  useEffect(() => {
    setCookingSlots(Array.isArray(initialSlots) ? initialSlots : []);
  }, [initialSlots]);

  // Slot selection handler
  const handleSlotSelect = (slotIndex, positionIndex) => {
    if (cookingSlots[slotIndex]?.positions[positionIndex]?.name) return; // Position already taken
    setSelectedSlot(cookingSlots[slotIndex]);
    setSelectedPosition(positionIndex);
    setIsModalOpen(true);
    setSubmitStatus(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSlot(null);
    setSelectedPosition(null);
    setName("");
    setEmail("");
    setSubmitStatus(null);
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSlot || selectedPosition === null || !name || !email) {
      setSubmitStatus({ success: false, message: "Veuillez remplir tous les champs." });
      return;
    }
    setSubmitting(true);
    setSubmitStatus(null);
    try {
      // Get the correct spot_index for the selected position
      const spotIndex = selectedSlot.positions[selectedPosition].spot_index;
      if (spotIndex === undefined) throw new Error("Créneau non trouvé");
      // Prepare data for submission
      const dataToSubmit = {
        name,
        email,
        spotTime: selectedSlot.time,
        spotIndex,
        positionIndex: selectedPosition
      };
      // Send the reservation to the serverless function
      const response = await fetch('/.netlify/functions/reserveBrunchCookingSlot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit),
      });
      const result = await response.json();
      if (result.success) {
        // Update local state
        const updatedSlots = cookingSlots.map(slot =>
          slot.time === selectedSlot.time
            ? {
                ...slot,
                positions: slot.positions.map((pos, idx) =>
                  idx === selectedPosition ? { ...pos, name } : pos
                )
              }
            : slot
        );
        setCookingSlots(updatedSlots);
        if (onSpotReserved) onSpotReserved(updatedSlots);

        setSubmitStatus({ success: true, message: result.message || "Votre créneau de cuisine a été réservé avec succès!" });

        // Close modal after short delay to show success message
        setTimeout(() => {
          closeModal();
        }, 2000);
      } else {
        setSubmitStatus({ success: false, message: result.message || "Erreur lors de la réservation du créneau." });
      }
    } catch (error) {
      setSubmitStatus({ success: false, message: "Erreur lors de la réservation du créneau." });
    } finally {
      setSubmitting(false);
    }
  };

  // Early return for loading/error
  if (loading) {
    return <div className="text-center py-8">Chargement des créneaux...</div>;
  }
  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  // Count available slots
  const availableCount = cookingSlots.reduce((count, slot) => {
    return count + (slot.positions?.filter(pos => !pos.name)?.length || 0);
  }, 0);
  const totalCount = cookingSlots.reduce((count, slot) => {
    return count + (slot.positions?.length || 0);
  }, 0);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Availability counter */}
      <div className="text-center mb-6">
        <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
          availableCount > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {availableCount > 0
            ? `${availableCount} place${availableCount > 1 ? 's' : ''} disponible${availableCount > 1 ? 's' : ''} sur ${totalCount}`
            : 'Complet !'
          }
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(Array.isArray(cookingSlots) ? cookingSlots : []).map((slot, slotIndex) => (
          <div key={slotIndex} className="border rounded-lg p-6 bg-white shadow-sm">
            <h4 className="font-medium text-center mb-4">👨‍🍳 {slot.time}</h4>
            <div className="grid grid-cols-1 gap-4">
              {(Array.isArray(slot.positions) ? slot.positions : []).map((position, posIndex) => (
                <div
                  key={`${slotIndex}-${posIndex}`}
                  onClick={() => handleSlotSelect(slotIndex, posIndex)}
                  className={`
                    border rounded-lg p-4 text-center cursor-pointer transition-all duration-300
                    ${position.name
                      ? 'bg-gray-100 cursor-not-allowed border-gray-200'
                      : 'hover:border-orange-500 hover:-translate-y-1 hover:shadow-md border-gray-200 bg-white'
                    }
                    ${selectedSlot && selectedSlot.time === slot.time && selectedPosition === posIndex ? 'border-orange-500 ring-2 ring-orange-200' : ''}
                  `}
                >
                  <p className="font-medium text-lg mb-2">🍳 Je suis volontaire</p>
                  {position.name ? (
                    <p className="text-sm text-gray-600">✅ Réservé par {position.name}</p>
                  ) : (
                    <p className="text-sm text-green-600">✨ Disponible</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={`👨‍🍳 Réserver le créneau ${selectedSlot ? selectedSlot.time : ''} - Place ${selectedPosition !== null ? selectedPosition + 1 : ''}`}
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
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                👤 Votre nom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Votre nom complet"
                required
                autoFocus
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                ✉️ Votre email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

export default BrunchCookingForm;
