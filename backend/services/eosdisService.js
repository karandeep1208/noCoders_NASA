const axios = require('axios');
const nasaConfig = require('../config/nasa');

class EosdisService {
  constructor() {
    this.baseURL = nasaConfig.EOSDIS.baseURL;
  }

  async searchGranules(params = {}) {
    try {
      const response = await axios.get(`${this.baseURL}${nasaConfig.EOSDIS.searchEndpoint}`, {
        params: {
          ...params,
          page_size: params.page_size || 10,
          page_num: params.page_num || 1
        }
      });

      return response.data;
    } catch (error) {
      console.error('EOSDIS granules search failed:', error.message);
      throw new Error(`EOSDIS granules search failed: ${error.response?.data?.errors || error.message}`);
    }
  }

  async searchCollections(params = {}) {
    try {
      const response = await axios.get(`${this.baseURL}${nasaConfig.EOSDIS.collectionsEndpoint}`, {
        params: {
          ...params,
          page_size: params.page_size || 10,
          page_num: params.page_num || 1
        }
      });

      return response.data;
    } catch (error) {
      console.error('EOSDIS collections search failed:', error.message);
      throw new Error(`EOSDIS collections search failed: ${error.response?.data?.errors || error.message}`);
    }
  }

  async getGranuleMetadata(granuleId) {
    try {
      const response = await axios.get(`${this.baseURL}/search/granules.json`, {
        params: {
          concept_id: granuleId
        }
      });

      return response.data;
    } catch (error) {
      console.error('EOSDIS granule metadata request failed:', error.message);
      throw new Error(`EOSDIS granule metadata request failed: ${error.message}`);
    }
  }

  async getCollectionMetadata(collectionId) {
    try {
      const response = await axios.get(`${this.baseURL}/search/collections.json`, {
        params: {
          concept_id: collectionId
        }
      });

      return response.data;
    } catch (error) {
      console.error('EOSDIS collection metadata request failed:', error.message);
      throw new Error(`EOSDIS collection metadata request failed: ${error.message}`);
    }
  }
}

module.exports = new EosdisService();