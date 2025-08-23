const axios = require('axios');
const nasaConfig = require('../config/nasa');

class PowerService {
  constructor() {
    this.baseURL = nasaConfig.POWER.baseURL;
  }

  // Convert YYYY-MM-DD to Julian date (integer)
  dateToJulian(dateString) {
    const date = new Date(dateString);
    const time = date.getTime();
    const julian = time / 86400000 + 2440587.5;
    return Math.floor(julian);
  }

  // Convert Julian date to YYYY-MM-DD
  julianToDate(julian) {
    const date = new Date((julian - 2440587.5) * 86400000);
    return date.toISOString().split('T')[0];
  }

  async getData(params) {
    try {
      // Validate required parameters
      if (!params.latitude || !params.longitude) {
        throw new Error('Latitude and longitude are required parameters');
      }

      if (!params.start || !params.end) {
        throw new Error('Start and end dates are required parameters');
      }

      // Convert dates to Julian format (required by POWER API)
      const startJulian = this.dateToJulian(params.start);
      const endJulian = this.dateToJulian(params.end);

      // Set default parameters if not provided
      const requestParams = {
        ...nasaConfig.defaultParams,
        ...params,
        start: startJulian,
        end: endJulian
      };

      // Ensure parameters is a string
      if (Array.isArray(requestParams.parameters)) {
        requestParams.parameters = requestParams.parameters.join(',');
      }

      console.log('POWER API Request:', {
        url: `${this.baseURL}${nasaConfig.POWER.temporalEndpoint}`,
        params: {
          ...requestParams,
          start: `${requestParams.start} (${params.start})`,
          end: `${requestParams.end} (${params.end})`
        }
      });

      const response = await axios.get(`${this.baseURL}${nasaConfig.POWER.temporalEndpoint}`, {
        params: requestParams,
        timeout: 30000
      });

      return response.data;
    } catch (error) {
      console.error('POWER API request failed:', error.message);
      
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
        
        let errorMessage = `POWER API request failed: ${error.response.status}`;
        
        if (error.response.data && error.response.data.message) {
          errorMessage += ` - ${error.response.data.message}`;
        } else if (error.response.data && error.response.data.error) {
          errorMessage += ` - ${error.response.data.error}`;
        } else if (error.response.data && error.response.data.detail) {
          errorMessage += ` - ${JSON.stringify(error.response.data.detail)}`;
        }
        
        throw new Error(errorMessage);
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('POWER API request failed: No response received from server');
      } else {
        // Something happened in setting up the request
        throw new Error(`POWER API request failed: ${error.message}`);
      }
    }
  }

  async getClimatology(params) {
    try {
      // Convert dates to Julian format for climatology endpoint too
      const startJulian = this.dateToJulian(params.start);
      const endJulian = this.dateToJulian(params.end);
      
      const response = await axios.get(`${this.baseURL}${nasaConfig.POWER.climatologyEndpoint}`, {
        params: {
          ...params,
          ...nasaConfig.defaultParams,
          start: startJulian,
          end: endJulian
        },
        timeout: 30000
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

  // Helper method to validate and format dates for POWER API
  formatDateForPowerAPI(dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date format: ${dateString}. Use YYYY-MM-DD format.`);
    }
    return this.dateToJulian(dateString);
  }

  // Helper method to validate coordinates
  validateCoordinates(lat, lon) {
    if (lat < -90 || lat > 90) {
      throw new Error('Latitude must be between -90 and 90 degrees');
    }
    if (lon < -180 || lon > 180) {
      throw new Error('Longitude must be between -180 and 180 degrees');
    }
    return true;
  }
}

module.exports = new PowerService();