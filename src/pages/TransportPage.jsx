import { useState } from 'react';
import { useSupabaseData } from '../hooks/useSupabaseData';
import Modal from '../components/common/Modal';
import { useFormSubmit } from '../hooks/useFormSubmit';

// Async function to submit carpool offer
async function submitCarpoolOffer(formData) {
  const response = await fetch('/.netlify/functions/submitCarpool', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  const result = await response.json();
  return {
    success: response.ok,
    message: result.message || (response.ok ? 'Votre offre de covoiturage a été enregistrée !' : 'Une erreur est survenue'),
  };
}

/**
 * TransportPage Component
 * Information about how to get to the wedding venue
 */
const TransportPage = () => {
  // Use public view to avoid exposing email/phone (GDPR compliant)
  const { data: carpoolOffers, loading, error, refetch } = useSupabaseData('carpool_offers_public', { orderBy: 'departure_city' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    departureCity: '',
    departureTime: '',
    seatsAvailable: 1,
    comments: ''
  });

  const { submitting, submitStatus, handleSubmit } = useFormSubmit(submitCarpoolOffer);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData, () => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        departureCity: '',
        departureTime: '',
        seatsAvailable: 1,
        comments: ''
      });
      setTimeout(() => {
        setIsModalOpen(false);
        refetch();
      }, 2000);
    });
  };

  const venueAddress = "253 Rte du Gonnet, Val d'Oingt, 69620";
  const venueGoogleMaps = `https://maps.google.com/?q=${encodeURIComponent(venueAddress)}`;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[75vh] bg-cover bg-center" style={{ backgroundImage: "url('/gallery/baniere_transport.jpg')", backgroundPosition: "center 65%" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-5xl md:text-7xl font-light mb-6">Comment venir</h1>
          <p className="text-xl max-w-2xl">Toutes les informations pour rejoindre la Bastide des Hirondelles</p>
        </div>
      </div>

      {/* Destination Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
            <span className="text-4xl">📍</span>
          </div>
          <h2 className="text-3xl font-light text-gray-800 mb-4">La Bastide des Hirondelles</h2>
          <a
            href={venueGoogleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-2"
          >
            {venueAddress}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </a>
          <p className="text-gray-600 mt-4">Dans le Beaujolais, au milieu des vignes et des pierres dorées</p>
        </div>
      </section>

      {/* Transport Options */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-light text-center text-gray-800 mb-12">Se rendre au lieu</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Depuis Paris */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                  <span className="text-3xl">🗼</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">Depuis Paris</h3>
                <p className="text-gray-500 text-sm">~450 km</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-800 flex items-center gap-2 mb-2">
                    <span>🚄</span> En train
                  </h4>
                  <ul className="text-gray-600 text-sm space-y-1 ml-6">
                    <li>• TGV Paris Gare de Lyon → Lyon Part-Dieu (~2h)</li>
                    <li>• TER Lyon → Villefranche-sur-Saône (~25 min)</li>
                    <li>• Puis covoiturage ou taxi (~20 min)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 flex items-center gap-2 mb-2">
                    <span>🚗</span> En voiture
                  </h4>
                  <ul className="text-gray-600 text-sm space-y-1 ml-6">
                    <li>• A6 direction Lyon (~4h30)</li>
                    <li>• Sortie Villefranche-sur-Saône</li>
                    <li>• Direction Le Bois-d'Oingt / Val d'Oingt</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Depuis Lyon */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                  <span className="text-3xl">🦁</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">Depuis Lyon</h3>
                <p className="text-gray-500 text-sm">~35 km</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-800 flex items-center gap-2 mb-2">
                    <span>🚄</span> En train
                  </h4>
                  <ul className="text-gray-600 text-sm space-y-1 ml-6">
                    <li>• TER Lyon Part-Dieu → Villefranche-sur-Saône (~25 min)</li>
                    <li>• Puis covoiturage ou taxi (~20 min)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 flex items-center gap-2 mb-2">
                    <span>🚗</span> En voiture
                  </h4>
                  <ul className="text-gray-600 text-sm space-y-1 ml-6">
                    <li>• A6 direction Paris (~30 min)</li>
                    <li>• Sortie Villefranche-sur-Saône</li>
                    <li>• Direction Le Bois-d'Oingt / Val d'Oingt</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Depuis Villefranche */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                  <span className="text-3xl">🍇</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">Depuis Villefranche</h3>
                <p className="text-gray-500 text-sm">~15 km</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-800 flex items-center gap-2 mb-2">
                    <span>🚉</span> Gare de Villefranche-sur-Saône
                  </h4>
                  <ul className="text-gray-600 text-sm space-y-1 ml-6">
                    <li>• Point de ralliement pour les covoiturages</li>
                    <li>• Taxis disponibles à la gare</li>
                    <li>• ~20 min en voiture jusqu'au lieu</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 flex items-center gap-2 mb-2">
                    <span>🚗</span> En voiture
                  </h4>
                  <ul className="text-gray-600 text-sm space-y-1 ml-6">
                    <li>• D38 direction Le Bois-d'Oingt</li>
                    <li>• Suivre Val d'Oingt</li>
                    <li>• Route du Gonnet</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 flex items-center gap-2 mb-2">
                    <span>🚴</span> À vélo
                  </h4>
                  <ul className="text-gray-600 text-sm space-y-1 ml-6">
                    <li>• ~15 km de parcours vallonné</li>
                    <li>• ~45 min à 1h selon le rythme</li>
                    <li>• Paysages magnifiques dans les vignes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bike Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
              <span className="text-3xl">🚴</span>
            </div>
            <h2 className="text-3xl font-light text-gray-800">Venir à vélo</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Pour les plus sportifs, une belle balade à travers les vignes du Beaujolais !
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span>📍</span> Depuis Villefranche-sur-Saône
                </h4>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    <span><strong>Distance :</strong> ~15 km</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    <span><strong>Durée :</strong> 45 min à 1h</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    <span><strong>Dénivelé :</strong> ~250m (vallonné)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    <span><strong>Difficulté :</strong> Modérée</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span>🗺️</span> Itinéraire conseillé
                </h4>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">1.</span>
                    <span>Prendre la D38 direction Ouest</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">2.</span>
                    <span>Traverser Liergues et Pouilly-le-Monial</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">3.</span>
                    <span>Continuer vers Le Bois-d'Oingt</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">4.</span>
                    <span>Suivre Val d'Oingt puis Route du Gonnet</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-gray-700 text-sm">
                <strong>Conseil :</strong> Un espace sera prévu pour garer les vélos en sécurité sur place.
                N'hésitez pas à nous prévenir si vous venez à vélo pour qu'on puisse prévoir le nécessaire !
              </p>
            </div>

            <div className="mt-6 text-center">
              <a
                href={`https://www.google.com/maps/dir/Villefranche-sur-Saône/${encodeURIComponent(venueAddress)}/data=!4m2!4m1!3e1`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors duration-300 font-semibold"
              >
                <span>🗺️</span> Voir l'itinéraire vélo sur Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Train Info */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
              <span className="text-3xl">🚄</span>
            </div>
            <h2 className="text-3xl font-light text-gray-800">Venir en train</h2>
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
            <p className="text-gray-700 leading-relaxed mb-6">
              La gare la plus proche est <strong>Villefranche-sur-Saône</strong>, bien desservie depuis Lyon Part-Dieu (TER toutes les 15-30 min).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-3">Réserver vos billets</h4>
                <div className="space-y-2">
                  <a
                    href="https://www.sncf-connect.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    → SNCF Connect
                  </a>
                  <a
                    href="https://www.trainline.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    → Trainline
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-3">Depuis la gare</h4>
                <p className="text-gray-600 text-sm">
                  Consultez les offres de covoiturage ci-dessous ou contactez-nous pour organiser votre trajet depuis la gare.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carpool Section */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
              <span className="text-3xl">🚗</span>
            </div>
            <h2 className="text-3xl font-light text-gray-800">Covoiturage</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Proposez des places dans votre voiture ou trouvez un covoiturage pour vous rendre au mariage !
            </p>
          </div>

          {/* Add Carpool Button */}
          <div className="text-center mb-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-colors duration-300 font-semibold inline-flex items-center gap-2"
            >
              <span>🚗</span> Proposer un covoiturage
            </button>
          </div>

          {/* Carpool Offers List */}
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Chargement des offres...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center">
              Erreur lors du chargement des offres de covoiturage.
            </div>
          )}

          {!loading && !error && carpoolOffers && carpoolOffers.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {carpoolOffers.map((offer, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg">Depuis {offer.departure_city}</h4>
                      <p className="text-gray-500 text-sm">{offer.departure_time}</p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {offer.seats_available} place{offer.seats_available > 1 ? 's' : ''}
                    </span>
                  </div>
                  {offer.comments && (
                    <p className="text-gray-600 mb-4">{offer.comments}</p>
                  )}
                  <div className="border-t pt-4 flex items-center justify-between">
                    <p className="font-medium text-gray-800">{offer.name}</p>
                    <a
                      href={`mailto:mclainders@gmail.com?subject=Covoiturage depuis ${encodeURIComponent(offer.departure_city)}&body=Bonjour,%0A%0AJe souhaite contacter ${encodeURIComponent(offer.name)} pour le covoiturage depuis ${encodeURIComponent(offer.departure_city)} prévu ${encodeURIComponent(offer.departure_time)}.%0A%0AMerci de me mettre en relation.%0A%0ACordialement,`}
                      className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors"
                    >
                      <span>✉️</span> Contacter
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && (!carpoolOffers || carpoolOffers.length === 0) && (
            <div className="bg-white rounded-xl p-8 text-center">
              <p className="text-gray-600">Aucune offre de covoiturage pour le moment.</p>
              <p className="text-gray-500 text-sm mt-2">Soyez le premier à proposer un trajet !</p>
            </div>
          )}
        </div>
      </section>

      {/* Carpool Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="🚗 Proposer un covoiturage"
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
          <form onSubmit={onSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Votre nom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ville de départ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="departureCity"
                    value={formData.departureCity}
                    onChange={handleChange}
                    placeholder="Ex: Paris, Lyon..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Heure de départ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="departureTime"
                    value={formData.departureTime}
                    onChange={handleChange}
                    placeholder="Ex: Samedi 10h"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Places disponibles <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="seatsAvailable"
                  value={formData.seatsAvailable}
                  onChange={handleChange}
                  min="1"
                  max="8"
                  className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Commentaires
                </label>
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder="Détails supplémentaires (point de RDV, retour prévu...)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 h-24"
                />
              </div>
            </div>

            {submitStatus && !submitStatus.success && (
              <div className="mt-4 p-4 rounded-md bg-red-100 text-red-800">
                {submitStatus.message}
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-full hover:bg-gray-300 transition-colors duration-300 font-semibold"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600 transition-colors duration-300 disabled:bg-gray-400 font-semibold"
              >
                {submitting ? '⏳ Envoi...' : '🚗 Publier'}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default TransportPage;
