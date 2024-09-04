import React, { useState, useEffect } from "react";
import generateInvestmentData from "../data/data";
import Chart from "../components/Chart"; 
import { CiCirclePlus } from "react-icons/ci";
import { BsArrowsAngleExpand } from "react-icons/bs";
import { GiTakeMyMoney } from "react-icons/gi";
import { GiProfit } from "react-icons/gi";
import { FaMoneyBillAlt } from "react-icons/fa";

const Home = () => {
  // State to manage selected date range
  const [selectedRange, setSelectedRange] = useState("1w"); // Default to '1w'
  // State to manage selected tab
  const [activeTab, setActiveTab] = useState("Chart"); // Default to 'Chart' tab
  // State to manage static investment summary
  const [investmentSummary, setInvestmentSummary] = useState(null);
  // State to manage statistics data
  const [statisticsData, setstatisticsData] = useState(null);
  // State to manage chart data
  const [chartData, setChartData] = useState(null);
  // State to manage Analysis data
  const [analysisData, setAnalysisData] = useState(null);

  // Fetch investment summary data once when the component mounts
  useEffect(() => {
    const data = generateInvestmentData(selectedRange); // Fetch default data
    setInvestmentSummary(data.summary);
    setChartData(data.chartData); // Set initial chart data
    setAnalysisData(data.analysis);
    setstatisticsData(data.statistics);
  }, []);

  // Update both investment summary and chart data when selectedRange changes
  useEffect(() => {
    const data = generateInvestmentData(selectedRange);
    setInvestmentSummary(data.summary);
    setChartData(data.chartData);
    setAnalysisData(data.analysis);
    setstatisticsData(data.statistics);
  }, [selectedRange]);

  // Function to render the content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "Summary":
        return (
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <h1 className="text-2xl font-bold mb-4 text-center text-indigo-700">
            Investment Summary
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col items-center p-4 bg-indigo-50 rounded-lg shadow">
              <GiTakeMyMoney className="text-green-500 text-3xl mb-2" />
              <p className="text-gray-600 text-sm">Total Investment</p>
              <p className="text-xl font-bold text-indigo-700">
                {parseFloat(investmentSummary?.totalInvestment || 0).toLocaleString()} USD
              </p>
            </div>
            <div className="flex flex-col items-center p-4 bg-indigo-50 rounded-lg shadow">
              <GiProfit className="text-blue-500 text-3xl mb-2" />
              <p className="text-gray-600 text-sm">Profit/Loss Percentage</p>
              <p className="text-xl font-bold text-indigo-700">
                {investmentSummary ? investmentSummary.percentageChange + "%" : "Loading..."}
              </p>
            </div>
            <div className="flex flex-col items-center p-4 bg-indigo-50 rounded-lg shadow">
              <FaMoneyBillAlt className="text-yellow-500 text-3xl mb-2" />
              <p className="text-gray-600 text-sm">Amount</p>
              <p className="text-xl font-bold text-indigo-700">
                {parseFloat(investmentSummary?.profitLoss || 0).toLocaleString()} USD
              </p>
            </div>
          </div>
        </div>
        );
      case "Chart":
        return (
          <div className="h-64 sm:h-80 md:h-96 lg:h-[450px] xl:h-[500px]">
            <Chart chartData={chartData} />
          </div>
        );
      case "Statistics":
        return (
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
            <h1 className="text-2xl font-bold mb-4 text-center text-indigo-700">
              Statistics
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col items-center p-4 bg-indigo-50 rounded-lg shadow">
                <p className="text-gray-600 text-sm">Average Daily Profit</p>
                <p className="text-xl font-bold text-indigo-700">
                  {statisticsData.avgDailyProfit} USD
                </p>
              </div>
              <div className="flex flex-col items-center p-4 bg-indigo-50 rounded-lg shadow">
                <p className="text-gray-600 text-sm">Total Days Invested</p>
                <p className="text-xl font-bold text-indigo-700">
                  {statisticsData.daysInvested}
                </p>
              </div>
              <div className="flex flex-col items-center p-4 bg-indigo-50 rounded-lg shadow">
                <p className="text-gray-600 text-sm">Maximum Profit Earned</p>
                <p className="text-xl font-bold text-indigo-700">
                  {statisticsData.maxProfit} USD
                </p>
              </div>
              <div className="flex flex-col items-center p-4 bg-indigo-50 rounded-lg shadow">
                <p className="text-gray-600 text-sm">
                  Total Loss on Investment
                </p>
                <p className="text-xl font-bold text-red-500">
                  {statisticsData.minProfit} USD
                </p>
              </div>
            </div>
          </div>
        );
      case "Analysis":
        return (
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
            <h1 className="text-2xl font-bold mb-4 text-center text-indigo-700">
              Analysis
            </h1>
            <div className="p-4 bg-indigo-50 rounded-lg shadow-md">
              <p className="text-gray-600 mb-2 font-semibold">Comments:</p>
              <p className="text-gray-700">{analysisData.comments}</p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg shadow-md">
              <p className="text-gray-600 mb-2 font-semibold">Current Trend:</p>
              <p
                className={`text-lg font-bold ${
                  analysisData.performanceTrend === "Positive"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {analysisData.performanceTrend}
              </p>
            </div>
          </div>
        );
      case "Settings":
        return <div className="text-lg font-semibold text-purple-500 text-center">
          Settings are not available as of now.
          </div>;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      {/* Top Section: Total Investment should always stay visible */}
      <div className="text-start mb-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
          {parseFloat(investmentSummary?.totalInvestment || 0).toLocaleString()}{" "}
          <span className="text-gray-500 text-lg font-semibold text-right">
            USD
          </span>
        </h1>
        <p
          className={`font-semibold mt-2 ${
            investmentSummary?.percentageChange >= 0
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {investmentSummary?.percentageChange >= 0 ? "+" : ""}
          {parseFloat(investmentSummary?.profitLoss || 0).toLocaleString()} (
          {investmentSummary?.percentageChange}%)
        </p>
      </div>

      {/* Tab Section */}
      <div className="flex overflow-x-auto space-x-4 sm:space-x-6 font-semibold text-black mb-6">
        {["Summary", "Chart", "Statistics", "Analysis", "Settings"].map(
          (tab) => (
            <button
              key={tab}
              className={`relative py-2 border-b-2 transition-all duration-200 whitespace-nowrap ${
                activeTab === tab
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent hover:border-indigo-600"
              }`}
              onClick={() => setActiveTab(tab)} // Set the active tab on click
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* Render Content based on active tab */}
      <div className="bg-white rounded-lg p-4 sm:p-6">
        {/* Fullscreen and Compare Buttons for Chart tab only */}
        {activeTab === "Chart" && (
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
              {["1d", "3d", "1w", "1m", "6m", "1y", "max"].map((range) => (
                <button
                  key={range}
                  className={`text-sm px-2 sm:px-3 py-1 rounded-md ${
                    range === selectedRange
                      ? "bg-indigo-600 text-white"
                      : "text-black hover:bg-gray-100"
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
