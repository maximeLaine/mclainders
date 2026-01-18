import { useState, useEffect } from 'react';
import Modal from './common/Modal';

/**
 * VolunteerSlotForm Component
 * Reusable component for volunteer slot reservations
 *
 * @param {Array} slots - Array of slot objects with { spot_index, name, email }
 * @param {Function} onSpotReserved - Callback when a spot is reserved
 * @param {string} tableName - Name of the Supabase table (for API calls)
 * @param {string} emoji - Emoji to display for slots
 * @param {string} title - Title for the slot (e.g., "Place")
 * @param {string} reservedText - Text to show when reserved (e.g., "Réservé par")
 * @param {string} availableText - Text to show when available
 * @param {string} modalTitle - Title for the reservation modal
 * @param {string} successMessage - Message to show on successful reservation
 */
const VolunteerSlotForm = ({
  slots: initialSlots,
  onSpotReserved,
  tableName,
  emoji = '👤',
  title = 'Place',
  reservedText = 'Réservé par',
  availableText = 'Disponible',
  modalTitle = 'Réserver une place',
  successMessage = 'Votre place a été réservée avec succès!'
}) => {
  const [volunteerSlots, setVolunteerSlots] = useState(Array.isArray(initialSlots) ? initialSlots : []);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Update slots if initialSlots prop changes
  useEffect(() => {
    setVolunteerSlots(Array.isArray(initialSlots) ? initialSlots : []);
  }, [initialSlots]);

  // Slot selection handler
  const handleSlotSelect = (slotIndex) => {
    const slot = volunteerSlots[slotIndex];
    if (slot?.name) return; // Slot already taken
    setSelectedSlot({ ...slot, index: slotIndex });
    setIsModalOpen(true);
    setSubmitStatus(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSlot(null);
    setName('');
    setEmail('');
    setSubmitStatus(null);
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSlot || !name || !email) {
      setSubmitStatus({ success: false, message: 'Veuillez remplir tous les champs.' });
      return;
    }
    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const dataToSubmit = {
        name,
        email,
        spotIndex: selectedSlot.spot_index,
        tableName
      };

      const response = await fetch('/.netlify/functions/reserveVolunteerSlot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit),
      });

      const result = await response.json();

      if (result.success) {
        // Update local state
        const updatedSlots = volunteerSlots.map((slot, idx) =>
          idx === selectedSlot.index ? { ...slot, name } : slot
        );
        setVolunteerSlots(updatedSlots);
        if (onSpotReserved) onSpotReserved(updatedSlots);

        setSubmitStatus({ success: true, message: result.message || successMessage });

        // Close modal after short delay
        setTimeout(() => {
          closeModal();
        }, 2000);
      } else {
        setSubmitStatus({ success: false, message: result.message || 'Erreur lors de la réservation.' });
      }
    } catch (error) {
      setSubmitStatus({ success: false, message: 'Erreur lors de la réservation.' });
    } finally {
      setSubmitting(false);
    }
  };

  // Count available slots
  const availableCount = volunteerSlots.filter(slot => !slot.name).length;
  const totalCount = volunteerSlots.length;

  return (
    <div>
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

      {/* Slots grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {volunteerSlots.map((slot, index) => (
          <div
            key={index}
            onClick={() => handleSlotSelect(index)}
            className={`
              border rounded-lg p-4 text-center cursor-pointer transition-all duration-300
              ${slot.name
                ? 'bg-gray-100 cursor-not-allowed border-gray-200'
                : 'hover:border-orange-500 hover:-translate-y-1 hover:shadow-md border-gray-200 bg-white'
              }
              ${selectedSlot?.index === index ? 'border-orange-500 ring-2 ring-orange-200' : ''}
            `}
          >
            <p className="font-medium text-lg mb-2">{emoji} {title} {index + 1}</p>
            {slot.name ? (
              <p className="text-sm text-gray-600">✅ {reservedText} {slot.name}</p>
            ) : (
              <p className="text-sm text-green-600">✨ {availableText}</p>
            )}
          </div>
        ))}
      </div>

      {/* Reservation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={`${emoji} ${modalTitle} - ${title} ${selectedSlot ? selectedSlot.index + 1 : ''}`}
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
              <label htmlFor="volunteer-name" className="block text-sm font-medium text-gray-700 mb-1">
                👤 Votre nom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="volunteer-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Votre nom complet"
                required
                autoFocus
              />
            </div>
            <div className="mb-6">
              <label htmlFor="volunteer-email" className="block text-sm font-medium text-gray-700 mb-1">
                ✉️ Votre email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="volunteer-email"
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

export default VolunteerSlotForm;
