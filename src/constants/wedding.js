/**
 * Wedding Constants
 * Centralized wedding information and configuration
 */

export const WEDDING_INFO = {
  date: {
    day: 7,
    month: 11,
    year: 2026,
    displayDate: '07 . 11 . 26',
    fullDateSaturday: 'Samedi 7 novembre 2026',
    fullDateSunday: 'Dimanche 8 novembre 2026',
  },
  location: {
    name: 'Bastide des Hirondelles',
    address: '253 Rte du Gonnet',
    city: 'Val d\'Oingt',
    postalCode: '69620',
    googleMapsUrl: 'https://maps.google.com/?q=253+Rte+du+Gonnet,+Val+d\'Oingt,+69620,+France'
  },
  contact: {
    email: 'mclainders@gmail.com'
  }
};

export const ROUTES = {
  HOME: '/',
  AGENDA: '/notre-clan',
  ACCOMMODATION: '/logement',
  BEAUJOLAIS: '/beaujolais',
  RSVP: '/rsvp',
  WE_NEED_YOU: '/nous-avons-besoin-de-vous',
};

export const DJ_TIME_SLOTS = [
  '20:30 - 21:00',
  '21:00 - 21:30',
  '21:30 - 22:00',
  '22:00 - 22:30',
  '22:30 - 23:00',
  '23:00 - 23:30',
  '23:30 - 00:00',
  '00:00 - 00:30',
  '00:30 - 01:00',
];

export const BRUNCH_TIME_SLOTS = [
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
];

export const SCHEDULE = {
  saturday: [
    { time: '14h00', title: 'Accueil Café Gourmand', icon: '☕', description: 'Bienvenue au Domaine ! Profitez d\'un café accompagné de petites douceurs pour bien commencer la journée.' },
    { time: '15h00', title: 'Cérémonie Laïque', icon: '💍', description: 'Le moment tant attendu ! Rejoignez-nous pour notre cérémonie laïque où nous échangerons nos vœux.' },
    { time: '16h30', title: 'Goûter Festif', icon: '🍰', description: 'Place aux festivités ! Savourez notre pièce montée et de délicieuses gourmandises dans une ambiance conviviale.' },
    { time: '18h30', title: 'Apéro Dînatoire', icon: '🥂', description: 'Levons nos verres ensemble ! Un apéritif dînatoire avec des mets raffinés et des boissons à volonté.' },
    { time: '21h00', title: 'Début de la Soirée', icon: '🎉', description: 'La fête commence ! Danse, musique et moments inoubliables jusqu\'au bout de la nuit.', highlight: true },
  ],
  sunday: [
    { time: '11h30', title: 'Repas du Lendemain', icon: '🍳', description: 'Continuons les festivités ! Rejoignez-nous pour un délicieux brunch convivial et partagez vos meilleurs souvenirs de la veille.', highlight: true },
  ]
};