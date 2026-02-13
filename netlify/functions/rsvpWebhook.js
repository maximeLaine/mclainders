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
  const { first_name, last_name, email, presence_saturday, presence_sunday, with_children, children_count, comments } = rsvpData;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const isAttendingSaturday = presence_saturday === true || presence_saturday === 'yes';
  const isAttendingSunday = presence_sunday === true || presence_sunday === 'yes';
  const isAttending = isAttendingSaturday || isAttendingSunday;
  const hasChildren = with_children === true || with_children === 'yes';

  const subject = isAttending
    ? `${first_name}, nous avons hâte de vous voir !`
    : `Merci pour votre réponse, ${first_name}`;

  const htmlContent = isAttending ? `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fefefe;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #c2410c; margin-bottom: 5px;">Merci ${first_name} !</h1>
        <p style="color: #666; font-style: italic;">Votre réponse a bien été enregistrée</p>
      </div>

      <p style="font-size: 18px; line-height: 1.6; text-align: center;">
        Nous sommes ravis que vous puissiez être présent(e) pour célébrer notre mariage !
      </p>

      <div style="background-color: #fff7ed; padding: 20px; border-radius: 10px; margin: 30px 0; border-left: 4px solid #ea580c;">
        <h2 style="color: #ea580c; margin-top: 0; font-size: 18px;">Récapitulatif de votre réponse</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #666;">Nom</td>
            <td style="padding: 8px 0; font-weight: bold;">${first_name} ${last_name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Samedi (mariage + soirée)</td>
            <td style="padding: 8px 0; font-weight: bold;">${isAttendingSaturday ? '✅ Présent(e)' : '❌ Absent(e)'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Dimanche (déjeuner)</td>
            <td style="padding: 8px 0; font-weight: bold;">${isAttendingSunday ? '✅ Présent(e)' : '❌ Absent(e)'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;">Enfants</td>
            <td style="padding: 8px 0; font-weight: bold;">${hasChildren ? `Oui (${children_count || 0})` : 'Non'}</td>
          </tr>
          ${comments ? `
          <tr>
            <td style="padding: 8px 0; color: #666; vertical-align: top;">Commentaires</td>
            <td style="padding: 8px 0; font-style: italic;">${comments}</td>
          </tr>
          ` : ''}
        </table>
      </div>

      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #333;">📍 Informations pratiques</h3>
        <p style="margin: 10px 0;"><strong>Date :</strong> 30 & 31 août 2025</p>
        <p style="margin: 10px 0;"><strong>Lieu :</strong> La Bastide des Hirondelles</p>
        <p style="margin: 10px 0;"><strong>Adresse :</strong> 253 Rte du Gonnet, Val d'Oingt, 69620</p>
      </div>

      <p style="font-size: 16px; text-align: center;">
        Retrouvez toutes les informations sur notre site :<br>
        <a href="https://mclainders.netlify.app" style="color: #ea580c; font-weight: bold;">mclainders.netlify.app</a>
      </p>

      <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="font-size: 16px; color: #666;">
          À très bientôt !<br>
          <strong style="color: #c2410c; font-size: 18px;">Claire & Maxime</strong>
        </p>
      </div>
    </div>
  ` : `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #c2410c; text-align: center;">Merci ${first_name}</h1>

      <p style="font-size: 18px; line-height: 1.6; text-align: center;">
        Nous avons bien reçu votre réponse. Nous sommes désolés que vous ne puissiez pas être présent(e), mais nous pensons fort à vous !
      </p>

      <div style="background-color: #fff7ed; padding: 20px; border-radius: 10px; margin: 30px 0; border-left: 4px solid #ea580c;">
        <h2 style="color: #ea580c; margin-top: 0; font-size: 18px;">Récapitulatif</h2>
        <p><strong>Nom :</strong> ${first_name} ${last_name}</p>
        <p><strong>Présence samedi :</strong> ${isAttendingSaturday ? 'Oui' : 'Non'}</p>
        <p><strong>Présence dimanche :</strong> ${isAttendingSunday ? 'Oui' : 'Non'}</p>
      </div>

      <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="font-size: 16px; color: #666;">
          Avec toute notre affection,<br>
          <strong style="color: #c2410c; font-size: 18px;">Claire & Maxime</strong>
        </p>
      </div>
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
  const { first_name, last_name, email, presence_saturday, presence_sunday, with_children, children_count, comments, created_at } = rsvpData;

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

    const isSaturday = presence_saturday === true || presence_saturday === 'yes';
    const isSunday = presence_sunday === true || presence_sunday === 'yes';
    const hasChildren = with_children === true || with_children === 'yes';

    const values = [[
      new Date(created_at || Date.now()).toLocaleString('fr-FR'),
      first_name,
      last_name,
      email,
      isSaturday ? 'Oui' : 'Non',
      isSunday ? 'Oui' : 'Non',
      hasChildren ? `Oui (${children_count || 0})` : 'Non',
      comments || '',
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'RSVP!A:H',
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
 * Send WhatsApp notification via Whapi
 */
async function sendWhatsAppNotification(rsvpData) {
  const { first_name, last_name, presence_saturday, presence_sunday, with_children, children_count, comments } = rsvpData;

  if (!process.env.WHAPI_TOKEN || !process.env.WHAPI_PHONE_NUMBER) {
    console.log('Whapi not configured, skipping WhatsApp notification...');
    return;
  }

  const isSaturday = presence_saturday === true || presence_saturday === 'yes';
  const isSunday = presence_sunday === true || presence_sunday === 'yes';
  const hasChildren = with_children === true || with_children === 'yes';
  const isAttending = isSaturday || isSunday;

  const message = `📋 *Nouveau RSVP !*

👤 *${first_name} ${last_name}*
${isAttending ? '✅ Présent(e)' : '❌ Absent(e)'}

📅 Samedi : ${isSaturday ? 'Oui' : 'Non'}
📅 Dimanche : ${isSunday ? 'Oui' : 'Non'}
👶 Enfants : ${hasChildren ? `Oui (${children_count || 0})` : 'Non'}${comments ? `\n💬 ${comments}` : ''}`;

  const phoneNumbers = process.env.WHAPI_PHONE_NUMBER.split(',').map(n => n.trim());

  for (const phone of phoneNumbers) {
    const response = await fetch('https://gate.whapi.cloud/messages/text', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WHAPI_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: `${phone}@s.whatsapp.net`,
        body: message,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Whapi error for ${phone}: ${response.status} - ${errorText}`);
    } else {
      console.log(`WhatsApp notification sent to ${phone}`);
    }
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

    // Send WhatsApp notification
    try {
      await sendWhatsAppNotification(record);
    } catch (whatsappError) {
      console.error('WhatsApp error:', whatsappError);
      // Continue even if WhatsApp fails
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
