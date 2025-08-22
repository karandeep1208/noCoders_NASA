const nasaApiService = require('../services/nasaApiService');
const { validationResult } = require('express-validator');

// Get climate data for a specific location and time period
exports.getClimateData = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { dataset, lat, lon, startDate, endDate } = req.body;
    
    let data;
    switch(dataset) {
      case 'temperature':
        data = await nasaApiService.getTemperatureData(lat, lon, startDate, endDate);
        break;
      case 'precipitation':
        data = await nasaApiService.getPrecipitationData(lat, lon, startDate, endDate);
        break;
      case 'solar-radiation':
        data = await nasaApiService.getSolarRadiationData(lat, lon, startDate, endDate);
        break;
      default:
        return res.status(400).json({ error: 'Invalid dataset requested' });
    }

    res.json({
      success: true,
      data,
      metadata: {
        source: 'NASA POWER API',
        requestParameters: { dataset, lat, lon, startDate, endDate }
      }
    });
  } catch (error) {
    console.error('Error fetching climate data:', error);
    res.status(500).json({ 
      error: 'Failed to fetch climate data',
      message: error.message 
    });
  }
};

// Get multiple datasets for comprehensive analysis
exports.getMultiDatasetAnalysis = async (req, res) => {
  try {
    const { lat, lon, startDate, endDate, datasets } = req.body;
    
    if (!datasets || !Array.isArray(datasets) || datasets.length === 0) {
      return res.status(400).json({ error: 'Datasets array is required' });
    }

    // Map dataset names to NASA parameter codes
    const parameterMap = {
      'temperature': 'T2M',
      'precipitation': 'PRECTOT',
      'solar-radiation': 'ALLSKY_SFC_SW_DWN',
      'humidity': 'RH2M',
      'wind-speed': 'WS2M'
    };
    
    const parameters = datasets
      .map(dataset => parameterMap[dataset])
      .filter(param => param)
      .join(',');
    
    if (!parameters) {
      return res.status(400).json({ error: 'No valid datasets provided' });
    }

    const data = await nasaApiService.getClimateData(lat, lon, startDate, endDate, parameters);

    res.json({
      success: true,
      data,
      metadata: {
        source: 'NASA POWER API',
        requestParameters: { lat, lon, startDate, endDate, datasets }
      }
    });
  } catch (error) {
    console.error('Error in multi-dataset analysis:', error);
    res.status(500).json({ 
      error: 'Failed to fetch climate data',
      message: error.message 
    });
  }
};

// Get GIBS imagery
exports.getGibsImagery = async (req, res) => {
  try {
    const { layer, bbox, width, height, date } = req.body;
    
    const imageData = await nasaApiService.getGibsImage(layer, bbox, width, height, date);
    
    res.json({
      success: true,
      data: imageData,
      metadata: {
        source: 'NASA GIBS API',
        layer,
        bbox,
        dimensions: { width, height },
        date: date || 'latest'
      }
    });
  } catch (error) {
    console.error('Error fetching GIBS imagery:', error);
    res.status(500).json({ 
      error: 'Failed to fetch GIBS imagery',
      message: error.message 
    });
  }
};

// Get EONET events
exports.getEonetEvents = async (req, res) => {
  try {
    const { days, status, category, limit } = req.query;
    
    const params = {};
    if (days) params.days = parseInt(days);
    if (status) params.status = status;
    if (category) params.category = category;
    if (limit) params.limit = parseInt(limit);
    
    const events = await nasaApiService.getEONETEvents(params);
    
    res.json({
      success: true,
      data: events,
      metadata: {
        source: 'NASA EONET API',
        requestParameters: params
      }
    });
  } catch (error) {
    console.error('Error fetching EONET events:', error);
    res.status(500).json({ 
      error: 'Failed to fetch EONET events',
      message: error.message 
    });
  }
};

// Get EOSDIS data
exports.getEosdisData = async (req, res) => {
  try {
    const { collection, startDate, endDate, bbox, page, limit } = req.query;
    
    const params = {};
    if (collection) params.collection_concept_id = collection;
    if (startDate) params.temporal = `${startDate}T00:00:00Z,${endDate || startDate}T23:59:59Z`;
    if (bbox) params.bounding_box = bbox;
    if (page) params.page_num = parseInt(page);
    if (limit) params.page_size = parseInt(limit);
    
    const data = await nasaApiService.searchEOSDISGranules(params);
    
    res.json({
      success: true,
      data,
      metadata: {
        source: 'NASA EOSDIS CMR API',
        requestParameters: params
      }
    });
  } catch (error) {
    console.error('Error fetching EOSDIS data:', error);
    res.status(500).json({ 
      error: 'Failed to fetch EOSDIS data',
      message: error.message 
    });
  }
};

// Get available GIBS layers
exports.getGibsLayers = async (req, res) => {
  try {
    const layers = await nasaApiService.getGibsAvailableLayers();
    
    res.json({
      success: true,
      data: layers,
      metadata: {
        source: 'NASA GIBS API',
        totalLayers: Object.keys(layers).length
      }
    });
  } catch (error) {
    console.error('Error fetching GIBS layers:', error);
    res.status(500).json({ 
      error: 'Failed to fetch GIBS layers',
      message: error.message 
    });
  }
};

// Get EONET categories
exports.getEonetCategories = async (req, res) => {
  try {
    const categories = await nasaApiService.getEONETCategories();
    
    res.json({
      success: true,
      data: categories,
      metadata: {
        source: 'NASA EONET API'
      }
    });
  } catch (error) {
    console.error('Error fetching EONET categories:', error);
    res.status(500).json({ 
      error: 'Failed to fetch EONET categories',
      message: error.message 
    });
  }
};