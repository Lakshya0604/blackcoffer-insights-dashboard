/**
 * Seed script — loads /backend/data/jsondata.json into MongoDB.
 * Run: npm run seed
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Insight = require('./models/Insight');

const DATA_PATH = path.join(__dirname, 'data', 'jsondata.json');

// Converts "" -> null, otherwise Number(value)
function toNumberOrNull(val) {
  if (val === '' || val === null || val === undefined) return null;
  const n = Number(val);
  return Number.isNaN(n) ? null : n;
}

async function seed() {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI not set. Copy .env.example to .env and fill it in.');
    process.exit(1);
  }

  if (!fs.existsSync(DATA_PATH)) {
    console.error(`Could not find ${DATA_PATH}. Place the full jsondata.json there first.`);
    process.exit(1);
  }

  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  let records;
  try {
    records = JSON.parse(raw);
  } catch (err) {
    console.error('jsondata.json is not valid JSON. Make sure the full file (not a truncated paste) is in place.');
    console.error(err.message);
    process.exit(1);
  }

  console.log(`Read ${records.length} records from jsondata.json`);

  const docs = records.map((r) => ({
    end_year: toNumberOrNull(r.end_year),
    start_year: toNumberOrNull(r.start_year),
    intensity: toNumberOrNull(r.intensity) ?? 0,
    likelihood: toNumberOrNull(r.likelihood) ?? 0,
    relevance: toNumberOrNull(r.relevance) ?? 0,
    impact: toNumberOrNull(r.impact),
    sector: r.sector || '',
    topic: r.topic || '',
    insight: r.insight || '',
    url: r.url || '',
    region: r.region || '',
    country: r.country || '',
    city: r.city || '',
    pestle: r.pestle || '',
    source: r.source || '',
    swot: r.swot || '',
    title: r.title || '',
    added: r.added || '',
    published: r.published || ''
  }));

  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  await Insight.deleteMany({});
  console.log('Cleared existing insights collection');

  await Insight.insertMany(docs, { ordered: false });
  console.log(`Inserted ${docs.length} documents into 'insights' collection`);

  await mongoose.disconnect();
  console.log('Done. Disconnected.');
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
