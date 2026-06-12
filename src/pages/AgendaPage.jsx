import { Link } from 'react-router-dom';

/**
 * AgendaPage Component
 * Displays the wedding weekend schedule
 */
const AgendaPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[75vh] bg-cover" style={{ backgroundImage: "url('/gallery/baniere_agenda.jpg')", backgroundPosition: "center 35%" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-5xl md:text-7xl font-light mb-6">Le déroulé du week-end</h1>
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
              <div className="relative flex flex-col md:flex-row items-center">
                {/* Photo - Left side on desktop */}
                <div className="hidden md:flex w-1/2 pr-12 justify-end">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden w-64 h-48">
                    <img src="/gallery/deroule/accueil.jpg" alt="Accueil Café Gourmand" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span class="text-gray-400 text-sm flex items-center justify-center h-full">Photo à venir</span>'; }} />
                  </div>
                </div>
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-6 h-6 bg-orange-500 rounded-full border-4 border-white transform -translate-x-1/2 md:translate-x-0 md:-translate-x-3 z-10"></div>
                {/* Text - Right side on desktop */}
                <div className="flex items-center w-full md:w-1/2 md:pl-12">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full ml-16 md:ml-0">
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-3xl">☕</span>
                        <h3 className="text-2xl font-semibold text-orange-700">14h00</h3>
                      </div>
                      <h4 className="text-xl font-medium mb-2 text-gray-800">Accueil Café Gourmand</h4>
                      <p className="text-gray-600 mb-4">
                        Bienvenue à la Bastide des Hirondelles. <br />En attendant que tous les invités arrivent, nous vous proposons un accueil café accompagné des gourmandises de notre enfance.<br />Détendez-vous et profitez de la vue !
                      </p>
                      <Link to="/volontaire" className="block bg-orange-50 p-4 rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors">
                        <p className="text-sm text-orange-800 font-medium">
                          👋 Devenez hôte ou hôtesse d'accueil ! Aidez-nous à préparer le café et les gourmandises →
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* 15h - Cérémonie */}
              <div className="relative flex flex-col md:flex-row items-center">
                {/* Text - Left side on desktop */}
                <div className="hidden md:flex w-1/2 pr-12 justify-end">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-3xl">💍</span>
                        <h3 className="text-2xl font-semibold text-orange-700">14h45</h3>
                      </div>
                      <h4 className="text-xl font-medium mb-2 text-gray-800">Cérémonie Laïque</h4>
                      <p className="text-gray-600">
                        Nous sommes trop pressés de vous retrouvez pour fêter l’amour à vos côtés. Alors il est temps de prendre place dans le cuvage et d’accueillir les amoureux du jour. Le lieu est en semi-extérieur, nous vous conseillons de prévoir un manteau même si des plaids seront proposés sur place pour vous réchauffer. <br />Ambiance cosy garantie !
                      </p>
                    </div>
                  </div>
                </div>
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-6 h-6 bg-orange-500 rounded-full border-4 border-white transform -translate-x-1/2 md:translate-x-0 md:-translate-x-3 z-10"></div>
                {/* Photo - Right side on desktop */}
                <div className="hidden md:flex w-1/2 pl-12">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden w-64 h-48">
                    <img src="/gallery/deroule/ceremonie.jpg" alt="Cérémonie Laïque" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span class="text-gray-400 text-sm flex items-center justify-center h-full">Photo à venir</span>'; }} />
                  </div>
                </div>
                {/* Mobile: Text card */}
                <div className="flex md:hidden items-center w-full">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full ml-16">
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-3xl">💍</span>
                        <h3 className="text-2xl font-semibold text-orange-700">14h45</h3>
                      </div>
                      <h4 className="text-xl font-medium mb-2 text-gray-800">Cérémonie Laïque</h4>
                      <p className="text-gray-600">
                        Nous sommes trop pressés de vous retrouvez pour fêter l'amour à vos côtés. Alors il est temps de prendre place dans le cuvage et d'accueillir les amoureux du jour. Le lieu est en semi-extérieur, nous vous conseillons de prévoir un manteau même si des plaids seront proposés sur place pour vous réchauffer. <br />Ambiance cosy garantie !
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 16h30 - Goûter */}
              <div className="relative flex flex-col md:flex-row items-center">
                {/* Photo - Left side on desktop */}
                <div className="hidden md:flex w-1/2 pr-12 justify-end">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden w-64 h-48">
                    <img src="/gallery/deroule/gouter.jpg" alt="Goûter Festif" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span class="text-gray-400 text-sm flex items-center justify-center h-full">Photo à venir</span>'; }} />
                  </div>
                </div>
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-6 h-6 bg-orange-500 rounded-full border-4 border-white transform -translate-x-1/2 md:translate-x-0 md:-translate-x-3 z-10"></div>
                {/* Text - Right side on desktop */}
                <div className="flex items-center w-full md:w-1/2 md:pl-12">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full ml-16 md:ml-0">
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-3xl">🍰</span>
                        <h3 className="text-2xl font-semibold text-orange-700">16h00</h3>
                      </div>
                      <h4 className="text-xl font-medium mb-2 text-gray-800">Goûter Festif</h4>
                      <p className="text-gray-600">
                        Place aux festivités ! <br />Déambulez dans la cour extérieure de la Bastide, découvrez les animations et les douceurs automnales proposées par notre traiteur 100% local.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 18h30 - Apéro */}
              <div className="relative flex flex-col md:flex-row items-center">
                {/* Text - Left side on desktop */}
                <div className="hidden md:flex w-1/2 pr-12 justify-end">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-3xl">🥂</span>
                        <h3 className="text-2xl font-semibold text-orange-700">19h00</h3>
                      </div>
                      <h4 className="text-xl font-medium mb-2 text-gray-800">Apéro Dînatoire</h4>
                      <p className="text-gray-600">
                        La nuit tombe doucement et il est l’heure de monter pour découvrir la salle. <br />Un apéritif dinatoire nous attend. Ici, pas de place attitrée ni de repas imposé, chacun est libre de manger assis ou debout et de choisir ce qu’il préfère dans la sélection de produits lyonnais du buffet.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-6 h-6 bg-orange-500 rounded-full border-4 border-white transform -translate-x-1/2 md:translate-x-0 md:-translate-x-3 z-10"></div>
                {/* Photo - Right side on desktop */}
                <div className="hidden md:flex w-1/2 pl-12">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden w-64 h-48">
                    <img src="/gallery/deroule/apero.jpg" alt="Apéro Dînatoire" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span class="text-gray-400 text-sm flex items-center justify-center h-full">Photo à venir</span>'; }} />
                  </div>
                </div>
                {/* Mobile: Text card */}
                <div className="flex md:hidden items-center w-full">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full ml-16">
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-3xl">🥂</span>
                        <h3 className="text-2xl font-semibold text-orange-700">18h30</h3>
                      </div>
                      <h4 className="text-xl font-medium mb-2 text-gray-800">Apéro Dînatoire</h4>
                      <p className="text-gray-600">
                        La nuit tombe doucement et il est l’heure de monter pour découvrir la salle. <br />Un apéritif dinatoire nous attend. Ici, pas de place attitrée ni de repas imposé, chacun est libre de manger assis ou debout et de choisir ce qu’il préfère dans la sélection de produits lyonnais du buffet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 21h - Soirée */}
              <div className="relative flex flex-col md:flex-row items-center">
                {/* Photo - Left side on desktop */}
                <div className="hidden md:flex w-1/2 pr-12 justify-end">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden w-64 h-48 border-2 border-orange-400">
                    <img src="/gallery/deroule/soiree.jpg" alt="Début de la Soirée" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span class="text-gray-400 text-sm flex items-center justify-center h-full">Photo à venir</span>'; }} />
                  </div>
                </div>
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-6 h-6 bg-orange-500 rounded-full border-4 border-white transform -translate-x-1/2 md:translate-x-0 md:-translate-x-3 z-10"></div>
                {/* Text - Right side on desktop */}
                <div className="flex items-center w-full md:w-1/2 md:pl-12">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full ml-16 md:ml-0 border-2 border-orange-400">
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-3xl">🎉</span>
                        <h3 className="text-2xl font-semibold text-orange-700">21h00</h3>
                      </div>
                      <h4 className="text-xl font-medium mb-2 text-gray-800">Début de la Soirée</h4>
                      <p className="text-gray-600 mb-4">
                        Que la fête commence, dansons, chantons, et aimons-nous jusqu’au bout de la nuit ! <br /> Qui sait, peut-être verrons nous l’aube se lever sur les collines du Beaujolais des Pierres dorées ?
                      </p>
                    </div>
                  </div>
                </div>
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
                <div className="relative flex flex-col md:flex-row items-center">
                  {/* Photo - Left side on desktop */}
                  <div className="hidden md:flex w-1/2 pr-12 justify-end">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-64 h-48 border-2 border-purple-400">
                      <img src="/gallery/deroule/brunch.jpg" backgroundPosition="center 60%" alt="Repas du Lendemain" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span class="text-gray-400 text-sm flex items-center justify-center h-full">Photo à venir</span>'; }} />
                    </div>
                  </div>
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 w-6 h-6 bg-purple-500 rounded-full border-4 border-white transform -translate-x-1/2 md:translate-x-0 md:-translate-x-3 z-10"></div>
                  {/* Text - Right side on desktop */}
                  <div className="flex items-center w-full md:w-1/2 md:pl-12">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full ml-16 md:ml-0 border-2 border-purple-400">
                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-3">
                          <span className="text-3xl">🍳</span>
                          <h3 className="text-2xl font-semibold text-purple-700">11h30</h3>
                        </div>
                        <h4 className="text-xl font-medium mb-2 text-gray-800">Repas du Lendemain</h4>
                        <p className="text-gray-600 mb-4">
                          Après une soirée bien arrosée, un repas réconfortant fait toujours du bien. <br />Nous avons choisi une croziflette géante, parce que le gras, c’est la vie !
                        </p>
                        <Link to="/volontaire" className="block bg-purple-50 p-4 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors">
                          <p className="text-sm text-purple-800 font-medium">
                            🍽️ Vous pouvez participer à la préparation ! Réservez votre créneau →
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendaPage;
