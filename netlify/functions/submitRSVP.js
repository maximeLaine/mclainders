const { createClient } = require('@supabase/supabase-js');

// Initialisation du client Supabase avec les variables d'environnement
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
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
