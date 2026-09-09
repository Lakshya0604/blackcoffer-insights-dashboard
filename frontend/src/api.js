import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

const client = axios.create({ baseURL: API_BASE });

// Turns { topic: ['oil','gas'], end_year: 2020 } into a clean query object
function toParams(filters) {
  const params = {};
  Object.entries(filters || {}).forEach(([key, val]) => {
    if (!val) return;
    if (Array.isArray(val)) {
      if (val.length) params[key] = val.join(',');
    } else {
      params[key] = val;
    }
  });
  return params;
}

export const api = {
  getFilters: () => client.get('/filters').then((r) => r.data),
  getKpis: (filters) => client.get('/kpis', { params: toParams(filters) }).then((r) => r.data),
  getIntensityByTopic: (filters) =>
    client.get('/chart/intensity-by-topic', { params: toParams(filters) }).then((r) => r.data),
  getYearTrend: (filters) =>
    client.get('/chart/year-trend', { params: toParams(filters) }).then((r) => r.data),
  getRegionDistribution: (filters) =>
    client.get('/chart/region-distribution', { params: toParams(filters) }).then((r) => r.data),
  getCountryIntensity: (filters) =>
    client.get('/chart/country-intensity', { params: toParams(filters) }).then((r) => r.data),
  getLikelihoodRelevance: (filters) =>
    client.get('/chart/likelihood-relevance', { params: toParams(filters) }).then((r) => r.data),
  getPestleBreakdown: (filters) =>
    client.get('/chart/pestle-breakdown', { params: toParams(filters) }).then((r) => r.data),
  getSectorRelevance: (filters) =>
    client.get('/chart/sector-relevance', { params: toParams(filters) }).then((r) => r.data)
};
