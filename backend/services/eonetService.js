const axios = require('axios');
const nasaConfig = require('../config/nasa');

class EonetService {
  constructor() {
    this.baseURL = nasaConfig.EONET.baseURL;
  }

  async getEvents(params = {}) {
    try {
      const response = await axios.get(`${this.baseURL}${nasaConfig.EONET.endpoints.events}`, {
        params: {
          ...params,
          api_key: process.env.NASA_API_KEY
        }
      });

      return response.data;
    } catch (error) {
      console.error('EONET API request failed:', error.message);
      throw new Error(`EONET API request failed: ${error.response?.data?.message || error.message}`);
    }
  }

  async getCategories() {
    try {
      const response = await axios.get(`${this.baseURL}${nasaConfig.EONET.endpoints.categories}`);
      return response.data;
    } catch (error) {
      console.error('EONET categories request failed:', error.message);
      throw new Error(`EONET categories request failed: ${error.message}`);
    }
  }

  async getEventById(eventId) {
    try {
      const response = await axios.get(`${this.baseURL}${nasaConfig.EONET.endpoints.events}/${eventId}`);
      return response.data;
    } catch (error) {
      console.error('EONET event request failed:', error.message);
      throw new Error(`EONET event request failed: ${error.message}`);
    }
  }

  async getEventsByCategory(categoryId, params = {}) {
    try {
      const response = await axios.get(`${this.baseURL}${nasaConfig.EONET.endpoints.events}`, {
        params: {
          ...params,
          category: categoryId,
          api_key: process.env.NASA_API_KEY
        }
      });

      return response.data;
    } catch (error) {
      console.error('EONET category events request failed:', error.message);
      throw new Error(`EONET category events request failed: ${error.message}`);
    }
  }
}

module.exports = new EonetService();