import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function YearTrendChart({ data }) {
  const chartData = {
    labels: data.map((d) => d.year),
    datasets: [
      {
        label: 'Avg Intensity',
        data: data.map((d) => d.avgIntensity),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        yAxisID: 'y',
        tension: 0.3
      },
      {
        label: 'Record Count',
        data: data.map((d) => d.count),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        yAxisID: 'y1',
        tension: 0.3
      }
    ]
  };

  const options = {
    responsive: true,
    interaction: { mode: 'index', intersect: false },
    plugins: { title: { display: true, text: 'Intensity & Volume Trend by Start Year' } },
    scales: {
      y: { type: 'linear', position: 'left', title: { display: true, text: 'Avg Intensity' } },
      y1: { type: 'linear', position: 'right', grid: { drawOnChartArea: false }, title: { display: true, text: 'Records' } }
    }
  };

  return (
    <div className="chart-card">
      <Line data={chartData} options={options} />
    </div>
  );
}
