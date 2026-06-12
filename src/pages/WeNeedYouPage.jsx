import { useSupabaseData } from '../hooks/useSupabaseData';
import BrunchCookingForm from '../components/BrunchCookingForm';
import VolunteerSlotForm from '../components/VolunteerSlotForm';

/**
 * WeNeedYouPage Component
 * Allows guests to participate in the wedding by reserving DJ spots and making proposals
 */
const WeNeedYouPage = () => {
  // Group flat brunch_cooking_slots data into the format expected by BrunchCookingForm
  function groupCookingSlots(data) {
    if (!Array.isArray(data)) return [];
    const grouped = {};
    data.forEach(row => {
      if (!grouped[row.time_slot]) {
        grouped[row.time_slot] = { time: row.time_slot, positions: [] };
      }
      grouped[row.time_slot].positions.push({ name: row.name || "", spot_index: row.spot_index });
    });
    return Object.values(grouped);
  }

  // Fetch data for all volunteer tables
  const { data: voiturierSlots, loading: loadingVoiturier, error: errorVoiturier, refetch: refetchVoiturier } = useSupabaseData('voiturier_slots', { orderBy: 'spot_index' });
  const { data: accueilSlots, loading: loadingAccueil, error: errorAccueil, refetch: refetchAccueil } = useSupabaseData('accueil_slots', { orderBy: 'spot_index' });
  const { data: cafeSlots, loading: loadingCafe, error: errorCafe, refetch: refetchCafe } = useSupabaseData('cafe_slots', { orderBy: 'spot_index' });
  const { data: rangementSlots, loading: loadingRangement, error: errorRangement, refetch: refetchRangement } = useSupabaseData('rangement_slots', { orderBy: 'spot_index' });
  const { data: cookingSlotsData, loading: loadingCooking, error: errorCooking } = useSupabaseData('brunch_cooking_slots', { orderBy: 'time_slot', transform: groupCookingSlots });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[75vh] bg-cover" style={{ backgroundImage: "url('/gallery/baniere_participez.jpg')", backgroundPosition: "center 35%" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-5xl md:text-7xl font-light mb-6">Votre aide est précieuse</h1>
          <p className="text-xl max-w-2xl">Nous cherchons des volontaires pour rendre ce week-end vraiment spécial</p>
        </div>
      </div>

      {/* Introduction Text */}
      <div className="py-12 px-6 bg-white">
        <p className="text-center text-lg max-w-3xl mx-auto text-gray-700 leading-relaxed">
          Comme en festival ou dans une association, inscrivez vous sur l'activité et le créneau de votre choix et rencontrez des personnes vraiment trop cool autour d'une passion commune : <br />les Mc Lainders 😉
        </p>
      </div>

      {/* Voiturier Section */}
      <section className="py-20 px-6 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl text-center mb-8 text-gray-800">🚗 Voiturier enjoué !</h2>

          <p className="text-center text-lg mb-8 max-w-3xl mx-auto text-gray-700 leading-relaxed">
            Comme dans les restaurants 4 étoiles, nous allons avoir besoin de voituriers. <br /> Leur rôle est précieux, indiquer aux invités où se garer sur le parking et les orienter vers l'entrée de la Bastide des Hirondelles. 
            <br /><br />Le point positif : Une fois tout le monde arrivé, vous serez les seuls invités à avoir parlé aux 110 personnes attendues pour la fête. Vous connaîtrez tout le monde, et tout le monde vous connaîtra et ça, c'est la méga classe !
          </p>

          <div className="flex justify-center gap-8 text-center mb-12">
            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-orange-600 font-semibold">👥 3 personnes</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-orange-600 font-semibold">🕐 Arrivée : 13h30</p>
            </div>
          </div>

          {/* Voiturier Form */}
          {errorVoiturier && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8 max-w-3xl mx-auto text-center">
              <p>{errorVoiturier}</p>
            </div>
          )}
          {loadingVoiturier ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Chargement des places...</p>
            </div>
          ) : (
            <VolunteerSlotForm
              slots={voiturierSlots || []}
              onSpotReserved={refetchVoiturier}
              tableName="voiturier_slots"
              emoji="🚗"
              title="Je suis volontaire"
              modalTitle="Réserver une place de voiturier"
              successMessage="Merci ! Vous êtes inscrit comme voiturier."
            />
          )}
        </div>
      </section>

      {/* Hôte et hôtesse d'accueil Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl text-center mb-8 text-gray-800">👋 Hôte et hôtesse d'accueil</h2>

          <p className="text-center text-lg mb-8 max-w-3xl mx-auto text-gray-700 leading-relaxed">
            « Bonjour, bienvenue à la fête de l'amour des Mc Lainders, je peux voir votre ticket s'il vous plaît ? »
            <br /><br />
            En plus d'être souriant, il faudra vérifier les identités et sortir les intrus. Euh… non on s'égare là normalement ça, c'est le rôle d'un vigile. Vous, vous devez préparer le café, le thé, et les petites gourmandises prévues pour l'accueil gourmand. Là où ça se corse, c'est qu'il faudra remballer rapidement pour ne pas louper l'échange des alliances. Mais vous inquiétez pas, on a prévu des astuces pour être ultra efficace !
          </p>

          <div className="flex justify-center gap-8 text-center mb-12">
            <div className="bg-gray-100 rounded-lg shadow-md p-4">
              <p className="text-orange-600 font-semibold">👥 3 personnes</p>
            </div>
            <div className="bg-gray-100 rounded-lg shadow-md p-4">
              <p className="text-orange-600 font-semibold">🕐 Horaire : 13h00</p>
            </div>
          </div>

          {/* Accueil Form */}
          {errorAccueil && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8 max-w-3xl mx-auto text-center">
              <p>{errorAccueil}</p>
            </div>
          )}
          {loadingAccueil ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Chargement des places...</p>
            </div>
          ) : (
            <VolunteerSlotForm
              slots={accueilSlots || []}
              onSpotReserved={refetchAccueil}
              tableName="accueil_slots"
              emoji="👋"
              title="Je suis volontaire"
              modalTitle="Réserver une place d'accueil"
              successMessage="Merci ! Vous êtes inscrit à l'accueil."
            />
          )}
        </div>
      </section>

      {/* Brunch Cooking Section */}
      <section className="py-20 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl text-center mb-8 text-gray-800">👨‍🍳 Cuistots du matin, rigolent jusqu'au lendemain !</h2>

          <p className="text-center text-lg mb-8 max-w-3xl mx-auto text-gray-700 leading-relaxed">
            Nous cherchons des cuistots pour nous aider en cuisine le lendemain de la fête. L'objectif, préparez une croziflette géante dans une poêle à paella… CQFD !
            <br /><br />
            Tu rêves de sentir le reblochon, d'avoir un tablier personnalisé et de servir des grosses parts de croziflettes comme au marché de noël, alors tu es la personne qu'il nous faut ! Inscris-toi vite avant qu'il n'y ait plus de place.
          </p>

          <div className="flex justify-center gap-8 text-center mb-12">
            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-orange-600 font-semibold">👥 7 personnes</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-orange-600 font-semibold">🕐 10h-11h / 11h-12h / 12h-13h</p>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-24 h-px bg-gray-400 my-8"></div>
          </div>

          <h3 className="text-2xl text-center font-semibold mb-8 text-orange-600">Sélectionnez votre créneau de cuisine</h3>

          {/* Error state */}
          {errorCooking && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8 max-w-3xl mx-auto text-center">
              <p>{errorCooking}</p>
            </div>
          )}

          {/* Loading state */}
          {loadingCooking ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent">
                <span className="sr-only">Chargement...</span>
              </div>
              <p className="mt-4 text-gray-600">Chargement des créneaux...</p>
            </div>
          ) : (
            <BrunchCookingForm
              slots={cookingSlotsData || []}
            />
          )}
        </div>
      </section>

      {/* Respo Café Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl text-center mb-8 text-gray-800">☕ Respo café !</h2>

          <p className="text-center text-lg mb-8 max-w-3xl mx-auto text-gray-700 leading-relaxed">
            C'est LE job le plus important en lendemain de soirée, préparez du café pour tous les invités. Et pour ne pas vous mettre de bâton dans les roues, on a même pensé à louer un percolateur, si ça c'est pas hyper sympa ! Bon il faudra aussi préparer la table, les tasses, le sucre etc…
          </p>

          <div className="flex justify-center gap-8 text-center mb-12">
            <div className="bg-gray-100 rounded-lg shadow-md p-4">
              <p className="text-orange-600 font-semibold">👥 2 personnes</p>
            </div>
            <div className="bg-gray-100 rounded-lg shadow-md p-4">
              <p className="text-orange-600 font-semibold">🕐 Horaire : 10h</p>
            </div>
          </div>

          {/* Café Form */}
          {errorCafe && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8 max-w-3xl mx-auto text-center">
              <p>{errorCafe}</p>
            </div>
          )}
          {loadingCafe ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Chargement des places...</p>
            </div>
          ) : (
            <VolunteerSlotForm
              slots={cafeSlots || []}
              onSpotReserved={refetchCafe}
              tableName="cafe_slots"
              emoji="☕"
              title="Je suis volontaire"
              modalTitle="Réserver une place de respo café"
              successMessage="Merci ! Vous êtes inscrit comme respo café."
            />
          )}
        </div>
      </section>

      {/* Rangement Section */}
      <section className="py-20 px-6 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl text-center mb-8 text-gray-800">🧹 Rangement</h2>

          <p className="text-center text-lg mb-8 max-w-3xl mx-auto text-gray-700 leading-relaxed">
            La fête est finie… ou pas ! Venez tournez les torchons avec nous pour prolonger le week-end en soirée mousse. Nettoyez, balayer, astiquer…
          </p>

          <div className="flex justify-center text-center mb-12">
            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-orange-600 font-semibold">👥 Nombre indéfini de personnes motivées !</p>
            </div>
          </div>

          <p className="text-center text-sm mb-8 text-gray-500 italic">
            PS : c'est le meilleur plan pour connaître tous les potins de la soirée…
          </p>

          {/* Rangement Form */}
          {errorRangement && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8 max-w-3xl mx-auto text-center">
              <p>{errorRangement}</p>
            </div>
          )}
          {loadingRangement ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Chargement des places...</p>
            </div>
          ) : (
            <VolunteerSlotForm
              slots={rangementSlots || []}
              onSpotReserved={refetchRangement}
              tableName="rangement_slots"
              emoji="🧹"
              title="Je suis volontaire"
              modalTitle="Réserver une place pour le rangement"
              successMessage="Merci ! Vous êtes inscrit pour le rangement."
            />
          )}
        </div>
      </section>

    </div>
  );
};

export default WeNeedYouPage;
