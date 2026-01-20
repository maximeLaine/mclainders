const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// Constants
const STATUS_OK = 200;
const STATUS_BAD_REQUEST = 400;
const STATUS_METHOD_NOT_ALLOWED = 405;
const STATUS_SERVER_ERROR = 500;

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

/**
 * Send confirmation email to the guest
 */
async function sendConfirmationEmail(rsvpData) {
  const { first_name, last_name, email, attendance } = rsvpData;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const isAttending = attendance === 'yes' || attendance === true;

  const subject = isAttending
    ? `${first_name}, nous avons hâte de vous voir !`
    : `Merci pour votre réponse, ${first_name}`;

  const htmlContent = isAttending ? `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #c2410c; text-align: center;">Merci ${first_name} !</h1>

      <p style="font-size: 18px; line-height: 1.6;">
        Nous sommes ravis que vous puissiez être présent(e) pour célébrer notre mariage !
      </p>

      <div style="background-color: #fff7ed; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h2 style="color: #ea580c; margin-top: 0;">Récapitulatif</h2>
        <p><strong>Nom :</strong> ${first_name} ${last_name}</p>
        <p><strong>Présence :</strong> Confirmée</p>
      </div>

      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Informations pratiques</h3>
        <p><strong>Date :</strong> [Date du mariage]</p>
        <p><strong>Lieu :</strong> La Bastide des Hirondelles</p>
        <p><strong>Adresse :</strong> 253 Rte du Gonnet, Val d'Oingt, 69620</p>
      </div>

      <p style="font-size: 16px;">
        Retrouvez toutes les informations sur notre site :<br>
        <a href="https://mclainders.netlify.app" style="color: #ea580c;">mclainders.netlify.app</a>
      </p>

      <p style="font-size: 16px; margin-top: 30px;">
        À très bientôt !<br>
        <strong>Claire & Maxime</strong>
      </p>
    </div>
  ` : `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #c2410c; text-align: center;">Merci ${first_name}</h1>

      <p style="font-size: 18px; line-height: 1.6;">
        Nous avons bien reçu votre réponse. Nous sommes désolés que vous ne puissiez pas être présent(e), mais nous pensons à vous !
      </p>

      <p style="font-size: 16px; margin-top: 30px;">
        Avec toute notre affection,<br>
        <strong>Claire & Maxime</strong>
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Claire & Maxime" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: subject,
    html: htmlContent,
  });

  console.log(`Confirmation email sent to ${email}`);
}

/**
 * Add RSVP data to Google Sheet
 */
async function addToGoogleSheet(rsvpData) {
  const { first_name, last_name, email, attendance, comments, created_at } = rsvpData;

  // Check if Google credentials are configured
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
    console.log('Google Sheets not configured, skipping...');
    return;
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const values = [[
      new Date(created_at || Date.now()).toLocaleString('fr-FR'),
      first_name,
      last_name,
      email,
      attendance === 'yes' || attendance === true ? 'Oui' : 'Non',
      comments || '',
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'RSVP!A:F',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    });

    console.log('RSVP added to Google Sheet');
  } catch (error) {
    console.error('Error adding to Google Sheet:', error);
    // Don't throw - we don't want to fail the whole webhook if Sheets fails
  }
}

/**
 * Main webhook handler
 * Called by Supabase Database Webhook on INSERT to rsvp table
 */
exports.handler = async (event) => {
  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: STATUS_OK, headers, body: '' };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: STATUS_METHOD_NOT_ALLOWED,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse webhook payload from Supabase
    const payload = JSON.parse(event.body);

    // Supabase webhook payload structure:
    // { type: 'INSERT', table: 'rsvp', record: {...}, schema: 'public', old_record: null }
    const { type, record } = payload;

    if (type !== 'INSERT' || !record) {
      return {
        statusCode: STATUS_BAD_REQUEST,
        headers,
        body: JSON.stringify({ error: 'Invalid webhook payload' }),
      };
    }

    console.log('Processing RSVP webhook for:', record.email);

    // Send confirmation email
    try {
      await sendConfirmationEmail(record);
    } catch (emailError) {
      console.error('Email error:', emailError);
      // Continue even if email fails
    }

    // Add to Google Sheet
    try {
      await addToGoogleSheet(record);
    } catch (sheetError) {
      console.error('Google Sheet error:', sheetError);
      // Continue even if Sheet fails
    }

    return {
      statusCode: STATUS_OK,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Webhook processed successfully'
      }),
    };

  } catch (error) {
    console.error('Webhook error:', error);
    return {
      statusCode: STATUS_SERVER_ERROR,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
