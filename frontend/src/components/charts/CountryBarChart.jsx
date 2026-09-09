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

export default function CountryBarChart({ data }) {
  const chartData = {
    labels: data.map((d) => d.country),
    datasets: [
      {
        label: 'Record Count',
        data: data.map((d) => d.count),
        backgroundColor: 'rgba(245, 158, 11, 0.7)'
      }
    ]
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: { legend: { display: false }, title: { display: true, text: 'Top Countries by Record Count' } }
  };

  return (
    <div className="chart-card">
      <Bar data={chartData} options={options} />
    </div>
  );
}
