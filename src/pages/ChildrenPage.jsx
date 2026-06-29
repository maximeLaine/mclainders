/**
 * ChildrenPage Component
 * Information about children accommodations at the wedding
 */
import { assetUrl } from '../utils/assets';

const ChildrenPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[75vh] bg-cover bg-center" style={{ backgroundImage: `url('${assetUrl('/gallery/baniere_enfant.jpg')}')`, backgroundPosition: "center 75%" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-5xl md:text-7xl font-light mb-6">Les enfants</h1>
          <p className="text-xl max-w-2xl">Informations pour les petits invités</p>
        </div>
      </div>

      {/* Ce qui est prévu */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
              <span className="text-4xl">👶</span>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Plusieurs éléments ont été pensés pour accueillir les enfants à partir de 4 ans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Dortoir */}
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <span className="text-3xl">🛏️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Dortoir</h3>
              <p className="text-gray-600 leading-relaxed">
                Un dortoir de 8 couchages est disponible sur place, directement accessible depuis la salle avec une porte insonorisée. Oreillers et sacs de couchages sont à prévoir même si des plaids seront disponibles si nécessaire.
              </p>
            </div>

            {/* Espace enfant */}
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Espace enfant</h3>
              <p className="text-gray-600 leading-relaxed">
                Un espace enfant sera mis en place dans la salle avec des coloriages, des jeux, des matelas pour s'allonger ou faire une bataille d'oreillers.
              </p>
            </div>

            {/* Repas */}
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <span className="text-3xl">🍽️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Repas</h3>
              <p className="text-gray-600 leading-relaxed">
                Les enfants n'auront pas de repas spécial, ils pourront choisir ce qui leur fait plaisir dans le buffet, comme les adultes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Informations importantes */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-light text-gray-800">Informations importantes</h2>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm">
            <p className="text-gray-700 leading-relaxed mb-6">
              Même si nous serions ravis de voir les petites merveilles récemment nées dans notre entourage, nous tenons à préciser que <strong>la salle n'est pas adaptée à des enfants en bas âge</strong> et qu'il en va de la responsabilité des parents de les amener à la fête.
            </p>

            <div className="flex justify-center my-6">
              <div className="w-24 h-px bg-gray-300"></div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">🌤️</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Si le temps nous le permet, une partie du week-end se déroulera dehors. Il est donc nécessaire de <strong>prévoir des habits ou manteaux chauds</strong> même si des plaids seront disponibles sur place.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">🏠</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  La salle est un grand rectangle sans séparation ni espace insonorisé permettant de rajouter des couchages. <strong>Il n'y a pas de salles où déployer des lits parapluies</strong> et le dortoir est adapté uniquement pour des enfants dormant dans des lits classiques.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">🍼</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  L'accès à la cuisine sera limité pour permettre au traiteur de ne pas être dérangé. Des <strong>prises électriques, un accès à l'eau et à une table de change</strong> seront disponibles dans les toilettes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Message de conclusion */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Nous vous remercions de votre compréhension et sommes disponibles si vous avez des questions logistiques.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ChildrenPage;
