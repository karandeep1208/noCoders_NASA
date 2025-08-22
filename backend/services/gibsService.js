const axios = require('axios');
const nasaConfig = require('../config/nasa');

class GibsService {
  constructor() {
    this.baseURL = nasaConfig.GIBS.baseURL;
  }

  async getImage(layer, bbox, width = 512, height = 512, date = null) {
    try {
      const params = {
        service: 'WMS',
        version: '1.3.0',
        request: 'GetMap',
        layers: layer,
        bbox: bbox.join(','),
        width: width,
        height: height,
        srs: 'EPSG:4326',
        format: 'image/png',
        transparent: true
      };

      if (date) {
        params.time = date;
      }

      const response = await axios.get(`${this.baseURL}${nasaConfig.GIBS.wmsEndpoint}`, {
        params,
        responseType: 'arraybuffer'
      });

      return {
        success: true,
        image: Buffer.from(response.data, 'binary').toString('base64'),
        metadata: {
          layer,
          bbox,
          dimensions: { width, height },
          date: date || 'latest'
        }
      };
    } catch (error) {
      console.error('GIBS API request failed:', error.message);
      throw new Error(`GIBS API request failed: ${error.message}`);
    }
  }

  async getLayerInfo(layer) {
    try {
      const params = {
        service: 'WMS',
        version: '1.3.0',
        request: 'GetCapabilities'
      };

      const response = await axios.get(`${this.baseURL}${nasaConfig.GIBS.wmsEndpoint}`, { params });
      
      // Parse the XML response to get layer information
      // This is a simplified version - in production you'd use an XML parser
      return {
        success: true,
        layer,
        available: true
      };
    } catch (error) {
      console.error('GIBS capabilities request failed:', error.message);
      throw new Error(`GIBS capabilities request failed: ${error.message}`);
    }
  }
}

module.exports = new GibsService();