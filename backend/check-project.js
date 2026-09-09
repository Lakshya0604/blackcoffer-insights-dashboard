require('dotenv').config();
const http = require('http');

function makeRequest(url) {
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

async function checkProject() {
    const baseUrl = 'http://localhost:5000/api';

    try {
        // Check filters
        const filters = await makeRequest(`${baseUrl}/filters`);

        console.log('=== FILTER DATA CHECK ===\n');
        Object.entries(filters).forEach(([key, values]) => {
            const count = values.length;
            console.log(`${key.padEnd(15)}: ${count} options`);
            if (values.length > 0) {
                console.log(`                  Sample: ${values.slice(0, 3).join(', ')}`);
            }
        });

        // Check KPIs
        console.log('\n=== KPI CHECK ===');
        const kpis = await makeRequest(`${baseUrl}/kpis`);
        console.log(`Total Records   : ${kpis.totalRecords}`);
        console.log(`Avg Intensity   : ${kpis.avgIntensity}`);
        console.log(`Avg Likelihood  : ${kpis.avgLikelihood}`);
        console.log(`Avg Relevance   : ${kpis.avgRelevance}`);
        console.log(`Top Topic       : ${kpis.topTopic}`);

        // Check chart endpoints
        console.log('\n=== CHART ENDPOINTS CHECK ===');
        const endpoints = [
            '/chart/intensity-by-topic',
            '/chart/year-trend',
            '/chart/region-distribution',
            '/chart/country-intensity',
            '/chart/likelihood-relevance',
            '/chart/pestle-breakdown'
        ];

        for (const endpoint of endpoints) {
            const res = await makeRequest(`${baseUrl}${endpoint}`);
            console.log(`${endpoint.padEnd(35)}: ${res.length} records`);
        }

        console.log('\n✅ All endpoints working correctly!');
    } catch (err) {
        console.error('❌ Error:', err.message);
    }
}

checkProject();
