import React from 'react';

export default function KPICards({ kpis }) {
  if (!kpis) return null;

  // Capitalize topic name
  const topicDisplay = kpis.topTopic
    ? kpis.topTopic.charAt(0).toUpperCase() + kpis.topTopic.slice(1)
    : 'N/A';

  const cards = [
    { label: 'Total Records', value: kpis.totalRecords },
    { label: 'Avg Intensity', value: kpis.avgIntensity },
    { label: 'Avg Likelihood', value: kpis.avgLikelihood },
    { label: 'Avg Relevance', value: kpis.avgRelevance },
    { label: 'Top Topic', value: topicDisplay }
  ];

  return (
    <div className="kpi-row">
      {cards.map((c) => (
        <div className="kpi-card" key={c.label}>
          <div className="kpi-value">{c.value}</div>
          <div className="kpi-label">{c.label}</div>
        </div>
      ))}
    </div>
  );
}
