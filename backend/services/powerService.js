const axios = require('axios');
const nasaConfig = require('../config/nasa');

class PowerService {
  constructor() {
    this.baseURL = nasaConfig.POWER.baseURL;
  }

  async getData(params) {
    try {
      const response = await axios.get(`${this.baseURL}${nasaConfig.POWER.temporalEndpoint}`, {
        params: {
          ...params,
          ...nasaConfig.defaultParams
        }
      });

      return response.data;
    } catch (error) {
      console.error('POWER API request failed:', error.message);
      throw new Error(`POWER API request failed: ${error.response?.data?.message || error.message}`);
    }
  }

  async getClimatology(params) {
    try {
      const response = await axios.get(`${this.baseURL}${nasaConfig.POWER.climatologyEndpoint}`, {
        params: {
          ...params,
          ...nasaConfig.defaultParams
        }
      });

      return response.data;
    } catch (error) {
      console.error('POWER climatology request failed:', error.message);
      throw new Error(`POWER climatology request failed: ${error.response?.data?.message || error.message}`);
    }
  }

  async getMultipleParameters(lat, lon, startDate, endDate, parameters) {
    try {
      const params = {
        parameters: Array.isArray(parameters) ? parameters.join(',') : parameters,
        latitude: lat,
        longitude: lon,
        start: startDate,
        end: endDate
      };

      return await this.getData(params);
    } catch (error) {
      console.error('POWER multiple parameters request failed:', error.message);
      throw new Error(`POWER multiple parameters request failed: ${error.message}`);
    }
  }
}

module.exports = new PowerService();