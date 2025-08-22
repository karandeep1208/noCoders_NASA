// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config({
//     path: "./config/.env"
// });

// const app = express();

// app.use(express.json());
// app.use(cors());

// mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => console.log("Successfully connected to MongoDB Database!!"))
//     .catch((err) => console.log("Error connecting to the Database", err));

// const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.send("NASA Climate Backend Running 🚀");
// });

// app.listen(PORT, () => {
//     console.log(`App is listening at ${PORT}`)
// });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config({
    path: '../config/.env'
});

const nasaRoutes = require('./routes/nasa');
const predictionRoutes = require('./routes/predictions');

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
});
app.use(limiter);

// CORS configuration
app.use(cors());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Simple root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'TerraForecast API', 
    version: '1.0.0',
    endpoints: {
      nasa: '/api/nasa',
      predictions: '/api/predictions',
      health: '/health'
    },
    supportedAPIs: ['GIBS', 'EONET', 'EOSDIS', 'POWER']
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'TerraForecast API is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/nasa', nasaRoutes);
app.use('/api/predictions', predictionRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});