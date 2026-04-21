const nodemailer = require('nodemailer');

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
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const iban = process.env.WEDDING_IBAN;
  const bic  = process.env.WEDDING_BIC;
  const titulaire = process.env.WEDDING_TITULAIRE || 'Claire & Maxime';

  if (!iban) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'IBAN not configured' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { name, email, giftName, giftId, amount } = body;

  if (!email || !email.includes('@')) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid email' }) };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const displayName = name && name !== 'Anonyme' ? name : 'cher(e) invité(e)';
  const amountLine  = amount ? `<p style="margin: 8px 0;"><strong>Montant :</strong> ${amount} €</p>` : '';

  const cancelUrl = giftId
    ? `https://mclainders.netlify.app/.netlify/functions/cancelContribution?email=${encodeURIComponent(email)}&giftId=${giftId}`
    : null;

  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fefefe;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #c2410c; margin-bottom: 5px;">Merci ${displayName} ! 🎁</h1>
        <p style="color: #666; font-style: italic;">Voici nos coordonnées bancaires pour effectuer votre virement</p>
      </div>

      <p style="font-size: 16px; line-height: 1.7;">
        Merci beaucoup pour votre participation à notre liste de mariage !
        ${giftName ? `Nous sommes touchés que vous participiez à <strong>${giftName}</strong>.` : ''}
      </p>

      <div style="background-color: #fef3c7; padding: 16px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #f59e0b; font-size: 14px;">
        <p style="margin: 0; color: #92400e;">⚠️ <strong>Attention :</strong> Vérifiez vos <strong>spams</strong> si vous ne recevez pas ce mail — les emails transactionnels finissent parfois là-bas !</p>
      </div>

      <div style="background-color: #fff7ed; padding: 24px; border-radius: 10px; margin: 30px 0; border-left: 4px solid #ea580c;">
        <h2 style="color: #ea580c; margin-top: 0; font-size: 18px;">🏦 Coordonnées bancaires</h2>
        <p style="margin: 8px 0;"><strong>Titulaire :</strong> ${titulaire}</p>
        <p style="margin: 8px 0;"><strong>IBAN :</strong> <span style="font-family: monospace; letter-spacing: 2px;">${iban}</span></p>
        ${bic ? `<p style="margin: 8px 0;"><strong>BIC :</strong> ${bic}</p>` : ''}
        ${amountLine}
        ${giftName ? `<p style="margin: 8px 0;"><strong>Référence :</strong> ${giftName}</p>` : ''}
      </div>

      <p style="font-size: 14px; color: #888; line-height: 1.6;">
        Si vous avez la moindre question, n'hésitez pas à nous répondre directement à cet email.
      </p>

      ${cancelUrl ? `
      <div style="text-align: center; margin-top: 30px;">
        <a href="${cancelUrl}" style="display: inline-block; padding: 10px 24px; background-color: #f3f4f6; color: #6b7280; border-radius: 20px; font-size: 13px; text-decoration: none; border: 1px solid #e5e7eb;">
          Annuler ma participation
        </a>
      </div>
      ` : ''}

      <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="font-size: 16px; color: #666;">
          Avec tout notre amour,<br>
          <strong style="color: #c2410c; font-size: 18px;">Claire & Maxime</strong>
        </p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Claire & Maxime" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Vos coordonnées bancaires — Liste de mariage 💌`,
      html,
    });

    console.log(`IBAN email sent to ${email} for gift "${giftName}"`);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error('Email error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
};
