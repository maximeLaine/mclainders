const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Check if method is POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  try {
    // Get data from request body
    const data = JSON.parse(event.body);
    
    // Validate required data
    if (!data.name || !data.email || !data.content) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Incomplete data' }),
      };
    }

    // Set up email transporter
    // Note: You'll need to set these environment variables in Netlify
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'mclainders@gmail.com',
      subject: `Nouvelle proposition pour le mariage de ${data.name}`,
      html: `
        <h2>Nouvelle proposition pour le mariage</h2>
        <p><strong>Nom:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Proposition:</strong></p>
        <p>${data.content.replace(/\n/g, '<br>')}</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Proposal submitted successfully' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server error', error: error.toString() }),
    };
  }
};
