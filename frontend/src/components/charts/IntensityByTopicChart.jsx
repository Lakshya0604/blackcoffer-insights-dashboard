import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function IntensityByTopicChart({ data }) {
  const chartData = {
    labels: data.map((d) => d.topic),
    datasets: [
      {
        label: 'Avg Intensity',
        data: data.map((d) => d.avgIntensity),
        backgroundColor: 'rgba(99, 102, 241, 0.7)'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false }, title: { display: true, text: 'Average Intensity by Topic (Top 15)' } },
    scales: { x: { ticks: { autoSkip: false, maxRotation: 60, minRotation: 30 } } }
  };

  return (
    <div className="chart-card">
      <Bar data={chartData} options={options} />
    </div>
  );
}
