const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Méthode non autorisée' }),
    };
  }

  try {
    const { code } = JSON.parse(event.body);
    const adminCode = process.env.ADMIN_CODE;

    if (!adminCode) {
      console.error('ADMIN_CODE env var manquante');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ valid: false, message: 'Configuration manquante' }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ valid: code === adminCode }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ valid: false, message: 'Erreur serveur' }),
    };
  }
};
