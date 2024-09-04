import { faker } from '@faker-js/faker';

const generateInvestmentData = (range = '1w') => {
  const totalInvestment = faker.finance.amount({ min: 1000, max: 100000, dec: 2 });
  const profitLoss = faker.finance.amount({ min: -5000, max: 5000, dec: 2 });
  const percentageChange = faker.number.int({ min: -10, max: 10 });

  const summary = {
    totalInvestment,
    profitLoss,
    percentageChange,
  };

  const dataPoints = {
    '1d': 1,
    '3d': 3,
    '1w': 7,
    '1m': 30,
    '6m': 180,
    '1y': 365,
    'max': 730,
  };

  const days = dataPoints[range] || 7;

  const chartData = {
    labels: Array.from({ length: days }, (_, i) => faker.date.weekday()),
    datasets: [
      {
        label: 'Investment Value',
        data: Array.from({ length: days }, () => faker.finance.amount({ min: 5000, max: 50000, dec: 2 })),
        backgroundColor: 'rgba(128, 0, 128, 0.1)', // Light purple for the area under the line
        borderColor: 'rgba(128, 0, 128, 1)', // Purple for the line
        borderWidth: 2, // Line thickness
        fill: true, // Fill the area under the line with color
        tension: 0.4, // Smooth line curve
      },
    ],
  };

  const statistics = {
    avgDailyProfit: faker.finance.amount({ min: 100, max: 1000, dec: 2 }),
    maxProfit: faker.finance.amount({ min: 500, max: 10000, dec: 2 }),
    minProfit: faker.finance.amount({ min: -5000, max: -100, dec: 2 }),
    daysInvested: faker.number.int({ min: 1, max: 365 }),
  };

  const analysis = {
    comments: faker.lorem.sentences(2),
    performanceTrend: faker.lorem.words(3),
  };
  console.log("the statistics data is : ",statistics, "the analysis data is : ",analysis);
  return {
    summary,
    chartData,
    statistics,
    analysis,
  };
};

export default generateInvestmentData;
