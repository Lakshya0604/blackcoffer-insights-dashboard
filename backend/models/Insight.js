const mongoose = require('mongoose');

// Schema mirrors jsondata.json fields exactly.
// Numeric fields are stored as Number (empty strings in source JSON -> null).
// end_year / start_year kept as Number for correct filtering & sorting.
const InsightSchema = new mongoose.Schema(
  {
    end_year: { type: Number, default: null },
    start_year: { type: Number, default: null },
    intensity: { type: Number, default: 0, index: true },
    likelihood: { type: Number, default: 0, index: true },
    relevance: { type: Number, default: 0, index: true },
    impact: { type: Number, default: null },
    sector: { type: String, default: '', index: true },
    topic: { type: String, default: '', index: true },
    insight: { type: String, default: '' },
    url: { type: String, default: '' },
    region: { type: String, default: '', index: true },
    country: { type: String, default: '', index: true },
    city: { type: String, default: '', index: true }, // most Blackcoffer datasets have this empty for every record
    pestle: { type: String, default: '', index: true },
    source: { type: String, default: '', index: true },
    swot: { type: String, default: '', index: true }, // present in some rows of the dataset
    title: { type: String, default: '' },
    added: { type: String, default: '' },
    published: { type: String, default: '' }
  },
  { collection: 'insights', timestamps: false }
);

module.exports = mongoose.model('Insight', InsightSchema);
