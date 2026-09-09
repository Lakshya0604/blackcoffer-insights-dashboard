require('dotenv').config();
const mongoose = require('mongoose');
const Insight = require('./models/Insight');

mongoose.connect(process.env.MONGO_URI).then(async () => {
    const withCity = await Insight.countDocuments({ city: { $ne: '' } });
    const withSwot = await Insight.countDocuments({ swot: { $ne: '' } });
    const cities = await Insight.distinct('city');
    const swots = await Insight.distinct('swot');

    console.log('Records with city:', withCity);
    console.log('Distinct cities:', cities.slice(0, 10));
    console.log('\nRecords with swot:', withSwot);
    console.log('Distinct swots:', swots);

    process.exit(0);
}).catch(e => {
    console.error(e.message);
    process.exit(1);
});
