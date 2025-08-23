import { useState, useCallback } from 'react';
import { nasaAPI, predictionsAPI } from '../services/api';

export const useClimateData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchClimateData = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const response = await nasaAPI.getClimateData(params);
      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch climate data';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPredictions = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const response = await predictionsAPI.generatePredictions(params);
      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to generate predictions';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRecommendations = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const response = await predictionsAPI.getAgriculturalRecommendations(params);
      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to get recommendations';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRiskAssessment = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const response = await predictionsAPI.getRiskAssessment(params);
      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to get risk assessment';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchEonetEvents = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const response = await nasaAPI.getEonetEvents(params);
      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to get EONET events';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearData = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return {
    data,
    loading,
    error,
    fetchClimateData,
    fetchPredictions,
    fetchRecommendations,
    fetchRiskAssessment,
    fetchEonetEvents,
    clearData,
  };
};