const nodemailer = require('nodemailer');

// Escapes text that gets embedded into the HTML email body, so a message
// like "<script>..." from the contact form can't inject markup/scripts
// into the email you read.
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Reads everything from .env — never hardcode credentials here.
// Works with Gmail (using an App Password) or any SMTP provider.
function buildTransporter() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return null;

  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

async function sendContactEmail({ name, email, subject, message }) {
  const transporter = buildTransporter();
  if (!transporter) {
    throw new Error('Email is not configured (missing EMAIL_USER / EMAIL_PASS in .env)');
  }

  const to = process.env.EMAIL_TO || process.env.EMAIL_USER;

  await transporter.sendMail({
    from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
    to,
    // Strip CR/LF from anything that lands in a header, so a crafted name
    // or subject can't inject extra email headers (a classic "header
    // injection" trick used to add hidden Bcc/Cc recipients, etc).
    replyTo: email.replace(/[\r\n]/g, ''),
    subject: `New message: ${subject}`.replace(/[\r\n]/g, ''),
    text: `From: ${name} (${email})\n\n${message}`,
    html: `
      <div style="font-family:sans-serif;line-height:1.6">
        <h2>New portfolio contact message</h2>
        <p><b>Name:</b> ${escapeHtml(name)}</p>
        <p><b>Email:</b> ${escapeHtml(email)}</p>
        <p><b>Subject:</b> ${escapeHtml(subject)}</p>
        <p><b>Message:</b></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      </div>
    `,
  });
}

module.exports = { sendContactEmail };
