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

      {/* Content Section */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl mb-8">Notre liste de mariage</h2>
          <div className="flex justify-center">
            <div className="w-24 h-px bg-gray-400 my-6"></div>
          </div>
          <p className="text-lg text-gray-700 mb-8">
            Nous avons la chance d'avoir déjà tout ce dont nous avons besoin pour notre quotidien.
            Si vous souhaitez nous faire un cadeau, une participation à notre voyage de noces
            serait la plus belle des attentions.
          </p>

          <div className="bg-gray-100 p-8 rounded-lg mt-8">
            <h3 className="text-2xl mb-4">Cagnotte voyage de noces</h3>
            <p className="text-gray-600 mb-6">
              Nous rêvons de partir découvrir de nouveaux horizons ensemble.
              Votre contribution nous aidera à réaliser ce rêve.
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
