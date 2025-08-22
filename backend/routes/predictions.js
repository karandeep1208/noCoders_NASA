const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const predictionController = require('../controllers/predictionController');

// Validation rules
const predictionValidation = [
  body('lat').isFloat({ min: -90, max: 90 }).withMessage('Valid latitude required (-90 to 90)'),
  body('lon').isFloat({ min: -180, max: 180 }).withMessage('Valid longitude required (-180 to 180)'),
  body('startDate').optional().isISO8601().withMessage('Valid start date required (YYYY-MM-DD)'),
  body('endDate').optional().isISO8601().withMessage('Valid end date required (YYYY-MM-DD)'),
  body('futureYears').optional().isInt({ min: 1, max: 50 }).withMessage('Future years must be between 1 and 50')
];

const agricultureValidation = [
  body('lat').isFloat({ min: -90, max: 90 }).withMessage('Valid latitude required (-90 to 90)'),
  body('lon').isFloat({ min: -180, max: 180 }).withMessage('Valid longitude required (-180 to 180)'),
  body('startDate').optional().isISO8601().withMessage('Valid start date required (YYYY-MM-DD)'),
  body('endDate').optional().isISO8601().withMessage('Valid end date required (YYYY-MM-DD)'),
  body('currentCrops').optional().isArray().withMessage('Current crops must be an array'),
  body('currentCrops.*').optional().isString().withMessage('Each crop must be a string'),
  body('futureYears').optional().isInt({ min: 1, max: 50 }).withMessage('Future years must be between 1 and 50')
];

const riskAssessmentValidation = [
  body('lat').isFloat({ min: -90, max: 90 }).withMessage('Valid latitude required (-90 to 90)'),
  body('lon').isFloat({ min: -180, max: 180 }).withMessage('Valid longitude required (-180 to 180)'),
  body('startDate').optional().isISO8601().withMessage('Valid start date required (YYYY-MM-DD)'),
  body('endDate').optional().isISO8601().withMessage('Valid end date required (YYYY-MM-DD)'),
  body('futureYears').optional().isInt({ min: 1, max: 50 }).withMessage('Future years must be between 1 and 50')
];

const climateSummaryValidation = [
  body('lat').isFloat({ min: -90, max: 90 }).withMessage('Valid latitude required (-90 to 90)'),
  body('lon').isFloat({ min: -180, max: 180 }).withMessage('Valid longitude required (-180 to 180)'),
  body('startDate').optional().isISO8601().withMessage('Valid start date required (YYYY-MM-DD)'),
  body('endDate').optional().isISO8601().withMessage('Valid end date required (YYYY-MM-DD)')
];

// Routes
router.post('/generate', predictionValidation, predictionController.generatePredictions);
router.post('/agricultural-recommendations', agricultureValidation, predictionController.getAgriculturalRecommendations);
router.post('/risk-assessment', riskAssessmentValidation, predictionController.getRiskAssessment);
router.post('/climate-summary', climateSummaryValidation, predictionController.getClimateSummary);

// Health check endpoint for predictions
router.get('/health', (req, res) => {
  res.json({ 
    status: 'Predictions API is working',
    endpoints: {
      generate: 'POST /api/predictions/generate',
      agriculturalRecommendations: 'POST /api/predictions/agricultural-recommendations',
      riskAssessment: 'POST /api/predictions/risk-assessment',
      climateSummary: 'POST /api/predictions/climate-summary'
    }
  });
});

module.exports = router;