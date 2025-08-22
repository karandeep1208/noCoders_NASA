/**
 * Utility functions for data processing and analysis
 */

// Process NASA POWER data for prediction
function processNasaData(nasaData) {
  const result = {};
  
  if (nasaData.properties && nasaData.properties.parameter) {
    const params = nasaData.properties.parameter;
    
    // Extract all available parameters
    Object.keys(params).forEach(key => {
      if (params[key] && typeof params[key] === 'object') {
        result[key] = Object.values(params[key]);
      }
    });
  }
  
  return result;
}

// Calculate statistical trends from time series data
function calculateTrends(data, timePeriod = 10) {
  const trends = {};
  
  Object.keys(data).forEach(key => {
    const values = data[key];
    if (values && values.length > 1) {
      const numericValues = values.filter(v => typeof v === 'number');
      
      if (numericValues.length > 1) {
        // Simple linear regression
        const n = numericValues.length;
        const x = Array.from({length: n}, (_, i) => i);
        const y = numericValues;
        
        const sumX = x.reduce((a, b) => a + b, 0);
        const sumY = y.reduce((a, b) => a + b, 0);
        const sumXY = x.reduce((a, _, i) => a + x[i] * y[i], 0);
        const sumXX = x.reduce((a, b) => a + b * b, 0);
        
        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        
        // Calculate confidence (R-squared)
        const yMean = sumY / n;
        const ssTotal = y.reduce((a, b) => a + Math.pow(b - yMean, 2), 0);
        const ssResidual = y.reduce((a, b, i) => a + Math.pow(b - (slope * x[i] + intercept), 2), 0);
        const rSquared = 1 - (ssResidual / ssTotal);
        
        // Project future value
        const projectedValue = slope * (n + timePeriod) + intercept;
        const currentValue = slope * (n - 1) + intercept;
        const change = projectedValue - currentValue;
        
        trends[key] = {
          slope: slope,
          intercept: intercept,
          currentValue: currentValue,
          projectedValue: projectedValue,
          change: change,
          percentageChange: (change / currentValue) * 100,
          confidence: Math.max(0, Math.min(1, rSquared)), // Clamp between 0 and 1
          trend: slope > 0 ? 'increasing' : slope < 0 ? 'decreasing' : 'stable',
          dataPoints: n
        };
      }
    }
  });
  
  return trends;
}

// Generate agricultural recommendations based on climate trends
function generateAgriculturalRecommendations(trends, currentCrops = []) {
  const recommendations = [];
  const warnings = [];
  const suggestions = [];

  // Temperature-based recommendations
  if (trends.T2M) {
    const tempTrend = trends.T2M;
    
    if (tempTrend.slope > 0.5) {
      warnings.push({
        type: 'high_temperature',
        severity: 'high',
        message: 'Significant warming trend detected. Average temperature increasing rapidly.',
        details: `Projected increase: ${tempTrend.change.toFixed(2)}°C over next decade`
      });
      
      if (currentCrops.includes('wheat') || currentCrops.includes('barley')) {
        suggestions.push({
          type: 'crop_substitution',
          message: 'Traditional cereal crops may face heat stress. Consider switching to:',
          alternatives: ['sorghum', 'millet', 'heat-tolerant wheat varieties'],
          reason: 'Better adapted to increasing temperatures'
        });
      }
    }
    
    if (tempTrend.slope > 0.2) {
      suggestions.push({
        type: 'management_practice',
        message: 'Implement heat mitigation strategies:',
        practices: ['shade nets', 'mulching', 'irrigation scheduling', 'wind breaks'],
        reason: 'Moderate warming trend detected'
      });
    }
  }

  // Precipitation-based recommendations
  if (trends.PRECTOT) {
    const precipTrend = trends.PRECTOT;
    
    if (precipTrend.slope < -0.1) {
      warnings.push({
        type: 'drought_risk',
        severity: precipTrend.slope < -0.3 ? 'high' : 'medium',
        message: 'Decreasing precipitation trend detected. Drought risk increasing.',
        details: `Projected decrease: ${Math.abs(precipTrend.change).toFixed(2)} mm/year`
      });
      
      suggestions.push({
        type: 'water_management',
        message: 'Implement water conservation practices:',
        practices: ['drip irrigation', 'rainwater harvesting', 'soil moisture conservation', 'drought-resistant varieties'],
        reason: 'Reducing precipitation trend'
      });
    }
    
    if (precipTrend.slope > 0.2) {
      warnings.push({
        type: 'flood_risk',
        severity: 'medium',
        message: 'Increasing precipitation trend detected. Potential flood risk.',
        details: `Projected increase: ${precipTrend.change.toFixed(2)} mm/year`
      });
    }
  }

  // Solar radiation recommendations
  if (trends.ALLSKY_SFC_SW_DWN) {
    const solarTrend = trends.ALLSKY_SFC_SW_DWN;
    
    if (solarTrend.slope > 0.1) {
      suggestions.push({
        type: 'solar_optimization',
        message: 'Increasing solar radiation detected. Consider:',
        practices: ['intercropping', 'shade management', 'photosynthesis optimization'],
        reason: 'Higher solar radiation levels'
      });
    }
  }

  // Combined factors recommendations
  if (trends.T2M && trends.PRECTOT) {
    const tempTrend = trends.T2M;
    const precipTrend = trends.PRECTOT;
    
    if (tempTrend.slope > 0.3 && precipTrend.slope > 0.1) {
      warnings.push({
        type: 'pest_disease_risk',
        severity: 'medium',
        message: 'Warmer and wetter conditions may increase pest and disease pressure',
        details: 'Monitor crops closely and implement integrated pest management'
      });
    }
  }

  // If no significant trends detected
  if (warnings.length === 0 && suggestions.length === 0) {
    suggestions.push({
      type: 'stable_conditions',
      message: 'Climate trends appear relatively stable. Current practices should remain effective.',
      practices: ['continue current management', 'monitor regularly'],
      reason: 'Stable climate conditions detected'
    });
  }

  return {
    warnings,
    suggestions,
    summary: {
      totalWarnings: warnings.length,
      totalSuggestions: suggestions.length,
      overallRisk: warnings.some(w => w.severity === 'high') ? 'high' : 
                  warnings.some(w => w.severity === 'medium') ? 'medium' : 'low'
    }
  };
}

