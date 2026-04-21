import { useState, useCallback } from 'react';
import { useIbanEmail } from '../hooks/useIbanEmail';
import { useSupabaseData } from '../hooks/useSupabaseData';

// ─── CADEAUX ────────────────────────────────────────────────────────────────
const GIFT_ITEMS = [
  // ── BIKEPACKING ──
  {
    id: 10, name: 'Deux vélos gravel', category: 'Bikepacking',
    description: "Ce sont les deux protagonistes principaux de notre aventure. Nous hésitons encore sur le modèle, mais pas sur le prix, faut bien se fixer une limite non ? PS : on a déjà trouvé leurs petits noms ;)",
    price: 2400, image: '/liste/velo-gravel.png', emoji: '🚲',
  },
  {
    id: 11, name: 'Deux paires de sacoches', category: 'Bikepacking',
    description: 'Pour vivre heureux, vivons légers !',
    price: 300, image: '/liste/saccoche.jpg', emoji: '👜',
  },
  {
    id: 12, name: 'Deux sacoches de cadres', category: 'Bikepacking',
    description: "On est jamais trop prudents, apparement en traversant la NZ, on traverse plusieurs pays alors il faut bien un espace pour ranger la doudoune, la veste et le maillot de bain non ? ;)",
    price: 230, image: '/liste/sacoche-cadre.png', emoji: '🎽',
  },
  {
    id: 13, name: 'Deux paires de sacoches de guidon', category: 'Bikepacking',
    description: 'Des petits contenants parfaits pour ranger nos "essentiels" de voyage !',
    price: 200, image: '/liste/saccoche-guidon.jpg', emoji: '🎒',
  },
  {
    id: 1, name: 'Deux paires de Food Pouch', category: 'Bikepacking',
    description: 'Des petits contenants parfaits pour y glisser nos "gourmandises" lors des longues journées de pédalage.',
    price: 120, image: '/liste/food pouch.jpg', emoji: '🍬',
  },
  // ── CAMPING ──
  {
    id: 2, name: 'Tente Camp Minima 2 SL', category: 'Camping',
    description: 'Une tente ultra compact mais aussi ultra confort !',
    price: 248, image: '/liste/tente.jpg', emoji: '⛺',
  },
  {
    id: 3, name: 'Deux sacs de couchage ultras légers', category: 'Camping',
    description: "Comme on va porter nous même toutes nos affaires, autant qu'ils soient légers !",
    price: 375, image: '/liste/sac-couchage.png', emoji: '🛌',
  },
  {
    id: 4, name: 'Un matelas gonflable', category: 'Camping',
    description: 'Il nous en manque un pour pouvoir dormir à deux... logique !',
    price: 50, image: '/liste/matelas.png', emoji: '🌙',
  },
  // ── ÉQUIPEMENT ──
  {
    id: 14, name: 'Deux casques vélo', category: 'Équipement',
    description: 'La sécurité avant tout, même sur les routes de NZ !',
    price: 200, image: '/liste/casque.png', emoji: '🪖',
  },
  {
    id: 15, name: 'Veste de pluie — Max', category: 'Équipement',
    description: 'Pour affronter les caprices météo néo-zélandais sans se mouiller.',
    price: 90, image: '/liste/veste-pluie-max.png', emoji: '🧥',
  },
  {
    id: 16, name: 'Veste de pluie — Claire', category: 'Équipement',
    description: 'Pour affronter les caprices météo néo-zélandais sans se mouiller.',
    price: 90, image: '/liste/veste-pluie-claire.png', emoji: '🧥',
  },
  {
    id: 5, name: 'Doudoune ultra light — Claire', category: 'Équipement',
    description: 'Pour avoir bien chaud en prenant le moins de place possible.',
    price: 70, image: '/liste/doudoune_claire.jpg', emoji: '🧥',
  },
  {
    id: 6, name: 'Doudoune ultra light — Max', category: 'Équipement',
    description: 'Pour avoir bien chaud en prenant le moins de place possible.',
    price: 70, image: '/liste/doudoune_max.jpg', emoji: '🧥',
  },
  // ── LOISIRS ──
  {
    id: 7, name: 'Deux Liseuses Vivlio + housses', category: 'Loisirs',
    description: "Pour les longues soirées sous la tente à lire des romans d'aventure.",
    price: 260, image: '/liste/liseuse-vivlio.png', emoji: '📖',
  },
  {
    id: 17, name: 'Une enceinte JBL Clip', category: 'Loisirs',
    description: 'Pour mettre de la bonne musique dans les plus beaux paysages du monde.',
    price: 70, image: '/liste/jbl-clip.png', emoji: '🔊',
  },
  // ── VOYAGE ──
  {
    id: 8, name: 'Frais de vie quotidienne', category: 'Voyage',
    description: 'Pour pouvoir manger, dormir et kiffer la vie sur place !',
    price: 3000, image: '/liste/faris_quotidien.jpg', emoji: '🏙️',
  },
  {
    id: 9, name: "Billets d'avion", category: 'Voyage',
    description: 'Suppléments vélos ;)',
    price: 4250, image: '/liste/billet-avion.jpg', emoji: '✈️',
  },
  // ── AUTRES CADEAUX ──
  {
    id: 18, name: 'Visite de Hobbiton, le village des hobbits', category: 'Autres cadeaux',
    description: "Parce qu'on traverse quand même la Terre du Milieu !",
    price: 150, image: '/liste/hobbiton.png', emoji: '🧙',
  },
];

