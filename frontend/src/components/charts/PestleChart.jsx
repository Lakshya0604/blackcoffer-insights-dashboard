import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, ArcElement, Title, Tooltip, Legend);

const COLORS = ['#6366f1', '#10b981', '#ef4444', '#f59e0b', '#3b82f6', '#ec4899', '#8b5cf6'];

export default function PestleChart({ data }) {
  const chartData = {
    labels: data.map((d) => d.pestle),
    datasets: [
      {
        data: data.map((d) => d.count),
        backgroundColor: COLORS.map((c) => c + 'b3')
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: { title: { display: true, text: 'PESTLE Category Breakdown' } }
  };

  return (
    <div className="chart-card">
      <PolarArea data={chartData} options={options} />
    </div>
  );
}
