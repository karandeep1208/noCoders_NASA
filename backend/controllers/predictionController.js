const nasaApiService = require('../services/nasaApiService');
const { validationResult } = require('express-validator');
const {
  processNasaData,
  calculateTrends,
  generateAgriculturalRecommendations,
  formatPredictions,
  validateCoordinates,
  validateDateRange,
  calculateRiskScore
} = require('../utils/helpers');
// Generate climate predictions based on historical data
exports.generatePredictions = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { lat, lon, startDate, endDate, futureYears = 10 } = req.body;
    
    // Validate inputs
    validateCoordinates(lat, lon);
    validateDateRange(startDate, endDate);
    
    if (futureYears < 1 || futureYears > 50) {
      return res.status(400).json({ error: 'Future years must be between 1 and 50' });
    }

    console.log('Fetching climate data for:', { lat, lon, startDate, endDate });

    // Fetch historical data from NASA POWER API
    const nasaData = await nasaApiService.getClimateData(
      lat, 
      lon, 
      startDate, 
      endDate,
      'T2M,PRECTOT,ALLSKY_SFC_SW_DWN,RH2M,WS2M'
    );
    
    // Process the data
    const historicalData = processNasaData(nasaData);
    
    // Calculate trends and generate predictions
    const trends = calculateTrends(historicalData, futureYears);
    const formattedPredictions = formatPredictions(trends, futureYears);
    const riskScore = calculateRiskScore(trends);

    res.json({
      success: true,
      data: {
        historical: historicalData,
        predictions: formattedPredictions,
        trends: trends,
        metadata: {
          location: { lat, lon },
          period: { start: startDate, end: endDate },
          predictionYears: futureYears,
          riskScore: riskScore,
          riskLevel: riskScore < 30 ? 'low' : riskScore < 70 ? 'medium' : 'high',
          dataPoints: Object.values(historicalData)[0]?.length || 0
        }
      }
    });
  } catch (error) {
    console.error('Error generating predictions:', error);
    res.status(500).json({ 
      error: 'Failed to generate predictions',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Test endpoint to verify POWER API connection
exports.testPowerAPI = async (req, res) => {
  try {
    // Simple test request with known good parameters
    const testData = await nasaApiService.getTemperatureData(
      40.7128, // New York
      -74.0060,
      '2020-01-01',
      '2020-01-31'
    );

    res.json({
      success: true,
      message: 'POWER API connection successful',
      data: {
        parameters: ['T2M'],
        period: { start: '2020-01-01', end: '2020-01-31' },
        location: { lat: 40.7128, lon: -74.0060 },
        recordCount: testData.properties.parameter.T2M ? Object.keys(testData.properties.parameter.T2M).length : 0
      }
    });
  } catch (error) {
    console.error('POWER API test failed:', error);
    res.status(500).json({ 
      success: false,
      error: 'POWER API test failed',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Get available parameters from POWER API
exports.getAvailableParameters = async (req, res) => {
  try {
    const parameters = await nasaApiService.getAvailableParameters();
    
    res.json({
      success: true,
      data: parameters,
      metadata: {
        source: 'NASA POWER API',
        totalParameters: parameters.length
      }
    });
  } catch (error) {
    console.error('Error fetching available parameters:', error);
    res.status(500).json({ 
      error: 'Failed to fetch available parameters',
      message: error.message
    });
  }
};
// Get agricultural recommendations based on climate predictions
exports.getAgriculturalRecommendations = async (req, res) => {
  try {
    const { lat, lon, startDate, endDate, currentCrops, futureYears = 10 } = req.body;
    
    // Validate inputs
    validateCoordinates(lat, lon);
    if (startDate && endDate) {
      validateDateRange(startDate, endDate);
    }

    // Fetch historical climate data
    const nasaData = await nasaApiService.getClimateData(
      lat, 
      lon, 
      startDate || '2010-01-01', 
      endDate || '2020-12-31',
      'T2M,PRECTOT,ALLSKY_SFC_SW_DWN'
    );
    
    // Process the data
    const processedData = processNasaData(nasaData);
    
    // Analyze trends
    const trends = calculateTrends(processedData, futureYears);
    
    // Generate recommendations based on trends
    const recommendations = generateAgriculturalRecommendations(trends, currentCrops);
    const riskScore = calculateRiskScore(trends);

    res.json({
      success: true,
      data: {
        climateTrends: trends,
        recommendations: recommendations,
        metadata: {
          location: { lat, lon },
          period: { 
            start: startDate || '2010-01-01', 
            end: endDate || '2020-12-31' 
          },
          riskScore: riskScore,
          riskLevel: riskScore < 30 ? 'low' : riskScore < 70 ? 'medium' : 'high',
          currentCrops: currentCrops || []
        }
      }
    });
  } catch (error) {
    console.error('Error generating agricultural recommendations:', error);
    res.status(500).json({ 
      error: 'Failed to generate recommendations',
      message: error.message 
    });
  }
};

// Get risk assessment for a specific location
exports.getRiskAssessment = async (req, res) => {
  try {
    const { lat, lon, startDate, endDate, futureYears = 10 } = req.body;
    
    // Validate inputs
    validateCoordinates(lat, lon);
    if (startDate && endDate) {
      validateDateRange(startDate, endDate);
    }

    // Fetch historical climate data
    const nasaData = await nasaApiService.getClimateData(
      lat, 
      lon, 
      startDate || '2010-01-01', 
      endDate || '2020-12-31',
      'T2M,PRECTOT,ALLSKY_SFC_SW_DWN'
    );
    
    // Process the data and calculate trends
    const processedData = processNasaData(nasaData);
    const trends = calculateTrends(processedData, futureYears);
    const riskScore = calculateRiskScore(trends);

    // Generate risk assessment
    const riskAssessment = {
      overallScore: riskScore,
      level: riskScore < 30 ? 'low' : riskScore < 70 ? 'medium' : 'high',
      factors: [],
      recommendations: []
    };

    // Add risk factors
    if (trends.T2M) {
      riskAssessment.factors.push({
        parameter: 'Temperature',
        trend: trends.T2M.trend,
        change: trends.T2M.change.toFixed(2) + '°C',
        impact: Math.abs(trends.T2M.slope) > 0.3 ? 'high' : Math.abs(trends.T2M.slope) > 0.1 ? 'medium' : 'low'
      });
    }

    if (trends.PRECTOT) {
      riskAssessment.factors.push({
        parameter: 'Precipitation',
        trend: trends.PRECTOT.trend,
        change: trends.PRECTOT.change.toFixed(2) + ' mm/day',
        impact: Math.abs(trends.PRECTOT.slope) > 0.2 ? 'high' : Math.abs(trends.PRECTOT.slope) > 0.05 ? 'medium' : 'low'
      });
    }

    // Add recommendations based on risk level
    if (riskScore >= 70) {
      riskAssessment.recommendations.push(
        'High climate risk detected. Consider implementing adaptive measures and contingency plans.',
        'Consult with agricultural experts for region-specific advice.',
        'Monitor weather conditions closely and be prepared for extreme events.'
      );
    } else if (riskScore >= 30) {
      riskAssessment.recommendations.push(
        'Moderate climate risk detected. Review current practices and consider incremental improvements.',
        'Implement monitoring systems to track changes.',
        'Explore drought-resistant or heat-tolerant crop varieties.'
      );
    } else {
      riskAssessment.recommendations.push(
        'Low climate risk detected. Current practices should be effective, but maintain regular monitoring.',
        'Continue with sustainable agricultural practices.',
        'Stay informed about long-term climate trends.'
      );
    }

    res.json({
      success: true,
      data: riskAssessment,
      metadata: {
        location: { lat, lon },
        period: { 
          start: startDate || '2010-01-01', 
          end: endDate || '2020-12-31' 
        },
        predictionYears: futureYears
      }
    });
  } catch (error) {
    console.error('Error generating risk assessment:', error);
    res.status(500).json({ 
      error: 'Failed to generate risk assessment',
      message: error.message 
    });
  }
};

// Get climate summary for a location
exports.getClimateSummary = async (req, res) => {
  try {
    const { lat, lon, startDate, endDate } = req.body;
    
    // Validate inputs
    validateCoordinates(lat, lon);
    if (startDate && endDate) {
      validateDateRange(startDate, endDate);
    }

    // Fetch comprehensive climate data
    const nasaData = await nasaApiService.getClimateData(
      lat, 
      lon, 
      startDate || '2015-01-01', 
      endDate || '2020-12-31',
      'T2M,PRECTOT,ALLSKY_SFC_SW_DWN,RH2M,WS2M'
    );
    
    // Process the data
    const processedData = processNasaData(nasaData);
    
    // Calculate statistics for each parameter
    const statistics = {};
    
    Object.keys(processedData).forEach(key => {
      const values = processedData[key].filter(v => typeof v === 'number');
      if (values.length > 0) {
        const sum = values.reduce((a, b) => a + b, 0);
        const mean = sum / values.length;
        const min = Math.min(...values);
        const max = Math.max(...values);
        const range = max - min;
        
        // Calculate standard deviation
        const squaredDiffs = values.map(value => Math.pow(value - mean, 2));
        const variance = squaredDiffs.reduce((a, b) => a + b, 0) / values.length;
        const stdDev = Math.sqrt(variance);
        
        statistics[key] = {
          mean: mean.toFixed(2),
          min: min.toFixed(2),
          max: max.toFixed(2),
          range: range.toFixed(2),
          stdDev: stdDev.toFixed(2),
          unit: getParameterUnit(key),
          dataPoints: values.length
        };
      }
    });

    res.json({
      success: true,
      data: {
        statistics,
        rawData: processedData,
        metadata: {
          location: { lat, lon },
          period: { 
            start: startDate || '2015-01-01', 
            end: endDate || '2020-12-31' 
          },
          parameters: Object.keys(processedData)
        }
      }
    });
  } catch (error) {
    console.error('Error generating climate summary:', error);
    res.status(500).json({ 
      error: 'Failed to generate climate summary',
      message: error.message 
    });
  }
};

// Helper function to get parameter units
function getParameterUnit(parameter) {
  const units = {
    T2M: '°C',
    PRECTOT: 'mm/day',
    ALLSKY_SFC_SW_DWN: 'kW-hr/m²/day',
    RH2M: '%',
    WS2M: 'm/s'
  };
  
  return units[parameter] || 'units';
}