// Format prediction results for frontend display
function formatPredictions(trends, timePeriod) {
  const formatted = {};
  
  Object.keys(trends).forEach(key => {
    const trend = trends[key];
    const parameterNames = {
      T2M: 'Temperature',
      PRECTOT: 'Precipitation',
      ALLSKY_SFC_SW_DWN: 'Solar Radiation',
      RH2M: 'Humidity',
      WS2M: 'Wind Speed'
    };
    
    formatted[parameterNames[key] || key] = {
      current: trend.currentValue.toFixed(2),
      projected: trend.projectedValue.toFixed(2),
      change: trend.change.toFixed(2),
      percentage: trend.percentageChange.toFixed(1),
      trend: trend.trend,
      confidence: (trend.confidence * 100).toFixed(1) + '%',
      unit: getParameterUnit(key)
    };
  });
  
  return formatted;
}

// Get appropriate units for parameters
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

// Validate geographic coordinates
function validateCoordinates(lat, lon) {
  if (lat < -90 || lat > 90) {
    throw new Error('Latitude must be between -90 and 90 degrees');
  }
  if (lon < -180 || lon > 180) {
    throw new Error('Longitude must be between -180 and 180 degrees');
  }
  return true;
}

// Validate date range
function validateDateRange(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();
  
  if (start > end) {
    throw new Error('Start date must be before end date');
  }
  
  if (end > now) {
    throw new Error('End date cannot be in the future');
  }
  
  // Check if date range is reasonable (max 50 years)
  const maxRange = 50 * 365 * 24 * 60 * 60 * 1000; // 50 years in milliseconds
  if (end - start > maxRange) {
    throw new Error('Date range cannot exceed 50 years');
  }
  
  return true;
}

// Calculate risk score based on trends
function calculateRiskScore(trends) {
  let score = 0;
  let factors = 0;
  
  if (trends.T2M) {
    // Temperature risk: higher increase = higher risk
    score += Math.min(100, Math.abs(trends.T2M.slope) * 50);
    factors++;
  }
  
  if (trends.PRECTOT) {
    // Precipitation risk: both extremes are risky
    score += Math.min(100, Math.abs(trends.PRECTOT.slope) * 40);
    factors++;
  }
  
  if (trends.ALLSKY_SFC_SW_DWN) {
    // Solar radiation risk: extreme changes
    score += Math.min(100, Math.abs(trends.ALLSKY_SFC_SW_DWN.slope) * 30);
    factors++;
  }
  
  return factors > 0 ? Math.min(100, score / factors) : 0;
}

module.exports = {
  processNasaData,
  calculateTrends,
  generateAgriculturalRecommendations,
  formatPredictions,
  validateCoordinates,
  validateDateRange,
  calculateRiskScore
};