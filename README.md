# Muhammad Adeel — Portfolio (Full MERN: React + Express + MongoDB + Auth)

```
client/   → React (Vite) frontend — same design, now with Login/Signup pages
server/   → Express backend — contact-form email + JWT login/signup
```

## 1. MongoDB

Login/signup needs a real database. Easiest option: a free
[MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster — create one,
grab the connection string, and paste it into `MONGO_URI`.

## 2. Set up the server

```bash
cd server
npm install
cp .env.example .env
```

Fill in `.env`:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=https://your-portfolio.vercel.app
MONGO_URI=your-mongodb-atlas-connection-string
JWT_SECRET=any-long-random-string-32-chars-or-more
EMAIL_SERVICE=gmail
EMAIL_USER=YOUR_EMAIL@gmail.com
EMAIL_PASS=YOUR_16_CHAR_APP_PASSWORD
EMAIL_TO=YOUR_EMAIL@gmail.com
```

Keep `NODE_ENV=development` in your local `.env` file. Only set
`NODE_ENV=production` in your **deployed** server's environment variables
(Render/Railway dashboard, etc.) — never in the local `.env` you run on your
own machine, since that turns on strict CORS and rate limiting that will
block local/phone testing.

Generate a strong `JWT_SECRET` with:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

`CLIENT_URL` must exactly match your deployed frontend's URL — the API only
accepts browser requests from origins listed here (comma-separate more than
one, e.g. a Vercel preview + production domain).

Gmail App Password: enable 2‑Step Verification, then generate one at
https://myaccount.google.com/apppasswords — a normal Gmail password won't work.

```bash
npm run dev
```

You should see `Server running on http://localhost:5000` and `MongoDB connected`.

### API routes

```
POST /api/auth/register   { name, email, password }  → { token, user }
POST /api/auth/login      { email, password }         → { token, user }
GET  /api/auth/me         (Bearer token)               → { user }
POST /api/contact         { name, email, subject, message } → sends you an email
```

## 3. Set up the client

```bash
cd client
npm install
cp .env.example .env    # VITE_API_URL=http://localhost:5000/api
npm run dev
```

Open the printed localhost URL (usually `http://localhost:5173`). You'll see:

- The same portfolio design (hero, tech orbit, projects, skills, contact, footer)
- **Login** and **Sign Up** pages, wired to the Express API
- On successful login/signup, the navbar shows "Hi, {name}" + Logout, and a
  JWT is stored in `localStorage` and attached to future API requests automatically

## How auth works

- Passwords are hashed with `bcryptjs` before being saved (`server/models/User.js`)
- `POST /api/auth/register` and `/login` return a signed JWT (`JWT_SECRET`, 7‑day expiry)
- The client stores `{ token, user }` in `localStorage` (`AuthContext.jsx`) and
  sends `Authorization: Bearer <token>` on every request (`services/api.js`)
- `GET /api/auth/me` is an example of a protected route — add `protect` from
  `server/middleware/auth.js` to any route you want to require login for

## Deploying

- Server → Render, Railway, or similar (set the same env vars there)
- Client → Vercel/Netlify (`npm run build`, then update `VITE_API_URL` to your
  deployed server's URL before building)

## Notes

- `.env` files are already git-ignored — never commit real credentials
- Contact and auth routes validate input and never leak internal error details
- Resume PDF: place your file at `client/public/resume/Adeel-Malik-Resume.pdf`
  (create the `public` folder if it doesn't exist yet) — the Download Resume
  buttons already point there

## Mobile testing gotcha (contact form "works on laptop, fails on phone")

If you're testing locally (`npm run dev` on both client and server) and
opening the site on your phone over the same WiFi:

`client/.env`'s default `VITE_API_URL=http://localhost:5000/api` only works
on the same computer that's running the server — on your phone, "localhost"
means the phone itself, not your laptop, so the request never even reaches
your server. That's the "works on laptop, errors on mobile" symptom.

**Fix:** find your computer's LAN IP (Windows: `ipconfig`, Mac/Linux:
`ifconfig` or `hostname -I` — looks like `192.168.x.x`), then in
`client/.env` set:

```env
VITE_API_URL=http://192.168.x.x:5000/api
```

and restart `npm run dev`. Your phone must be on the same WiFi network as
your computer. This only matters for local testing — once both client and
server are actually deployed (e.g. Vercel + Render), they talk over the
real internet and this isn't an issue.



- `helmet` sets standard protective HTTP headers (HSTS, no-sniff, no framing, etc.)
- `express-rate-limit` caps login/register attempts (10 per 15 min/IP) and
  contact-form submissions (5 per hour/IP) in production — stops brute-force
  and spam. Disabled automatically when `NODE_ENV` isn't `production`, so
  repeated local testing (including from your phone) never gets blocked.
- CORS only allows the exact origin(s) in `CLIENT_URL` when `NODE_ENV=production`.
  In development any origin is allowed, since your phone reaches the dev
  server via your computer's LAN IP, a different origin than `localhost`.
- `express-mongo-sanitize` strips `$`/`.` operator keys from input, blocking
  NoSQL-injection attempts through the JSON body
- Request body size is capped at 15kb
- Contact-form fields are length-checked and HTML-escaped before being placed
  into the notification email (prevents header/markup injection)
- Passwords require 8+ characters and are hashed with a stronger bcrypt cost factor (12)
- The server refuses to start in production if `JWT_SECRET` is missing or too short

### Worth doing next (bigger changes, not included here)

- Move the JWT out of `localStorage` into an httpOnly cookie — this is the
  only way to fully protect it from theft via any future XSS bug. It needs
  small changes on both client and server (cookie-parser, `sameSite`/`secure`
  flags, and dropping the `Authorization` header logic in `services/api.js`).
  Ask me if you'd like this wired up.
- Add a password-strength meter and a "confirm password" field on Signup.
- Add CAPTCHA (e.g. hCaptcha) on the contact form for extra bot resistance.

## Performance work in this version

- `profile.jpg` was resized/compressed (168KB → 80KB) and a WebP version
  (~40KB) was added; the browser now loads whichever it supports via `<picture>`
- The profile image is preloaded and marked `fetchpriority="high"` since it's
  the largest above-the-fold ("LCP") image
- `/login` and `/signup` pages are now code-split with `React.lazy` — visitors
  who never click Login/Signup don't download that code at all
- Vite build splits vendor libraries (React, Router, Axios) into their own
  cached chunk, separate from your app code
- `compression` middleware gzips the API's JSON responses
