import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Title, Tooltip, Legend);

const COLORS = [
  '#6366f1', '#10b981', '#ef4444', '#f59e0b', '#3b82f6', '#ec4899',
  '#8b5cf6', '#14b8a6', '#f97316', '#84cc16', '#06b6d4', '#a855f7'
];

export default function RegionPieChart({ data }) {
  const top = data.slice(0, 10);
  const chartData = {
    labels: top.map((d) => d.region),
    datasets: [
      {
        data: top.map((d) => d.count),
        backgroundColor: COLORS
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: { title: { display: true, text: 'Records by Region (Top 10)' }, legend: { position: 'right' } }
  };

  return (
    <div className="chart-card">
      <Doughnut data={chartData} options={options} />
    </div>
  );
}
