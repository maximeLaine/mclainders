const { createClient } = require('@supabase/supabase-js');

// Initialisation du client Supabase avec les variables d'environnement
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
  // Log pour déboguer
  console.log('Fonction submitRSVP appelée');
  console.log('URL Supabase:', supabaseUrl);
  console.log('Clé Supabase définie:', !!supabaseKey);
  // Vérifier si c'est une clé service_role (les premiers caractères sont suffisants pour identifier le type)
  console.log('Type de clé:', supabaseKey && supabaseKey.startsWith('eyJ') ? 'Semble être une clé valide' : 'Format de clé non reconnu');
  console.log('Longueur de la clé:', supabaseKey ? supabaseKey.length : 0);
  // Vérifier si la méthode est POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Méthode non autorisée' }),
    };
  }

  try {
    // Récupérer les données du corps de la requête
    const data = JSON.parse(event.body);
    console.log('Données reçues:', data);
    
    // Validation des données requises
    if (!data.firstName || !data.lastName || !data.email || !data.attendance) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Données incomplètes' }),
      };
    }

    // Insérer les données dans la table RSVP de Supabase selon le schéma réel
    const { data: insertedData, error } = await supabase
      .from('rsvp')
      .insert([
        {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          attendance: data.attendance,
          comments: data.comments || ''
          // Note: Les colonnes additional_guests et dietary_restrictions n'existent pas dans la table
        },
      ]);

    if (error) {
      console.error('Erreur Supabase:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Erreur lors de l\'enregistrement des données', error }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'RSVP enregistré avec succès', data: insertedData }),
    };
  } catch (error) {
    console.error('Erreur:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erreur serveur', error: error.toString() }),
    };
  }
};
