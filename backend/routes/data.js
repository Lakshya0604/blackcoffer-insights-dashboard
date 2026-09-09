const express = require('express');
const router = express.Router();
const Insight = require('../models/Insight');

/**
 * Builds a Mongo filter object from query params.
 * Supported (all optional, comma-separated for multi-select):
 *   end_year, start_year, topic, sector, region, pestle, source, swot, country, city
 */
function buildFilter(query) {
  const filter = {};
  const multiFields = ['topic', 'sector', 'region', 'pestle', 'source', 'swot', 'country', 'city'];

  multiFields.forEach((field) => {
    if (query[field]) {
      const values = query[field].split(',').map((v) => v.trim()).filter(Boolean);
      if (values.length) filter[field] = { $in: values };
    }
  });

  if (query.end_year) {
    filter.end_year = Number(query.end_year);
  }
  if (query.start_year) {
    filter.start_year = Number(query.start_year);
  }

  return filter;
}

// GET /api/data — raw filtered records (paginated)
router.get('/data', async (req, res) => {
  try {
    const filter = buildFilter(req.query);
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit, 10) || 100, 500);

    const [records, total] = await Promise.all([
      Insight.find(filter).skip((page - 1) * limit).limit(limit).lean(),
      Insight.countDocuments(filter)
    ]);

    res.json({ total, page, limit, records });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/filters — distinct values for every filter dropdown
router.get('/filters', async (req, res) => {
  try {
    const fields = ['topic', 'sector', 'region', 'pestle', 'source', 'swot', 'country', 'city', 'end_year'];
    const results = await Promise.all(
      fields.map((f) => Insight.distinct(f))
    );

    const out = {};
    fields.forEach((f, i) => {
      out[f] = results[i]
        .filter((v) => v !== '' && v !== null && v !== undefined)
        .sort();
    });

    res.json(out);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/kpis — headline numbers for the top cards
router.get('/kpis', async (req, res) => {
  try {
    const filter = buildFilter(req.query);
    const [agg] = await Insight.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalRecords: { $sum: 1 },
          avgIntensity: { $avg: '$intensity' },
          avgLikelihood: { $avg: '$likelihood' },
          avgRelevance: { $avg: '$relevance' }
        }
      }
    ]);

    const [topTopic] = await Insight.aggregate([
      { $match: { ...filter, topic: { $ne: '' } } },
      { $group: { _id: '$topic', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);

    res.json({
      totalRecords: agg?.totalRecords || 0,
      avgIntensity: +(agg?.avgIntensity || 0).toFixed(2),
      avgLikelihood: +(agg?.avgLikelihood || 0).toFixed(2),
      avgRelevance: +(agg?.avgRelevance || 0).toFixed(2),
      topTopic: topTopic?._id || 'N/A'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/chart/intensity-by-topic
router.get('/chart/intensity-by-topic', async (req, res) => {
  try {
    const filter = buildFilter(req.query);
    const data = await Insight.aggregate([
      { $match: { ...filter, topic: { $ne: '' } } },
      { $group: { _id: '$topic', avgIntensity: { $avg: '$intensity' }, count: { $sum: 1 } } },
      { $sort: { avgIntensity: -1 } },
      { $limit: 15 }
    ]);
    res.json(data.map((d) => ({ topic: d._id, avgIntensity: +d.avgIntensity.toFixed(2), count: d.count })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/chart/year-trend — avg intensity & record count by start_year
router.get('/chart/year-trend', async (req, res) => {
  try {
    const filter = buildFilter(req.query);
    const data = await Insight.aggregate([
      { $match: { ...filter, start_year: { $ne: null } } },
      { $group: { _id: '$start_year', avgIntensity: { $avg: '$intensity' }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    res.json(data.map((d) => ({ year: d._id, avgIntensity: +d.avgIntensity.toFixed(2), count: d.count })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/chart/region-distribution
router.get('/chart/region-distribution', async (req, res) => {
  try {
    const filter = buildFilter(req.query);
    const data = await Insight.aggregate([
      { $match: { ...filter, region: { $ne: '' } } },
      { $group: { _id: '$region', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json(data.map((d) => ({ region: d._id, count: d.count })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/chart/country-intensity — top countries by avg intensity
router.get('/chart/country-intensity', async (req, res) => {
  try {
    const filter = buildFilter(req.query);
    const data = await Insight.aggregate([
      { $match: { ...filter, country: { $ne: '' } } },
      { $group: { _id: '$country', avgIntensity: { $avg: '$intensity' }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 15 }
    ]);
    res.json(data.map((d) => ({ country: d._id, avgIntensity: +d.avgIntensity.toFixed(2), count: d.count })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/chart/likelihood-relevance — scatter of likelihood vs relevance (bubble size = intensity)
router.get('/chart/likelihood-relevance', async (req, res) => {
  try {
    const filter = buildFilter(req.query);
    const data = await Insight.find(filter, 'likelihood relevance intensity topic').limit(1000).lean();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/chart/pestle-breakdown
router.get('/chart/pestle-breakdown', async (req, res) => {
  try {
    const filter = buildFilter(req.query);
    const data = await Insight.aggregate([
      { $match: { ...filter, pestle: { $ne: '' } } },
      { $group: { _id: '$pestle', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json(data.map((d) => ({ pestle: d._id, count: d.count })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/chart/sector-relevance
router.get('/chart/sector-relevance', async (req, res) => {
  try {
    const filter = buildFilter(req.query);
    const data = await Insight.aggregate([
      { $match: { ...filter, sector: { $ne: '' } } },
      { $group: { _id: '$sector', avgRelevance: { $avg: '$relevance' }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 15 }
    ]);
    res.json(data.map((d) => ({ sector: d._id, avgRelevance: +d.avgRelevance.toFixed(2), count: d.count })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
