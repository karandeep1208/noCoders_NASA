const axios = require('axios');
const nasaConfig = require('../config/nasa');
const powerService = require('./powerService');

class NasaApiService {
  constructor() {
    this.apiKey = process.env.NASA_API_KEY || 'DEMO_KEY';
  }

  // POWER API Services
  async getPOWERData(params) {
    return await powerService.getData(params);
  }

  async getPOWERClimatology(params) {
    return await powerService.getClimatology(params);
  }

  async getTemperatureData(lat, lon, startDate, endDate) {
    // Validate and format dates
    const formattedStart = powerService.formatDateForPowerAPI(startDate);
    const formattedEnd = powerService.formatDateForPowerAPI(endDate);
    
    // Validate coordinates
    powerService.validateCoordinates(lat, lon);

    const params = {
      parameters: 'T2M',
      latitude: lat,
      longitude: lon,
      start: startDate, // Will be converted to Julian in powerService
      end: endDate      // Will be converted to Julian in powerService
    };
    return await this.getPOWERData(params);
  }

  async getPrecipitationData(lat, lon, startDate, endDate) {
    const formattedStart = powerService.formatDateForPowerAPI(startDate);
    const formattedEnd = powerService.formatDateForPowerAPI(endDate);
    powerService.validateCoordinates(lat, lon);

    const params = {
      parameters: 'PRECTOT',
      latitude: lat,
      longitude: lon,
      start: startDate,
      end: endDate
    };
    return await this.getPOWERData(params);
  }

  async getSolarRadiationData(lat, lon, startDate, endDate) {
    const formattedStart = powerService.formatDateForPowerAPI(startDate);
    const formattedEnd = powerService.formatDateForPowerAPI(endDate);
    powerService.validateCoordinates(lat, lon);

    const params = {
      parameters: 'ALLSKY_SFC_SW_DWN',
      latitude: lat,
      longitude: lon,
      start: startDate,
      end: endDate
    };
    return await this.getPOWERData(params);
  }

  async getClimateData(lat, lon, startDate, endDate, parameters = 'T2M,PRECTOT,ALLSKY_SFC_SW_DWN') {
    const formattedStart = powerService.formatDateForPowerAPI(startDate);
    const formattedEnd = powerService.formatDateForPowerAPI(endDate);
    powerService.validateCoordinates(lat, lon);

    const params = {
      parameters: parameters,
      latitude: lat,
      longitude: lon,
      start: startDate,
      end: endDate
    };
    return await this.getPOWERData(params);
  }

  // Add a method to get available parameters
  async getAvailableParameters() {
    // This would typically come from API documentation
    // For now, return a list of common parameters
    return [
      'T2M',          // Temperature at 2 meters
      'PRECTOT',      // Precipitation
      'ALLSKY_SFC_SW_DWN', // Solar radiation
      'RH2M',         // Relative humidity at 2 meters
      'WS2M',         // Wind speed at 2 meters
      'PS',           // Surface pressure
      'CLOUD_AMT'     // Cloud amount
    ];
  }
}

module.exports = new NasaApiService();