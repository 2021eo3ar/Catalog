import React, { useState, useEffect } from 'react';
import generateInvestmentData from '../data/data';
import Chart from '../components/Chart'; // Importing the Chart component
import { CiCirclePlus } from "react-icons/ci";
import { BsArrowsAngleExpand } from "react-icons/bs";
import { GiTakeMyMoney } from "react-icons/gi";
import { GiProfit } from "react-icons/gi";
import { FaMoneyBillAlt } from "react-icons/fa";


const Home = () => {
  // State to manage selected date range
  const [selectedRange, setSelectedRange] = useState('1w'); // Default to '1w'
  // State to manage selected tab
  const [activeTab, setActiveTab] = useState('Chart'); // Default to 'Chart' tab
  // State to manage static investment summary
  const [investmentSummary, setInvestmentSummary] = useState(null);
  // State to manage chart data
  const [chartData, setChartData] = useState(null);

  // Fetch investment summary data once when the component mounts
  useEffect(() => {
    const { summary } = generateInvestmentData('1w'); // Fetch default data
    setInvestmentSummary(summary);
    setChartData(generateInvestmentData('1w').chartData); // Set initial chart data
  }, []);

  // Update chart data when selectedRange changes
  useEffect(() => {
    if (investmentSummary) {
      const { chartData } = generateInvestmentData(selectedRange);
      setChartData(chartData);
    }
  }, [selectedRange, investmentSummary]);

  // Function to render the content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Summary':
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">Investment Summary</h1>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Icon</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Description</th>
                <th className="px-6 py-3 text-right text-gray-700 font-semibold">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="px-6 py-4">
                  <GiTakeMyMoney className="text-green-500 text-2xl mx-auto" />
                </td>
                <td className="px-6 py-4 text-gray-600">Total Investment</td>
                <td className="px-6 py-4 text-right text-gray-800 font-medium">
                  {parseFloat(investmentSummary?.totalInvestment || 0).toLocaleString()} USD
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="px-6 py-4">
                  <GiProfit className="text-blue-500 text-2xl mx-auto" />
                </td>
                <td className="px-6 py-4 text-gray-600">Profit/Loss Percentage</td>
                <td className="px-6 py-4 text-right text-gray-800 font-medium">
                  {investmentSummary ? investmentSummary.percentageChange + '%' : 'Loading...'}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4">
                  <FaMoneyBillAlt className="text-yellow-500 text-2xl mx-auto" />
                </td>
                <td className="px-6 py-4 text-gray-600">Amount</td>
                <td className="px-6 py-4 text-right text-gray-800 font-medium">
                  {parseFloat(investmentSummary?.profitLoss || 0).toLocaleString()} USD
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        );
      case 'Chart':
        return (
          <div className="h-64 sm:h-80 md:h-96 lg:h-[450px] xl:h-[500px]">
            <Chart chartData={chartData} />
          </div>
        );
      case 'Statistics':
        return <div>Statistics content goes here.</div>;
      case 'Analysis':
        return <div>Analysis content goes here.</div>;
      case 'Settings':
        return <div>Settings content goes here.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      {/* Top Section: Total Investment should always stay visible */}
      <div className="text-start mb-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
          {parseFloat(investmentSummary?.totalInvestment || 0).toLocaleString()} <span className='text-gray-500 text-lg font-semibold text-right'>USD</span>
        </h1>
        <p
          className={`font-semibold mt-2 ${
            investmentSummary?.percentageChange >= 0 ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {investmentSummary?.percentageChange >= 0 ? '+' : ''}
          {parseFloat(investmentSummary?.profitLoss || 0).toLocaleString()} ({investmentSummary?.percentageChange}%)
        </p>
      </div>

      {/* Tab Section */}
      <div className="flex overflow-x-auto space-x-4 sm:space-x-6 font-semibold text-black mb-6">
        {['Summary', 'Chart', 'Statistics', 'Analysis', 'Settings'].map((tab) => (
          <button
            key={tab}
            className={`relative py-2 border-b-2 transition-all duration-200 whitespace-nowrap ${
              activeTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent hover:border-indigo-600'
            }`}
            onClick={() => setActiveTab(tab)} // Set the active tab on click
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Render Content based on active tab */}
      <div className="bg-white rounded-lg p-4 sm:p-6">
        {/* Fullscreen and Compare Buttons for Chart tab only */}
        {activeTab === 'Chart' && (
          <div className="flex flex-wrap items-center justify-between mb-4">
            <div className="flex space-x-4 mb-2 sm:mb-0">
              <button className="flex items-center space-x-1 text-sm text-black font-semibold hover:text-indigo-600 transition">
                <BsArrowsAngleExpand className="text-lg" /> {/* Icon styling */}
                <span>Fullscreen</span>
              </button>
              <button className="flex items-center space-x-1 text-sm text-black font-semibold hover:text-indigo-600 transition">
                <CiCirclePlus className="text-lg" />
                <span>Compare</span>
              </button>
            </div>

            {/* Date Range Buttons */}
            <div className="flex overflow-x-auto space-x-1 sm:space-x-2">
              {['1d', '3d', '1w', '1m', '6m', '1y', 'max'].map((range) => (
                <button
                  key={range}
                  className={`text-sm px-2 sm:px-3 py-1 rounded-md ${
                    range === selectedRange ? 'bg-indigo-600 text-white' : 'text-black hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedRange(range)} // Update state on click
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Display content based on active tab */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Home;
