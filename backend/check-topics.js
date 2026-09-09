require('dotenv').config();
const mongoose = require('mongoose');
const Insight = require('./models/Insight');

mongoose.connect(process.env.MONGO_URI).then(async () => {
    const topics = await Insight.aggregate([
        { $match: { topic: { $ne: '' } } },
        { $group: { _id: '$topic', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
    ]);

    console.log('Top 10 Topics:');
    topics.forEach(t => console.log(`  ${t._id}: ${t.count}`));

    // Also check the first few records
    const samples = await Insight.find().limit(5);
    console.log('\nSample records:');
    samples.forEach(s => console.log(`  Topic: "${s.topic}", Region: "${s.region}", Sector: "${s.sector}"`));

    process.exit(0);
}).catch(e => {
    console.error(e.message);
    process.exit(1);
});
