// API keys should NOT use NEXT_PUBLIC_ prefix to keep them server-side only
const API_KEY_1 = process.env.ALPHAVANTAGE_API_KEY!;
const API_KEY_2 = process.env.ALPHAVANTAGE_API_KEY_2!;
const BASE_URL = "https://www.alphavantage.co/query";

function buildAlphaVantageUrl(params: {
  function: string;
  symbol: string;
  apikey: string;
  outputsize?: string;
}): string {
  const url = new URL(BASE_URL);
  url.search = new URLSearchParams(
    Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== undefined)
    )
  ).toString();
  return url.toString();
}

interface StockApiData {
  overview: any;
  timeSeries: any;
}

export async function fetchStockData(symbol: string): Promise<StockApiData> {
  const [overviewResponse, timeSeriesResponse] = await Promise.all([
    fetch(buildAlphaVantageUrl({
      function: "OVERVIEW",
      symbol,
      apikey: API_KEY_1,
    })),
    fetch(buildAlphaVantageUrl({
      function: "TIME_SERIES_DAILY",
      symbol,
      apikey: API_KEY_2,
    })),
  ]);

  const [overviewData, timeSeriesData] = await Promise.all([
    overviewResponse.json(),
    timeSeriesResponse.json(),
  ]);

  // Check for API errors or rate limits
  const hasOverviewError = 
    overviewData.Note || 
    overviewData["Error Message"] || 
    !overviewData.Symbol;
  
  const hasTimeSeriesError = 
    timeSeriesData.Note || 
    timeSeriesData["Error Message"] || 
    !timeSeriesData["Time Series (Daily)"];

  if (hasOverviewError || hasTimeSeriesError) {
    throw new Error("API error or rate limit");
  }

  return {
    overview: overviewData,
    timeSeries: timeSeriesData,
  };
}
