const axios = require('axios');
const nasaConfig = require('../config/nasa');
const gibsService = require('./gibsService');
const eonetService = require('./eonetService');
const eosdisService = require('./eosdisService');
const powerService = require('./powerService');

class NasaApiService {
  constructor() {
    this.apiKey = process.env.NASA_API_KEY || 'DEMO_KEY';
  }

  // GIBS Services
  async getGibsImage(layer, bbox, width = 512, height = 512, date = null) {
    return await gibsService.getImage(layer, bbox, width, height, date);
  }

  async getGibsAvailableLayers() {
    return nasaConfig.GIBS.availableLayers;
  }

  // EONET Services
  async getEONETEvents(params = {}) {
    return await eonetService.getEvents(params);
  }

  async getEONETCategories() {
    return await eonetService.getCategories();
  }

  async getEONETEventById(eventId) {
    return await eonetService.getEventById(eventId);
  }

  // EOSDIS Services
  async searchEOSDISGranules(params = {}) {
    return await eosdisService.searchGranules(params);
  }

  async searchEOSDISCollections(params = {}) {
    return await eosdisService.searchCollections(params);
  }

  async getEOSDISGranuleMetadata(granuleId) {
    return await eosdisService.getGranuleMetadata(granuleId);
  }

  // POWER Services
  async getPOWERData(params) {
    return await powerService.getData(params);
  }

  async getPOWERClimatology(params) {
    return await powerService.getClimatology(params);
  }

  async getTemperatureData(lat, lon, startDate, endDate) {
    const params = {
      parameters: 'T2M',
      latitude: lat,
      longitude: lon,
      start: startDate,
      end: endDate
    };
    return await this.getPOWERData(params);
  }

  async getPrecipitationData(lat, lon, startDate, endDate) {
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
    const params = {
      parameters,
      latitude: lat,
      longitude: lon,
      start: startDate,
      end: endDate
    };
    return await this.getPOWERData(params);
  }
}

module.exports = new NasaApiService();