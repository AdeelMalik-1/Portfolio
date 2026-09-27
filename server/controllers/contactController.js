const validator = require('validator');
const Contact = require('../models/Contact');
const { sendContactEmail } = require('../services/emailService');

const MAX_LENGTHS = { name: 100, email: 254, subject: 150, message: 5000 };

exports.submitContact = async (req, res, next) => {
  try {
    let { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof subject !== 'string' ||
      typeof message !== 'string'
    ) {
      return res.status(400).json({ message: 'Invalid input.' });
    }

    name = name.trim();
    email = email.trim();
    subject = subject.trim();
    message = message.trim();

    if (
      name.length > MAX_LENGTHS.name ||
      email.length > MAX_LENGTHS.email ||
      subject.length > MAX_LENGTHS.subject ||
      message.length > MAX_LENGTHS.message
    ) {
      return res.status(400).json({ message: 'One or more fields are too long.' });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address.' });
    }

    // Save a copy in MongoDB if it's connected — never blocks the email send.
    if (process.env.MONGO_URI) {
      try {
        await Contact.create({ name, email, subject, message });
      } catch (dbErr) {
        console.error('Could not save contact message to MongoDB:', dbErr.message);
      }
    }

    await sendContactEmail({ name, email, subject, message });

    res.status(200).json({ message: 'Message sent successfully.' });
  } catch (err) {
    next(err);
  }
};
