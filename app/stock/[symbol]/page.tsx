"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import CompanyOverviewCard from "@/components/CompanyOverviewCard";
import HistoricalPricesTable from "@/components/HistoricalPricesTable";
import PriceChart from "@/components/PriceChart";
import { CompanyOverview, PriceData } from "@/types/stock";
import { processTimeSeriesData } from "@/lib/alphavantage";

export default function StockDetailPage() {
  const params = useParams();
  const router = useRouter();
  const symbol = params.symbol as string;
  
  const [overview, setOverview] = useState<CompanyOverview | null>(null);
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      
      try {
        // Call the Next.js API route that handles both API calls with caching
        const response = await fetch(`/api/stock/${symbol}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch stock data");
        }

        console.log(`Data source: ${data.source}${data.cached ? ' (cached from ' + data.timestamp + ')' : ''}`);

        setOverview(data.overview);
        if (data.timeSeries) {
          const processed = processTimeSeriesData(data.timeSeries);
          setPriceData(processed.slice(0, 100)); // Show last 100 days
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An error occurred while fetching data";
        setError(errorMessage);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (symbol) {
      fetchData();
    }
  }, [symbol]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <section className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Error</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Home
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Loading bar - fixed height to prevent layout shift */}
      <div className="h-10">
        {loading && (
          <div className="bg-green-600 dark:bg-green-700 text-white px-4 py-2 text-center text-base font-medium" role="status" aria-live="polite">
            Data loading...
          </div>
        )}
      </div>
      
      <div className="container mx-auto px-4 py-6 md:py-8">
        {overview ? (
          <>
            <CompanyOverviewCard overview={overview} symbol={symbol} />
            <PriceChart priceData={priceData} symbol={symbol} />
            <HistoricalPricesTable priceData={priceData} />
          </>
        ) : loading ? (
          <LoadingSkeleton />
        ) : null}
      </div>
    </div>
  );
}
