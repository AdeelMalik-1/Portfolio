const mongoose = require('mongoose');

// Give up trying to reach the cluster after 8s instead of hanging — this
// makes connection problems show up fast and with a clear reason, instead of
// every query silently buffering for 10s and failing with a vague
// "buffering timed out" error.
mongoose.set('bufferTimeoutMS', 8000);

let isConnecting = false;

const connectDB = async () => {
  if (isConnecting || mongoose.connection.readyState === 1) return;
  isConnecting = true;
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    console.error(
      'Check: (1) MONGO_URI in .env is the real Atlas connection string, ' +
        '(2) the password in it is URL-encoded if it has special characters, ' +
        '(3) Atlas → Network Access allows this server\'s IP (or 0.0.0.0/0), ' +
        '(4) the Atlas cluster is not paused.'
    );
    // Don't crash the whole server just because the DB is unreachable —
    // the contact form should still be able to send emails. Retry later
    // instead of leaving the app permanently disconnected.
    setTimeout(() => {
      isConnecting = false;
      connectDB();
    }, 10000);
    return;
  }
  isConnecting = false;
};

// Log unexpected drops after a successful connection (e.g. network blip,
// Atlas cluster restart) and try to reconnect.
mongoose.connection.on('disconnected', () => {
  console.error('MongoDB disconnected — will retry.');
  setTimeout(connectDB, 5000);
});

module.exports = connectDB;
