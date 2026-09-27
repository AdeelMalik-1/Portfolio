require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');
const { authLimiter, contactLimiter } = require('./middleware/rateLimiters');

// Fail fast in production if secrets that guard user accounts are missing —
// a missing/weak JWT_SECRET is a much worse problem than a crash on boot.
if (process.env.NODE_ENV === 'production') {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    console.error('JWT_SECRET is missing or too short (needs 32+ random characters). Refusing to start.');
    process.exit(1);
  }
}

const app = express();

// Behind a platform proxy (Render/Railway/Heroku etc.) so rate limiting and
// req.ip see the real client IP instead of the proxy's.
app.set('trust proxy', 1);

// Security headers (HSTS, no-sniff, disallow framing, etc.)
app.use(helmet());

// Gzip/Brotli-ish compression for JSON API responses — cheap, real speed win.
app.use(compression());

// Only the configured frontend origin(s) may call this API from a browser
// in production. In development we allow any origin — this matters for
// testing on a phone: your phone hits the dev server via your computer's
// LAN IP (e.g. http://192.168.1.5:5173), which is a different origin than
// http://localhost:5173, and would otherwise be blocked.
const isProduction = process.env.NODE_ENV === 'production';
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser requests (curl, server-to-server, health checks)
      // which send no Origin header at all.
      if (!origin) return callback(null, true);
      if (!isProduction) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      // Log the exact origin that got blocked so a CLIENT_URL mismatch
      // (protocol, trailing slash, www vs non-www, wrong port) is obvious
      // instead of a guessing game.
      console.error(
        `Not allowed by CORS: request came from "${origin}", but CLIENT_URL is set to "${allowedOrigins.join(', ')}"`
      );
      return callback(new Error('Not allowed by CORS'));
    },
  })
);

// Cap request body size — the contact form and signup form never need more.
app.use(express.json({ limit: '15kb' }));

// Strip any `$` / `.` operator keys from user input so it can never be used
// to inject a MongoDB query operator (e.g. { "email": { "$gt": "" } }).
app.use(mongoSanitize());

// MongoDB is required for login/signup (user accounts live there).
// The contact route still works even without it, it just won't save a copy.
if (process.env.MONGO_URI) {
  connectDB();
} else {
  console.log('MONGO_URI not set — auth (login/signup) will not work until it is.');
}

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/contact', contactLimiter, contactRoutes);
app.use('/api/auth', authLimiter, authRoutes);

// 404 for unknown API routes
app.use('/api', (req, res) => res.status(404).json({ message: 'Route not found' }));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
