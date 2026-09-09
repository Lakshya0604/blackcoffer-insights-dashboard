import React from 'react';
import { Bubble } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(LinearScale, PointElement, Title, Tooltip, Legend);

export default function LikelihoodRelevanceScatter({ data }) {
  const points = data.map((d) => ({
    x: d.likelihood,
    y: d.relevance,
    r: Math.max(2, (d.intensity || 0) / 4)
  }));

  const chartData = {
    datasets: [
      {
        label: 'Likelihood vs Relevance (bubble size = Intensity)',
        data: points,
        backgroundColor: 'rgba(99, 102, 241, 0.5)'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Likelihood vs Relevance (bubble size = Intensity)' },
      legend: { display: false }
    },
    scales: {
      x: { title: { display: true, text: 'Likelihood' }, min: 0, max: 5 },
      y: { title: { display: true, text: 'Relevance' }, min: 0 }
    }
  };

  return (
    <div className="chart-card">
      <Bubble data={chartData} options={options} />
    </div>
  );
}
