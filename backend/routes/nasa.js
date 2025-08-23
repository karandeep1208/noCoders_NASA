const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const nasaController = require('../controllers/nasaDataController');
const predictionController = require('../controllers/predictionController');

// Validation rules
const climateDataValidation = [
  body('lat').isFloat({ min: -90, max: 90 }).withMessage('Valid latitude required'),
  body('lon').isFloat({ min: -180, max: 180 }).withMessage('Valid longitude required'),
  body('startDate').isISO8601().withMessage('Valid start date required'),
  body('endDate').isISO8601().withMessage('Valid end date required')
];

const gibsValidation = [
  body('layer').notEmpty().withMessage('Layer name required'),
  body('bbox').isArray({ min: 4, max: 4 }).withMessage('Bounding box must be an array of 4 coordinates'),
  body('bbox.*').isFloat().withMessage('Bounding box coordinates must be numbers'),
  body('width').optional().isInt({ min: 1, max: 2048 }).withMessage('Width must be between 1 and 2048'),
  body('height').optional().isInt({ min: 1, max: 2048 }).withMessage('Height must be between 1 and 2048'),
  body('date').optional().isISO8601().withMessage('Valid date required if provided')
];

router.get('/health', (req, res) => {
  res.json({ status: 'NASA API routes are working' });
});

// Test endpoint for POWER API
router.get('/power/test', predictionController.testPowerAPI);

// Get available parameters
router.get('/power/parameters', predictionController.getAvailableParameters);

// Climate data routes
router.post('/climate-data', climateDataValidation, nasaController.getClimateData);
router.post('/multi-dataset', nasaController.getMultiDatasetAnalysis);

// GIBS routes
router.post('/gibs/imagery', gibsValidation, nasaController.getGibsImagery);
router.get('/gibs/layers', nasaController.getGibsLayers);

// EONET routes
router.get('/eonet/events', [
  query('days').optional().isInt({ min: 1, max: 365 }).withMessage('Days must be between 1 and 365'),
  query('status').optional().isIn(['open', 'closed']).withMessage('Status must be open or closed'),
  query('category').optional().isString().withMessage('Category must be a string'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
], nasaController.getEonetEvents);

router.get('/eonet/categories', nasaController.getEonetCategories);

// EOSDIS routes
router.get('/eosdis/data', [
  query('collection').optional().isString().withMessage('Collection must be a string'),
  query('startDate').optional().isISO8601().withMessage('Valid start date required'),
  query('endDate').optional().isISO8601().withMessage('Valid end date required'),
  query('bbox').optional().isString().withMessage('Bounding box must be a string'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
], nasaController.getEosdisData);

module.exports = router;