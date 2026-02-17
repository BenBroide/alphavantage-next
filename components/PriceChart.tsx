"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { PriceData } from "@/types/stock";
import { formatCurrency, formatPercentage } from "@/lib/formatters";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface PriceChartProps {
  priceData: PriceData[];
  symbol: string;
}

export default function PriceChart({ priceData, symbol }: PriceChartProps) {
  // Reverse the data to show oldest to newest (left to right)
  const reversedData = [...priceData].reverse();
  
  // Calculate overall change
  const firstPrice = reversedData[0]?.close || 0;
  const lastPrice = reversedData[reversedData.length - 1]?.close || 0;
  const overallChange = lastPrice - firstPrice;
  const overallChangePercent = (overallChange / firstPrice) * 100;
  const isPositive = overallChange > 0;

  // Determine chart color based on overall trend
  const chartColor = isPositive 
    ? { border: "rgb(34, 197, 94)", bg: "rgba(34, 197, 94, 0.1)" }
    : { border: "rgb(239, 68, 68)", bg: "rgba(239, 68, 68, 0.1)" };

  const chartData = {
    labels: reversedData.map((item) => {
      const date = new Date(item.date);
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }),
    datasets: [
      {
        label: `${symbol} Price`,
        data: reversedData.map((item) => item.close),
        borderColor: chartColor.border,
        backgroundColor: chartColor.bg,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: chartColor.border,
        pointHoverBorderColor: "white",
        pointHoverBorderWidth: 3,
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        padding: 12,
        titleColor: "white",
        bodyColor: "white",
        borderColor: chartColor.border,
        borderWidth: 2,
        displayColors: false,
        callbacks: {
          title: function (context: any) {
            return context[0].label;
          },
          label: function (context: any) {
            const price = context.parsed.y;
            const index = context.dataIndex;
            const change = index > 0 
              ? ((price - reversedData[index - 1].close) / reversedData[index - 1].close) * 100
              : 0;
            
            return [
              `Price: ${formatCurrency(price)}`,
              index > 0 ? `Change: ${formatPercentage(change)}` : ''
            ].filter(Boolean);
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          maxTicksLimit: 8,
          autoSkip: true,
          color: "#6b7280",
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          drawBorder: false,
        },
        ticks: {
          callback: function (value: any) {
            return "$" + value.toFixed(0);
          },
          color: "#6b7280",
          font: {
            size: 11,
          },
        },
        border: {
          display: false,
        },
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
  };

  return (
    <div data-testid="price-chart" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 md:p-8 mb-6 md:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Price Chart
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Last {priceData.length} trading days
          </p>
        </div>
        
        {/* Overall Change Badge */}
        <div className={`inline-flex flex-col items-end px-4 py-3 rounded-lg border-2 ${
          isPositive 
            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
            : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
        }`}>
          <span className="text-xs text-gray-600 dark:text-gray-400 font-medium mb-1">Period Change</span>
          <div className="flex items-center gap-2">
            {isPositive ? (
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
            <span className={`text-xl font-bold font-mono ${
              isPositive ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
            }`}>
              {formatPercentage(overallChangePercent)}
            </span>
          </div>
          <span className={`text-sm font-medium mt-0.5 ${
            isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {formatCurrency(Math.abs(overallChange))}
          </span>
        </div>
      </div>
      
      <div className="h-[300px] md:h-[450px] mt-4">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
