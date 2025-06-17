import React from 'react';

/**
 * OurStoryPage Component
 * Displays the story of the couple with timeline and images
 */
const OurStoryPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[75vh] bg-cover bg-center" style={{ backgroundImage: "url('/gallery/ghibli.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-5xl md:text-7xl font-light mb-6">Notre Clan</h1>
          <p className="text-xl max-w-2xl">Comment tout a commencé...</p>
        </div>
      </div>

      {/* Story Content */}
      <div className="py-20 px-6 bg-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl text-center mb-16 text-gray-800">✨ Comment nous nous sommes rencontrés 💕</h2>
          
          <div className="space-y-24">
            {/* Story Section 1 */}
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h3 className="text-2xl mb-4 text-orange-700 font-semibold">🌙 Missy & Barnabe 🌟</h3>
                <p className="text-gray-700 leading-relaxed">
                  Je l'ai vue de l'autre côté du bar et je n'ai pas pu détourner le regard. 
                  À un moment donné, nos yeux se sont croisés et j'ai été envoûté par son sourire. 
                  Ce soir-là, nous avons parlé pendant des heures sans même nous rendre compte du temps qui passait.
                </p>
                <div className="mt-6 inline-block bg-orange-100 px-4 py-2 rounded-full text-orange-700">
                  <span className="font-semibold">📆 Été 2019</span>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="/gallery/missy-barnabe.jpg" 
                    alt="Missy & Barnabe" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/gallery/ghibli.jpg';
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Story Section 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="md:w-1/2">
                <h3 className="text-2xl mb-4 text-orange-700 font-semibold">☕ Notre premier rendez-vous 🚶‍♂️</h3>
                <p className="text-gray-700 leading-relaxed">
                  Après cette soirée mémorable, nous nous sommes retrouvés pour un café dans un petit bistrot du quartier.
                  Ce qui devait être un simple café s'est transformé en une journée entière à se promener dans la ville,
                  à découvrir nos passions communes et à rire ensemble.
                </p>
                <div className="mt-6 inline-block bg-orange-100 px-4 py-2 rounded-full text-orange-700">
                  <span className="font-semibold">🍂 Automne 2019</span>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="/gallery/agathe_sorlet.jpeg" 
                    alt="Premier rendez-vous" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/gallery/ghibli.jpg';
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Story Section 3 */}
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h3 className="text-2xl mb-4 text-orange-700 font-semibold">💍 La demande 🌞</h3>
                <p className="text-gray-700 leading-relaxed">
                  Après trois années merveilleuses ensemble, lors d'un voyage en Italie, j'ai demandé à Soria de m'épouser
                  au coucher du soleil sur une terrasse surplombant la mer. Avec les larmes aux yeux, elle a dit « oui » et
                  nous avons commencé à planifier notre avenir ensemble.
                </p>
                <div className="mt-6 inline-block bg-orange-100 px-4 py-2 rounded-full text-orange-700">
                  <span className="font-semibold">🌺 Printemps 2022</span>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="/gallery/proposal.jpg" 
                    alt="La demande en mariage" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/gallery/ghibli.jpg';
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Story Section 4 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="md:w-1/2">
                <h3 className="text-2xl mb-4 text-purple-700 font-semibold">Notre grand jour</h3>
                <p className="text-gray-700 leading-relaxed">
                  Nous avons choisi le Beaujolais pour célébrer notre union, entourés de nos familles et amis les plus proches.
                  Ce jour spécial marque le début d'une nouvelle aventure ensemble, remplie d'amour, de rires et de souvenirs à créer.
                  Nous sommes impatients de partager ce moment magique avec vous.
                </p>
                <div className="mt-6 inline-block bg-purple-100 px-4 py-2 rounded-full text-purple-700">
                  <span className="font-semibold">Été 2025</span>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="/gallery/wedding.jpg" 
                    alt="Notre mariage" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/gallery/ghibli.jpg';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-24 text-center">
            <h3 className="text-3xl mb-6 text-orange-600">Rejoignez-nous pour célébrer notre amour</h3>
            <p className="text-gray-700 max-w-2xl mx-auto mb-8">
              Nous sommes ravis de partager ce jour spécial avec vous. Explorez notre site pour découvrir tous les détails de notre mariage.
            </p>
            <a 
              href="/rsvp" 
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300"
            >
              Confirmer votre présence
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStoryPage;
