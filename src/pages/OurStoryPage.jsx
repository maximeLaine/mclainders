import React from 'react';

const OurStoryPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('/gallery/ghibli.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-5xl md:text-7xl font-light mb-6">Notre Clan</h1>
          <p className="text-xl max-w-2xl">Comment tout a commencé...</p>
        </div>
      </div>

      {/* Story Content */}
      <div className="py-20 px-6 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl text-center mb-16">Comment nous nous sommes rencontrés</h2>
          
          <div className="space-y-16">
            {/* Story Section 1 */}
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h3 className="text-2xl mb-4">Missy & Barnabe</h3>
                <p className="text-gray-700">
                  Je l'ai vue de l'autre côté du bar et je n'ai pas pu détourner le regard. 
                  À un moment donné, nos yeux se sont croisés et j'ai été envouté par son sourire. 
                  Ce soir-là, nous avons parlé pendant des heures sans même nous rendre compte du temps qui passait.
                </p>
              </div>
              <div className="md:w-1/2">
                <div className="aspect-square bg-gray-200">
                  {/* Placeholder for image */}
                  <img src="/gallery/missy-barnabe.jpg" alt="Missy & Barnabe" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Story Section 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="md:w-1/2">
                <h3 className="text-2xl mb-4">Notre premier rendez-vous</h3>
                <p className="text-gray-700">
                  Après cette soirée mémorable, nous nous sommes retrouvés pour un café dans un petit bistrot du quartier.
                  Ce qui devait être un simple café s'est transformé en une journée entière à se promener dans la ville,
                  à découvrir nos passions communes et à rire ensemble.
                </p>
              </div>
              <div className="md:w-1/2">
                <div className="aspect-square bg-gray-200">
                  {/* Placeholder for image */}
                  <img src="/gallery/agathe_sorlet.jpeg" alt="Missy & Barnabe" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Story Section 3 */}
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h3 className="text-2xl mb-4">La demande</h3>
                <p className="text-gray-700">
                  Après trois années merveilleuses ensemble, lors d'un voyage en Italie, j'ai demandé à Soria de m'épouser
                  au coucher du soleil sur une terrasse surplombant la mer. Avec les larmes aux yeux, elle a dit "oui" et
                  nous avons commencé à planifier notre avenir ensemble.
                </p>
              </div>
              <div className="md:w-1/2">
                <div className="aspect-square bg-gray-200">
                  {/* Placeholder for image */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStoryPage;