const CATEGORIES = ['Tous', ...new Set(GIFT_ITEMS.map(g => g.category))];

// ─── HELPERS ────────────────────────────────────────────────────────────────
const getCollected = (contributions, id) =>
  (contributions[id] || []).reduce((s, c) => s + c.amount, 0);
const getPct = (contributions, id, price) =>
  Math.min(100, Math.round((getCollected(contributions, id) / price) * 100));

// ─── COMPOSANT ──────────────────────────────────────────────────────────────
// Transform Supabase rows into { [gift_id]: [{ name, email, amount, message, date }] }
const transformContributions = (rows) => {
  if (!rows) return {};
  return rows.reduce((acc, row) => {
    if (!acc[row.gift_id]) acc[row.gift_id] = [];
    acc[row.gift_id].push({
      name: row.name,
      email: row.email,
      amount: row.amount,
      message: row.message || '',
      date: new Date(row.created_at).toLocaleDateString('fr-FR'),
    });
    return acc;
  }, {});
};

const WeddingListPage = () => {
  const { sendIban } = useIbanEmail();
  const { data: rawContributions, refetch } = useSupabaseData('wedding_contributions', {
    orderBy: 'created_at',
    orderDirection: 'asc',
    transform: transformContributions,
  });
  const contributions = rawContributions || {};
  const [filter, setFilter]               = useState('Tous');
  const [modal, setModal]                 = useState(null);
  const [isAdmin, setIsAdmin]             = useState(false);
  const [adminOpen, setAdminOpen]         = useState(false);
  const [adminPrompt, setAdminPrompt]     = useState(false);
  const [expandedIds, setExpandedIds]     = useState(new Set());

  const toggleExpand = (id) => setExpandedIds(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const [adminCode, setAdminCode]         = useState('');
  const [adminError, setAdminError]       = useState(false);
  const [toast, setToast]                 = useState('');
  const [toastVisible, setToastVisible]   = useState(false);

  // Modal form
  const [participantName, setParticipantName] = useState('');
  const [participantEmail, setParticipantEmail] = useState('');
  const [isAnonymous, setIsAnonymous]         = useState(false);
  const [amount, setAmount]                   = useState('');
  const [message, setMessage]                 = useState('');
  const [isSubmitting, setIsSubmitting]       = useState(false);

  const showToast = useCallback((msg) => {
    setToast(msg); setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3500);
  }, []);

  const handleAdminLogin = async () => {
    try {
      const res = await fetch('/.netlify/functions/verifyAdminCode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: adminCode.trim() }),
      });
      const { valid } = await res.json();
      if (valid) {
        setIsAdmin(true); setAdminOpen(true); setAdminPrompt(false);
        setAdminCode(''); setAdminError(false);
      } else {
        setAdminError(true); setAdminCode('');
      }
    } catch {
      setAdminError(true); setAdminCode('');
    }
  };

  const openModal = (id) => {
    setModal(id);
    setParticipantName(''); setParticipantEmail(''); setIsAnonymous(false); setAmount(''); setMessage('');
  };

  const confirmParticipation = async () => {
    const parsedAmount = parseInt(amount);
    if (!isAnonymous && !participantName.trim()) { showToast("⚠ Merci d'indiquer votre prénom et nom."); return; }
    if (!participantEmail.trim() || !participantEmail.includes('@')) { showToast('⚠ Merci de saisir un email valide.'); return; }
    if (!parsedAmount || parsedAmount < 1) { showToast('⚠ Merci de saisir un montant.'); return; }

    const name = isAnonymous ? 'Anonyme' : participantName.trim();
    const giftName = GIFT_ITEMS.find(g => g.id === modal)?.name;

    setIsSubmitting(true);
    try {
      const res = await fetch('/.netlify/functions/submitContribution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          giftId: modal,
          name,
          email: participantEmail.trim(),
          amount: parsedAmount,
          message: message.trim(),
        }),
      });
      const result = await res.json();
      if (res.status === 409) {
        showToast('⚠ Tu as déjà participé à ce cadeau.');
        setIsSubmitting(false);
        return;
      }
      if (!result.success) {
        showToast('⚠ Erreur lors de l\'enregistrement. Réessaie.');
        setIsSubmitting(false);
        return;
      }
    } catch {
      showToast('⚠ Erreur réseau. Réessaie.');
      setIsSubmitting(false);
      return;
    }

    sendIban({ name, email: participantEmail.trim(), giftName, giftId: modal, amount: parsedAmount });
    refetch();
    setModal(null);
    setIsSubmitting(false);
    showToast(`🎁 Merci ! Participation de ${parsedAmount} € enregistrée.`);
  };


  const filteredGifts = filter === 'Tous' ? GIFT_ITEMS : GIFT_ITEMS.filter(g => g.category === filter);
  const totalTarget   = GIFT_ITEMS.reduce((s, g) => s + g.price, 0);
  const totalCollect  = GIFT_ITEMS.reduce((s, g) => s + getCollected(contributions, g.id), 0);


  // ── ADMIN PANEL ──────────────────────────────────────────────────────────
  if (adminOpen && isAdmin) {
    const totalParticipations = Object.values(contributions).reduce((s, c) => s + c.length, 0);
    const nbFunded = GIFT_ITEMS.filter(g => getCollected(contributions, g.id) >= g.price).length;
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-serif text-gray-800">Tableau de bord</h2>
              <p className="text-xs tracking-widest uppercase text-orange-500 mt-1">Vue privée des mariés</p>
            </div>
            <button onClick={() => setAdminOpen(false)} className="text-sm text-gray-500 hover:text-orange-500 transition-colors">
              ← Retour à la liste
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              [totalCollect + ' €', 'Collecté'],
              [totalTarget + ' €', 'Objectif'],
              [totalParticipations, 'Participations'],
              [nbFunded, 'Cadeaux financés'],
            ].map(([val, label]) => (
              <div key={label} className="bg-white border border-gray-200 rounded-xl p-5 text-center">
                <div className="text-2xl font-bold text-gray-800">{val}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">{label}</div>
              </div>
            ))}
          </div>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['Cadeau', 'Objectif', 'Collecté', 'Statut', 'Participants (confidentiel)'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs text-gray-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {GIFT_ITEMS.map(g => {
                  const collected = getCollected(contributions, g.id);
                  const pct       = getPct(contributions, g.id, g.price);
                  const contribs  = contributions[g.id] || [];
                  const isFunded  = collected >= g.price;
                  return (
                    <tr key={g.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-5 py-4 font-medium text-gray-800">{g.emoji} {g.name}</td>
                      <td className="px-5 py-4 text-gray-500">{g.price} €</td>
                      <td className="px-5 py-4 font-semibold text-orange-500">{collected} €</td>
                      <td className="px-5 py-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${isFunded ? 'bg-amber-100 text-amber-700' : collected > 0 ? 'bg-orange-50 text-orange-500' : 'bg-gray-100 text-gray-400'}`}>
                          {isFunded ? '✓ Financé' : collected > 0 ? `${pct}%` : 'Non commencé'}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {contribs.length === 0
                          ? <span className="text-gray-300">—</span>
                          : contribs.map((c, i) => (
                            <div key={i} className="mb-2">
                              <span className="font-medium">{c.name}</span>
                              {' · '}<span className="text-orange-500 font-semibold">{c.amount} €</span>
                              <span className="text-gray-400 text-xs ml-1">({c.date})</span>
                              {c.email && <span className="text-blue-400 text-xs ml-1">· {c.email}</span>}
                              {c.message && <p className="text-gray-400 italic text-xs mt-0.5">"{c.message}"</p>}
                            </div>
                          ))
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // ── MAIN LIST ────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero */}
      <div className="relative h-[75vh] bg-cover bg-center" style={{ backgroundImage: "url('/gallery/baniere_velo.jpg')", backgroundPosition: 'center 37%' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <button
            onClick={() => setAdminPrompt(true)}
            className="absolute top-6 right-6 text-white/30 hover:text-white/60 transition-opacity text-xs"
            title="Accès mariés"
          >
            •••
          </button>
          <h1 className="text-5xl md:text-7xl font-light mb-6">Liste de Mariage</h1>
          <p className="text-xl max-w-2xl">Votre présence est le plus beau des cadeaux</p>
        </div>
      </div>

      {/* Intro */}
      <div className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-700 leading-relaxed">
            Malgré cela, certains d'entre vous nous ont demandé ce qui nous ferait plaisir.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-6">
            Nous mesurons notre chance d'avoir tout ce dont nous avons besoin dans notre quotidien : une famille aimante, des amis présents, un appartement cosy-cocon… mais nous avons un rêve.
          </p>
          <p className="text-lg text-gray-700 text-center leading-relaxed mt-8">
            Maxime a négocié un congé de 2 mois, Claire a négocié sa fin de contrat CDD et nous partirons sur les routes de Nouvelle-Zélande de <strong>fin novembre 2026 à début février 2027</strong>.
          </p>
        </div>
      </div>

      {/* L'objectif */}
      <div className="py-16 px-6 bg-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
            <span className="text-4xl">🚴</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">L'objectif ?</h3>
          <p className="text-xl text-gray-700 leading-relaxed">
            Faire l'<strong>Aotearoa Tour</strong> du nord au sud, en bikepacking.
          </p>
          <div className="flex justify-center my-8"><div className="w-24 h-px bg-gray-300"></div></div>
          <p className="text-lg text-gray-600 leading-relaxed">
            Sauf que voilà, partir voyager en vélo sans matériel et sans vélos et bien… c'est pas facile, facile.
            <br /><br />C'est pourquoi nous avons décidé de vous proposer une <strong>liste de mariage un peu atypique</strong>.
            <br />Elle regroupe une grande partie du matériel dont nous avons besoin pour aller au bout de notre rêve.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mt-6">
            Nous avons à cœur d'acheter le maximum possible de notre matériel en seconde main.{' '}
            <strong>Les prix affichés sont les prix neufs</strong>, au cas où nous ne trouvions pas notre bonheur en brocante, sur Vinted, le Bon Coin ou autres sites spécialisés.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mt-6">
            Bien sûr, vous n'avez aucune obligation de participer à cette liste car votre présence est notre plus beau cadeau !
            Et si vous n'êtes pas à l'aise avec un virement bancaire, une urne sera disponible le jour J.
          </p>
        </div>
      </div>

      {/* Signature + Liste */}
      <div className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-2xl font-light text-gray-800 mb-2">Mille mercis,</p>
            <p className="text-3xl font-semibold text-orange-600">Claire & Max</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
                  filter === cat
                    ? 'bg-gray-800 border-gray-800 text-white'
                    : 'border-gray-200 text-gray-600 hover:border-orange-400 hover:text-orange-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGifts.map(g => {
              const collected = getCollected(contributions, g.id);
              const pct       = getPct(contributions, g.id, g.price);
              const nbContrib = (contributions[g.id] || []).length;
              const isFunded  = collected >= g.price;
              return (
                <div key={g.id} className={`bg-white rounded-xl overflow-hidden flex flex-col shadow-sm border transition-all hover:-translate-y-1 hover:shadow-md ${isFunded ? 'border-amber-300' : 'border-gray-100'}`}>
                  <div className="bg-gray-50 h-52 flex items-center justify-center text-6xl relative overflow-hidden">
                    {g.image
                      ? <img src={g.image} alt={g.name} className="w-full h-full object-contain p-4" />
                      : g.emoji
                    }
                    {isFunded && (
                      <span className="absolute top-3 right-3 bg-amber-400 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                        ✓ Financé
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-xs text-orange-500 uppercase tracking-wider mb-1">{g.category}</p>
                    <h3 className="font-semibold text-gray-800 mb-1 leading-snug">{g.name}</h3>
                    {g.description && (
                      <div className="mb-3">
                        <p className={`text-sm text-gray-500 leading-relaxed ${expandedIds.has(g.id) ? '' : 'line-clamp-2'}`}>
                          {g.description}
                        </p>
                        {g.description.length > 80 && (
                          <button
                            onClick={() => toggleExpand(g.id)}
                            className="text-xs text-orange-500 hover:text-orange-600 mt-1 font-medium"
                          >
                            {expandedIds.has(g.id) ? '− Réduire' : '+ Lire plus'}
                          </button>
                        )}
                      </div>
                    )}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Collecté : <strong className="text-orange-500">{collected} €</strong> / {g.price} €</span>
                        <span>{pct}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-400 to-amber-400 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                      </div>
                      <p className="text-xs text-gray-300 mt-1">
                        {nbContrib === 0 ? 'Soyez le·la premier·e à participer !' : `${nbContrib} participant${nbContrib > 1 ? 's' : ''}`}
                      </p>
                    </div>
                    <button
                      onClick={() => !isFunded && openModal(g.id)}
                      disabled={isFunded}
                      className={`mt-auto w-full py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider transition-all ${
                        isFunded
                          ? 'bg-amber-50 text-amber-600 border border-amber-300 cursor-default'
                          : 'bg-gray-800 text-white hover:bg-orange-500'
                      }`}
                    >
                      {isFunded ? '✓ Entièrement financé' : '❤ Je participe'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MODAL PARTICIPATION ── */}
      {modal !== null && (() => {
        const g = GIFT_ITEMS.find(g => g.id === modal);
        const remaining = Math.max(0, g.price - getCollected(contributions, g.id));
        return (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && setModal(null)}>
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-light text-gray-800 mb-1">Je participe 🎁</h3>
              <p className="text-sm text-orange-500 uppercase tracking-wider mb-4">{g.name}</p>
              <div className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-3 mb-4">
                <span className="text-sm text-gray-600">Reste à financer :</span>
                <span className="font-bold text-orange-500 text-lg">{remaining} €</span>
              </div>
              <div className="bg-green-50 border-l-4 border-green-400 px-4 py-3 rounded-r-lg mb-5 text-sm text-green-700 leading-relaxed">
                🔒 <strong>Anonymat garanti</strong> — Les autres invités voient uniquement le montant global collecté, sans savoir qui a participé ni combien.
              </div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-xs text-gray-500 uppercase tracking-wider">Votre prénom et nom</label>
                <button
                  type="button"
                  onClick={() => setIsAnonymous(v => !v)}
                  className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border transition-all ${isAnonymous ? 'bg-gray-800 border-gray-800 text-white' : 'border-gray-200 text-gray-500 hover:border-gray-400'}`}
                >
                  <span className={`w-3 h-3 rounded-full ${isAnonymous ? 'bg-orange-400' : 'bg-gray-300'}`} />
                  Anonyme
                </button>
              </div>
              {!isAnonymous && (
                <input
                  type="text" value={participantName}
                  onChange={e => setParticipantName(e.target.value)}
                  placeholder="ex. Marie Dupont"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-orange-400"
                />
              )}
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Votre email *</label>
              <input
                type="email" value={participantEmail}
                onChange={e => setParticipantEmail(e.target.value)}
                placeholder="ex. marie@email.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-1 focus:outline-none focus:border-orange-400"
              />
              <p className="text-xs text-gray-400 mb-4 flex items-center gap-1">
                <span>📩</span> L'IBAN vous sera envoyé par email depuis <strong>mclainders@gmail.com</strong>
              </p>
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">Votre participation (€)</label>
              <input
                type="number" min="1" value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="Montant libre en €"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-orange-400"
              />
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Message (facultatif)</label>
              <input
                type="text" value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Un petit mot doux…"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-5 focus:outline-none focus:border-orange-400"
              />
              <div className="flex gap-3">
                <button onClick={confirmParticipation} disabled={isSubmitting} className="flex-1 py-3 bg-gray-800 text-white rounded-lg text-sm font-semibold uppercase tracking-wider hover:bg-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? 'Envoi...' : 'Confirmer'}
                </button>
                <button onClick={() => setModal(null)} className="px-5 py-3 border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-orange-400 hover:text-orange-500 transition-colors">
                  Annuler
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── MODAL ADMIN LOGIN ── */}
      {adminPrompt && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && setAdminPrompt(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
            <h3 className="text-xl font-light text-gray-800 mb-4">Accès mariés 🔑</h3>
            <input
              type="password" value={adminCode}
              onChange={e => { setAdminCode(e.target.value); setAdminError(false); }}
              onKeyDown={e => e.key === 'Enter' && handleAdminLogin()}
              placeholder="Code d'accès"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-center tracking-widest mb-2 focus:outline-none focus:border-orange-400"
            />
            {adminError && <p className="text-red-500 text-sm mb-2">Code incorrect.</p>}
            <div className="flex gap-3 mt-3">
              <button onClick={handleAdminLogin} className="flex-1 py-2.5 bg-gray-800 text-white rounded-lg text-sm font-semibold hover:bg-orange-500 transition-colors">
                Accéder
              </button>
              <button onClick={() => { setAdminPrompt(false); setAdminCode(''); setAdminError(false); }} className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-orange-400 transition-colors">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full text-sm shadow-xl transition-all duration-300 pointer-events-none z-50 ${toastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {toast}
      </div>
    </div>
  );
};

export default WeddingListPage;
