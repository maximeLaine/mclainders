const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const { email, giftId } = event.queryStringParameters || {};

  if (!email || !giftId) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      body: errorPage('Lien invalide', 'Paramètres manquants.'),
    };
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      body: errorPage('Erreur', 'Configuration manquante.'),
    };
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { error } = await supabase
    .from('wedding_contributions')
    .delete()
    .eq('email', email)
    .eq('gift_id', parseInt(giftId, 10));

  if (error) {
    console.error('Erreur suppression:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      body: errorPage('Erreur', 'Impossible d\'annuler la participation.'),
    };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
    body: successPage(),
  };
};

function successPage() {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Participation annulée</title>
  <style>
    body { font-family: Georgia, serif; max-width: 500px; margin: 80px auto; padding: 20px; text-align: center; color: #333; }
    h1 { color: #c2410c; }
    p { font-size: 16px; line-height: 1.7; color: #666; }
    a { color: #ea580c; font-weight: bold; }
  </style>
</head>
<body>
  <h1>Participation annulée</h1>
  <p>Votre participation a bien été annulée. Vous pouvez toujours revenir sur notre liste si vous changez d'avis !</p>
  <p><a href="https://mclainders.netlify.app">← Retour au site</a></p>
</body>
</html>`;
}

function errorPage(title, message) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { font-family: Georgia, serif; max-width: 500px; margin: 80px auto; padding: 20px; text-align: center; color: #333; }
    h1 { color: #c2410c; }
    p { font-size: 16px; color: #666; }
    a { color: #ea580c; font-weight: bold; }
  </style>
</head>
<body>
  <h1>${title}</h1>
  <p>${message}</p>
  <p><a href="https://mclainders.netlify.app">← Retour au site</a></p>
</body>
</html>`;
}
