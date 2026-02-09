import { useSupabaseData } from '../hooks/useSupabaseData';
import OptimizedImage from '../components/OptimizedImage';

/**
 * AccommodationPage Component
 * Displays accommodations fetched from Supabase
 */
const AccommodationPage = () => {
  // Use the generic Supabase data fetching hook
  const { data: accommodations, loading, error } = useSupabaseData('accommodations');
  
  /**
   * Render accommodation card component
   * @param {Object} accommodation - The accommodation data
   * @param {Number} index - The index of the accommodation
   */
  const renderAccommodationCard = (accommodation, index) => (
    <div key={index} className={`bg-white rounded-lg shadow-md overflow-hidden ${accommodation.is_reserved ? 'opacity-75' : ''}`}>
      {/* Image */}
      <div className="h-48 overflow-hidden relative">
        <OptimizedImage
          src={accommodation.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'}
          alt={accommodation.name}
          className={`w-full h-full object-cover ${accommodation.is_reserved ? 'grayscale' : ''}`}
        />
        {accommodation.is_reserved && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            Complet
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{accommodation.name || 'Hébergement'}</h3>

        {/* Reserved notice */}
        {accommodation.is_reserved && (
          <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-orange-700 text-sm font-medium">
              Ce lieu est victime de son succès !
            </p>
          </div>
        )}

        <div className="mb-4">
          <p className="text-gray-600"><span className="font-medium">Type:</span> {accommodation.type || 'Non spécifié'}</p>
          <p className="text-gray-600"><span className="font-medium">Capacité:</span> {accommodation.capacity || 'Non spécifié'}</p>
          <p className="text-gray-600"><span className="font-medium">Distance:</span> {accommodation.distance || 'Non spécifié'}</p>
        </div>
        <div className="flex flex-col space-y-2">
          {accommodation.contact && (
            <p className="text-gray-600"><span className="font-medium">Contact:</span> {accommodation.contact}</p>
          )}
          {accommodation.website && (
            <a
              href={accommodation.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:underline"
            >
              Visiter le site web
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[75vh] bg-cover bg-center" style={{ backgroundImage: "url('/gallery/baniere_hebergements.jpg')", backgroundPosition: "center 65%" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-5xl md:text-7xl font-light mb-6">Hébergements</h1>
          <p className="text-xl max-w-2xl">Si vous n'avez pas votre propre Dobby (notre van libre 🧦), voici quelques infos pour vous.</p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            <p className="ml-3 text-lg text-gray-600">Chargement des hébergements...</p>
          </div>
        )}
        
        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Erreur!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        
        {/* No Data State */}
        {!loading && !error && (!accommodations || accommodations.length === 0) && (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600">Aucun hébergement disponible pour le moment.</p>
          </div>
        )}
        
        {/* Accommodations Grid */}
        {!loading && !error && accommodations && accommodations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...accommodations].sort((a, b) => (a.is_reserved ? 1 : 0) - (b.is_reserved ? 1 : 0)).map(renderAccommodationCard)}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccommodationPage;
