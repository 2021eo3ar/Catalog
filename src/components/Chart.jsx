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
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, annotationPlugin);

const Chart = ({ chartData, totalInvestedAmount }) => {
  // Check if chartData is defined and has the necessary properties
  if (!chartData || !chartData.datasets || !chartData.labels) {
    return <div>Loading...</div>; // or handle error state appropriately
  }

  const investedAmount = totalInvestedAmount || chartData.datasets[0].data[chartData.datasets[0].data.length - 1];

  // Plugin to draw dashed lines on hover
  const hoverPlugin = {
    id: 'hoverLine',
    afterDraw: (chart) => {
      if (chart.tooltip._active && chart.tooltip._active.length) {
        const ctx = chart.ctx;
        const activePoint = chart.tooltip._active[0];
        const { x, y } = activePoint.element;

        ctx.save();
        ctx.setLineDash([5, 5]); // Set dashed line style

        // Draw vertical dashed line from the bottom to the top of the chart
        ctx.beginPath();
        ctx.moveTo(x, chart.chartArea.bottom); // Start from the bottom
        ctx.lineTo(x, chart.chartArea.top); // Extend to the top
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.stroke();

        // Draw horizontal dashed line from the left (Y-axis) to the right edge of the chart
        ctx.beginPath();
        ctx.moveTo(chart.chartArea.left, y); // Start from the left (Y-axis)
        ctx.lineTo(chart.chartArea.right, y); // Extend to the right
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.stroke();

        ctx.restore();
      }
    },
  };

  // Register the hover plugin
  ChartJS.register(hoverPlugin);

  // Options configuration
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return '$' + parseFloat(value).toLocaleString(); // Format Y-axis as currency
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: 'nearest',
        intersect: false,
        callbacks: {
          label: function (context) {
            const { dataset, dataIndex } = context;
            const value = dataset.data[dataIndex];
            let label = `$${parseFloat(value).toLocaleString()}`;
            if (dataIndex === dataset.data.length - 1) {
              label = `Invested Amount: ${label}`;
            }
            const profitLoss = (value - investedAmount).toFixed(2);
            const profitLossLabel = profitLoss >= 0 ? `Profit: $${profitLoss}` : `Loss: $${Math.abs(profitLoss)}`;
            return `${label} | ${profitLossLabel}`;
          },
        },
      },
      annotation: {
        annotations: {
          investedAmountLabel: {
            type: 'label',
            xValue: chartData.labels.length, // Move it after the last label
            yValue: investedAmount,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderColor: 'blue',
            borderRadius: 4,
            borderWidth: 1,
            content: [`$${parseFloat(investedAmount).toLocaleString()}`],
            color: 'white',
            font: {
              size: 12,
              weight: 'bold',
            },
            padding: {
              top: 6,
              bottom: 6,
              left: 10,
              right: 10,
            },
            position: 'end',
            display: true,
            xAdjust: 50, // Offset the label to appear strictly after the last point
            yAdjust: -10,
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0.4, // You can tweak the line smoothness
        borderWidth: 2,
        borderColor: 'blue', // Line color
        backgroundColor: 'rgba(0, 0, 255, 0.2)', // Semi-transparent blue fill under the line
        fill: true, // Ensure fill is enabled here
      },
      point: {
        radius: function (context) {
          const index = context.dataIndex;
          const totalPoints = context.dataset.data.length;
          return index === totalPoints - 1;
        },
        backgroundColor: function (context) {
          const index = context.dataIndex;
          const totalPoints = context.dataset.data.length;
          return index === totalPoints - 1 ? 'red' : 'blue';
        },
      },
    },
    
    // Interaction configuration to trigger hover
    interaction: {
      mode: 'nearest',
      intersect: false,
    },
  };

  const updatedChartData = {
    ...chartData,
    datasets: chartData.datasets.map((dataset) => ({
      ...dataset,
      borderColor: 'blue', // Line color
      backgroundColor: 'rgba(0, 0, 255, 0.2)', // Semi-transparent blue fill
      fill: true, // Ensure the area under the line is filled
      pointBorderColor: 'blue',
      pointBackgroundColor: 'white',
    })),
  };

  return (
    <div className="relative bg-white rounded-lg shadow-lg p-6 h-[400px]">
      <Line data={updatedChartData} options={options} />
    </div>
  );
};

export default Chart;
