const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'DevOrbit Backend',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    time: new Date()
  });
});

// Route imports
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');

// Route mounting
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

// Serve static frontend files (DevOrbit Web UI)
app.use(express.static(path.join(__dirname, '..')));

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/devorbit';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected successfully to MongoDB:', MONGO_URI);
    app.listen(PORT, () => {
      console.log(`🚀 DevOrbit Backend API server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('⚡ Starting Express server without active DB connection...');
    app.listen(PORT, () => {
      console.log(`🚀 DevOrbit Backend API server running on http://localhost:${PORT} (Offline DB mode)`);
    });
  });
