import React from 'react';

/**
 * OurStoryPage Component
 * Displays the wedding weekend schedule
 */
const OurStoryPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[75vh] bg-cover bg-center" style={{ backgroundImage: "url('/gallery/ghibli.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-5xl md:text-7xl font-light mb-6">Le Déroulé du Week-end</h1>
          <p className="text-xl max-w-2xl">Samedi 7 & Dimanche 8 novembre 2026</p>
        </div>
      </div>

      {/* Schedule Content */}
      <div className="py-20 px-6 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl text-center mb-16 text-gray-800">Samedi 7 novembre 2026</h2>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-orange-300 transform md:-translate-x-1/2"></div>

            <div className="space-y-12">
              {/* 14h - Accueil */}
              <div className="relative flex items-center">
                <div className="flex items-center w-full md:w-1/2 md:pr-12 md:justify-end">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-full">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-3xl">☕</span>
                      <h3 className="text-2xl font-semibold text-orange-700">14h00</h3>
                    </div>
                    <h4 className="text-xl font-medium mb-2 text-gray-800">Accueil Café Gourmand</h4>
                    <p className="text-gray-600">
                      Bienvenue au Domaine ! Profitez d'un café accompagné de petites douceurs pour bien commencer la journée.
                    </p>
                  </div>
                </div>
                <div className="absolute left-8 md:left-1/2 w-6 h-6 bg-orange-500 rounded-full border-4 border-white transform -translate-x-1/2 md:translate-x-0 md:-translate-x-3"></div>
              </div>

              {/* 15h - Cérémonie */}
              <div className="relative flex items-center md:justify-end">
                <div className="flex items-center w-full md:w-1/2 md:pl-12">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-full ml-16 md:ml-0">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-3xl">💍</span>
                      <h3 className="text-2xl font-semibold text-orange-700">15h00</h3>
                    </div>
                    <h4 className="text-xl font-medium mb-2 text-gray-800">Cérémonie Laïque</h4>
                    <p className="text-gray-600">
                      Le moment tant attendu ! Rejoignez-nous pour notre cérémonie laïque où nous échangerons nos vœux.
                    </p>
                  </div>
                </div>
                <div className="absolute left-8 md:left-1/2 w-6 h-6 bg-orange-500 rounded-full border-4 border-white transform -translate-x-1/2 md:translate-x-0 md:-translate-x-3"></div>
              </div>

              {/* 16h30 - Goûter */}
              <div className="relative flex items-center">
                <div className="flex items-center w-full md:w-1/2 md:pr-12 md:justify-end">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-full">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-3xl">🍰</span>
                      <h3 className="text-2xl font-semibold text-orange-700">16h30</h3>
                    </div>
                    <h4 className="text-xl font-medium mb-2 text-gray-800">Goûter Festif</h4>
                    <p className="text-gray-600">
                      Place aux festivités ! Savourez notre pièce montée et de délicieuses gourmandises dans une ambiance conviviale.
                    </p>
                  </div>
                </div>
                <div className="absolute left-8 md:left-1/2 w-6 h-6 bg-orange-500 rounded-full border-4 border-white transform -translate-x-1/2 md:translate-x-0 md:-translate-x-3"></div>
              </div>

              {/* 18h30 - Apéro */}
              <div className="relative flex items-center md:justify-end">
                <div className="flex items-center w-full md:w-1/2 md:pl-12">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-full ml-16 md:ml-0">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-3xl">🥂</span>
                      <h3 className="text-2xl font-semibold text-orange-700">18h30</h3>
                    </div>
                    <h4 className="text-xl font-medium mb-2 text-gray-800">Apéro Dînatoire</h4>
                    <p className="text-gray-600">
                      Levons nos verres ensemble ! Un apéritif dînatoire avec des mets raffinés et des boissons à volonté.
                    </p>
                  </div>
                </div>
                <div className="absolute left-8 md:left-1/2 w-6 h-6 bg-orange-500 rounded-full border-4 border-white transform -translate-x-1/2 md:translate-x-0 md:-translate-x-3"></div>
              </div>

              {/* 21h - Soirée */}
              <div className="relative flex items-center">
                <div className="flex items-center w-full md:w-1/2 md:pr-12 md:justify-end">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-full border-2 border-orange-400">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-3xl">🎉</span>
                      <h3 className="text-2xl font-semibold text-orange-700">21h00</h3>
                    </div>
                    <h4 className="text-xl font-medium mb-2 text-gray-800">Début de la Soirée</h4>
                    <p className="text-gray-600 mb-4">
                      La fête commence ! Danse, musique et moments inoubliables jusqu'au bout de la nuit.
                    </p>
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                      <p className="text-sm text-orange-800 font-medium">
                        💿 N'oubliez pas de réserver votre créneau DJ dans la section "Nous avons besoin de vous" !
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 md:left-1/2 w-6 h-6 bg-orange-500 rounded-full border-4 border-white transform -translate-x-1/2 md:translate-x-0 md:-translate-x-3"></div>
              </div>
            </div>
          </div>

          {/* Sunday Schedule */}
          <div className="mt-32">
            <h2 className="text-4xl text-center mb-16 text-gray-800">Dimanche 8 novembre 2026</h2>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-purple-300 transform md:-translate-x-1/2"></div>

              <div className="space-y-12">
                {/* 11h30 - Brunch */}
                <div className="relative flex items-center">
                  <div className="flex items-center w-full md:w-1/2 md:pr-12 md:justify-end">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full border-2 border-purple-400">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-3xl">🍳</span>
                        <h3 className="text-2xl font-semibold text-purple-700">11h30</h3>
                      </div>
                      <h4 className="text-xl font-medium mb-2 text-gray-800">Repas du Lendemain</h4>
                      <p className="text-gray-600 mb-4">
                        Continuons les festivités ! Rejoignez-nous pour un délicieux brunch convivial et partagez vos meilleurs souvenirs de la veille.
                      </p>
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <p className="text-sm text-purple-800 font-medium">
                          🍽️ Vous pouvez participer à la préparation ! Réservez votre créneau dans "Nous avons besoin de vous".
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-8 md:left-1/2 w-6 h-6 bg-purple-500 rounded-full border-4 border-white transform -translate-x-1/2 md:translate-x-0 md:-translate-x-3"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-24 text-center">
            <h3 className="text-3xl mb-6 text-orange-600">Nous avons hâte de célébrer avec vous !</h3>
            <p className="text-gray-700 max-w-2xl mx-auto mb-8">
              Un week-end rempli d'émotions, de joie et de partage vous attend. N'oubliez pas de confirmer votre présence !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/rsvp"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300"
              >
                Confirmer ma présence
              </a>
              <a
                href="/nous-avons-besoin-de-vous"
                className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300"
              >
                Participer à la soirée
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStoryPage;
