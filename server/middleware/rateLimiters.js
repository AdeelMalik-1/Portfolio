const rateLimit = require('express-rate-limit');

const isProduction = process.env.NODE_ENV === 'production';

// A pass-through middleware used instead of the real limiter outside
// production, so testing the app locally/on your phone during development
// never gets blocked by hitting the same limit your laptop already used
// (everyone on the same WiFi shares one public IP).
const noop = (req, res, next) => next();

// Login/register: the classic brute-force target. 10 attempts per 15 minutes
// per IP is generous for a real user, painful for a password-guessing script.
const authLimiter = isProduction
  ? rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 10,
      standardHeaders: true,
      legacyHeaders: false,
      message: { message: 'Too many attempts. Please try again in a few minutes.' },
    })
  : noop;

// Contact form: stop it being used as a free email-blasting relay.
const contactLimiter = isProduction
  ? rateLimit({
      windowMs: 60 * 60 * 1000,
      max: 5,
      standardHeaders: true,
      legacyHeaders: false,
      message: { message: 'Too many messages sent. Please try again later.' },
    })
  : noop;

module.exports = { authLimiter, contactLimiter };
