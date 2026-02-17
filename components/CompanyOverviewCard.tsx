"use client";

import { CompanyOverview } from "@/types/stock";
import { getCompanyLogoUrl, formatLargeNumber, formatCurrency } from "@/lib/formatters";
import StockLogo from "@/components/StockLogo";

interface CompanyOverviewCardProps {
  overview: CompanyOverview;
  symbol: string;
}

export default function CompanyOverviewCard({ overview, symbol }: CompanyOverviewCardProps) {
  const logoUrl = getCompanyLogoUrl(overview.OfficialSite || "", symbol);

  return (
    <article data-testid="company-overview" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 md:p-8 mb-6 md:mb-8">
      <div className="flex flex-col sm:flex-row items-start justify-between mb-6 md:mb-8 gap-4">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            {overview.Name || "N/A"}
          </h1>
          <div className="flex flex-wrap items-center gap-3 md:gap-4 text-gray-600 dark:text-gray-400">
            <span className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 font-mono">
              {overview.Symbol || "N/A"}
            </span>
            <span className="text-xs md:text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full font-medium">
              {overview.AssetType || "Stock"}
            </span>
            <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              {overview.Exchange || "N/A"}
            </span>
          </div>
        </div>
        <StockLogo 
          symbol={symbol} 
          logoUrl={logoUrl} 
          size="xl" 
          className="border-2 bg-white shadow-sm flex-shrink-0" 
        />
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <p className="text-xs md:text-sm text-blue-700 mb-1 font-medium">Market Cap</p>
          <p className="text-lg md:text-2xl font-bold text-blue-900 font-mono">
            {formatLargeNumber(overview.MarketCapitalization)}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
          <p className="text-xs md:text-sm text-purple-700 mb-1 font-medium">P/E Ratio</p>
          <p className="text-lg md:text-2xl font-bold text-purple-900 font-mono">
            {overview.PERatio || "N/A"}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
          <p className="text-xs md:text-sm text-green-700 mb-1 font-medium">EPS</p>
          <p className="text-lg md:text-2xl font-bold text-green-900 font-mono">
            {overview.EPS ? formatCurrency(overview.EPS) : "N/A"}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
          <p className="text-xs md:text-sm text-orange-700 mb-1 font-medium">Dividend Yield</p>
          <p className="text-lg md:text-2xl font-bold text-orange-900 font-mono">
            {overview.DividendYield && parseFloat(overview.DividendYield) > 0 
              ? `${(parseFloat(overview.DividendYield) * 100).toFixed(2)}%` 
              : "N/A"}
          </p>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        <div className="bg-gray-50 dark:bg-gray-900 p-3 md:p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-1">Sector</p>
          <p className="text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100 break-words">
            {overview.Sector || "N/A"}
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-900 p-3 md:p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-1">Industry</p>
          <p className="text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100 break-words">
            {overview.Industry || "N/A"}
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-900 p-3 md:p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-1">Beta</p>
          <p className="text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100 font-mono">
            {overview.Beta || "N/A"}
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-900 p-3 md:p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-1">52W High</p>
          <p className="text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100 font-mono">
            {overview["52WeekHigh"] ? formatCurrency(overview["52WeekHigh"]) : "N/A"}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6 md:pt-8">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">About {overview.Name}</h3>
        <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          {overview.Description || "No description available."}
        </p>
      </div>
    </article>
  );
}
