/**
 * WeddingListPage Component
 * Displays the wedding gift list
 */
const WeddingListPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[75vh] bg-cover bg-center" style={{ backgroundImage: "url('/gallery/baniere_velo.jpg')", backgroundPosition: "center 37%" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-5xl md:text-7xl font-light mb-6">Liste de Mariage</h1>
          <p className="text-xl max-w-2xl">Votre présence est le plus beau des cadeaux</p>
        </div>
      </div>
      {/* Intro Section */}
      <div className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-700 leading-relaxed">
            Malgré cela, certains d'entre vous nous ont demandé ce qui nous ferait plaisir.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-6">
            Nous mesurons notre chance d'avoir tout ce dont nous avons besoin dans notre quotidien : une famille aimante, des amis présents, un appartement cosy-cocon… mais nous avons un rêve.
          </p>
        </div>
      </div>

      {/* Le Rêve - Citation mise en avant */}
      <div className="py-16 px-6 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-700 text-center leading-relaxed mb-8">
            Ce rêve semblait inaccessible et puis on s'est dit :
          </p>
          <blockquote className="bg-white border-l-4 border-orange-500 p-8 rounded-r-lg shadow-md">
            <p className="text-2xl md:text-3xl font-light text-gray-800 italic">
              « MERDE ! La chance, il faut la provoquer, elle ne peut pas toujours arriver aux autres. 2026 sera notre année, on partira traverser la Nouvelle-Zélande en vélo. Point final. »
            </p>
          </blockquote>
          <p className="text-lg text-gray-700 text-center leading-relaxed mt-8">
            Et voilà, Maxime a négocié un congé de 2 mois, Claire a négocié sa fin de contrat CDD et nous partirons sur les routes de Nouvelle-Zélande de <strong>fin novembre 2026 à début février 2027</strong>.
          </p>
        </div>
      </div>

      {/* L'objectif - Avec icône */}
      <div className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
            <span className="text-4xl">🚴</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">L'objectif ?</h3>
          <p className="text-xl text-gray-700 leading-relaxed">
            Faire l'<strong>Aotearoa Tour</strong> du nord au sud, en bikepacking.
          </p>
          <div className="flex justify-center my-8">
            <div className="w-24 h-px bg-gray-300"></div>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed">
            Sauf que voilà, partir voyager en vélo sans matériel et sans vélos et bien… c'est pas facile, facile.
            <br /><br />C'est pourquoi nous avons décidé de vous proposer une <strong>liste de mariage un peu atypique</strong>.
            <br />Elle regroupe une grande partie du matériel dont nous avons besoin pour aller au bout de notre rêve.
            <br />L'idée que vous allez nous accompagner dans ce voyage, en étant incarnés par le matériel offert, nous remplit de bonheur !

          </p>
        </div>
      </div>

      {/* Signature + Cagnotte */}
      <div className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-2xl font-light text-gray-800 mb-2">Mille mercis,</p>
          <p className="text-3xl font-semibold text-orange-600 mb-12">Claire & Max</p>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Cagnotte voyage de noces</h3>
            <p className="text-gray-600 mb-6">
              Votre contribution nous aidera à réaliser ce rêve et à vivre cette aventure ensemble, même à distance.
            </p>
            <a
              href="#"
              className="inline-block bg-orange-500 text-white px-8 py-3 rounded-full uppercase text-sm font-semibold hover:bg-orange-600 transition-colors duration-300"
            >
              Participer à la cagnotte
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingListPage;
