import React, { useState } from 'react';
import generateInvestmentData from '../data/data';
import Chart from '../components/Chart'; // Importing the Chart component

const Home = () => {
  // State to manage selected date range
  const [selectedRange, setSelectedRange] = useState('1w'); // Default to '1w'

  // Generate data based on selected range
  const { summary, chartData } = generateInvestmentData(selectedRange);

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      {/* Top Section */}
      <div className="text-start mb-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
          {parseFloat(summary.totalInvestment).toLocaleString()} USD
        </h1>
        <p
          className={`font-semibold mt-2 ${
            summary.percentageChange >= 0 ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {summary.percentageChange >= 0 ? '+' : ''}
          {parseFloat(summary.profitLoss).toLocaleString()} ({summary.percentageChange}%)
        </p>
      </div>

      {/* Tab Section */}
      <div className="flex overflow-x-auto space-x-4 sm:space-x-6 font-semibold text-black mb-6">
        {['Summary', 'Chart', 'Statistics', 'Analysis', 'Settings'].map((tab) => (
          <button
            key={tab}
            className="relative py-2 border-b-2 border-transparent transition-all duration-200 hover:border-indigo-600 whitespace-nowrap"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-lg  p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between mb-4">
          {/* Fullscreen and Compare Buttons */}
          <div className="flex space-x-2 sm:space-x-4 mb-2 sm:mb-0">
            <button className="text-sm text-gray-500 hover:text-indigo-600 transition">Fullscreen</button>
            <button className="text-sm text-gray-500 hover:text-indigo-600 transition">Compare</button>
          </div>
          {/* Date Range Buttons */}
          <div className="flex overflow-x-auto space-x-1 sm:space-x-2">
            {['1d', '3d', '1w', '1m', '6m', '1y', 'max'].map((range) => (
              <button
                key={range}
                className={`text-sm px-2 sm:px-3 py-1 rounded-md ${
                  range === selectedRange ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedRange(range)} // Update state on click
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Render Chart component with updated chartData */}
        <div className="h-64 sm:h-80 md:h-96 lg:h-[450px] xl:h-[500px]">
          <Chart chartData={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Home;
