import React, { useEffect, useState, useCallback } from 'react';
import { api } from './api';
import FilterBar from './components/FilterBar';
import KPICards from './components/KPICards';
import IntensityByTopicChart from './components/charts/IntensityByTopicChart';
import YearTrendChart from './components/charts/YearTrendChart';
import RegionPieChart from './components/charts/RegionPieChart';
import CountryBarChart from './components/charts/CountryBarChart';
import LikelihoodRelevanceScatter from './components/charts/LikelihoodRelevanceScatter';
import PestleChart from './components/charts/PestleChart';

const EMPTY_FILTERS = {
  end_year: [],
  topic: [],
  sector: [],
  region: [],
  pestle: [],
  source: [],
  swot: [],
  country: [],
  city: []
};

export default function App() {
  const [filterOptions, setFilterOptions] = useState({});
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [kpis, setKpis] = useState(null);
  const [intensityByTopic, setIntensityByTopic] = useState([]);
  const [yearTrend, setYearTrend] = useState([]);
  const [regionDist, setRegionDist] = useState([]);
  const [countryIntensity, setCountryIntensity] = useState([]);
  const [likelihoodRelevance, setLikelihoodRelevance] = useState([]);
  const [pestleBreakdown, setPestleBreakdown] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getFilters().then(setFilterOptions).catch((e) => setError(e.message));
  }, []);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [k, ibt, yt, rd, ci, lr, pb] = await Promise.all([
        api.getKpis(filters),
        api.getIntensityByTopic(filters),
        api.getYearTrend(filters),
        api.getRegionDistribution(filters),
        api.getCountryIntensity(filters),
        api.getLikelihoodRelevance(filters),
        api.getPestleBreakdown(filters)
      ]);
      setKpis(k);
      setIntensityByTopic(ibt);
      setYearTrend(yt);
      setRegionDist(rd);
      setCountryIntensity(ci);
      setLikelihoodRelevance(lr);
      setPestleBreakdown(pb);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Blackcoffer Insights Dashboard</h1>
        <p>Intensity · Likelihood · Relevance across sectors, regions & time</p>
      </header>

      <FilterBar
        options={filterOptions}
        filters={filters}
        onChange={setFilters}
        onReset={() => setFilters(EMPTY_FILTERS)}
      />

      {error && <div className="error-banner">Error: {error}</div>}
      {loading && <div className="loading-banner">Loading data…</div>}

      <KPICards kpis={kpis} />

      <div className="chart-grid">
        <IntensityByTopicChart data={intensityByTopic} />
        <YearTrendChart data={yearTrend} />
        <RegionPieChart data={regionDist} />
        <CountryBarChart data={countryIntensity} />
        <LikelihoodRelevanceScatter data={likelihoodRelevance} />
        <PestleChart data={pestleBreakdown} />
      </div>
    </div>
  );
}
