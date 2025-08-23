module.exports = {
  // GIBS (Global Imagery Browse Services)
  GIBS: {
    baseURL: 'https://gibs.earthdata.nasa.gov',
    wmsEndpoint: '/wms/epsg4326/best/wms.cgi',
    availableLayers: {
      MODIS_Terra_CorrectedReflectance_TrueColor: 'MODIS_Terra_CorrectedReflectance_TrueColor',
      MODIS_Aqua_CorrectedReflectance_TrueColor: 'MODIS_Aqua_CorrectedReflectance_TrueColor',
      VIIRS_SNPP_CorrectedReflectance_TrueColor: 'VIIRS_SNPP_CorrectedReflectance_TrueColor',
      AIRS_CO_Total_Column_Day: 'AIRS_CO_Total_Column_Day',
      MODIS_Terra_Land_Surface_Temp_Day: 'MODIS_Terra_Land_Surface_Temp_Day',
      MODIS_Terra_NDVI: 'MODIS_Terra_NDVI'
    }
  },

  // EONET (Earth Observatory Natural Event Tracker)
  EONET: {
    baseURL: 'https://eonet.gsfc.nasa.gov/api/v3',
    endpoints: {
      events: '/events',
      categories: '/categories',
      layers: '/layers'
    }
  },

  // EOSDIS (Earth Observing System Data and Information System)
  EOSDIS: {
    baseURL: 'https://cmr.earthdata.nasa.gov',
    searchEndpoint: '/search/granules.json',
    collectionsEndpoint: '/search/collections.json'
  },

  // POWER (Prediction Of Worldwide Energy Resources)
   POWER: {
    baseURL: 'https://power.larc.nasa.gov',
    temporalEndpoint: '/api/temporal/daily/point',
    climatologyEndpoint: '/api/climatology/daily/point'
  },

  // Common parameters
  defaultParams: {
    format: 'JSON',
    community: 'RE' // Try 'SB' if 'RE' doesn't work
  }
};