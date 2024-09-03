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
  Legend,
} from 'chart.js';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = ({ chartData }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return '$' + parseFloat(value).toLocaleString(); // Format the Y-axis as currency
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0.4, // Add curvature to the line
      },
    },
  };

  return (
    <div className="relative bg-white rounded-lg shadow-lg p-6 h-[400px]">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Chart;
