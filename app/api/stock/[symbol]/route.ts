import { NextRequest, NextResponse } from "next/server";
import { getTodayCache, getRecentCache, saveCacheData } from "@/lib/cache-service";
import { fetchStockData } from "@/lib/alphavantage-api";
import { validateStockSymbol } from "@/lib/validation";

interface StockResponse {
  symbol: string;
  overview: any;
  timeSeries: any;
  source: "api" | "cache";
  timestamp: string;
  cached: boolean;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ symbol: string }> }
) {
  try {
    const { symbol: symbolParam } = await params;
    
    // Validate and sanitize the stock symbol
    const validation = validateStockSymbol(symbolParam);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: "Invalid stock symbol", message: validation.error },
        { status: 400 }
      );
    }
    
    const symbol = validation.sanitized;
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    // Check if we already have cached data for today
    console.log(`Checking cache for ${symbol} on ${today}`);
    const todayCache = await getTodayCache(symbol, today);
    
    if (todayCache) {
      console.log(`Found cache for today (${today}), returning cached data`);
      const response: StockResponse = {
        symbol,
        overview: todayCache.overview,
        timeSeries: todayCache.timeSeries,
        source: "cache",
        timestamp: todayCache.timestamp,
        cached: true,
      };
      
      const jsonResponse = NextResponse.json(response);
      // Add security headers
      jsonResponse.headers.set('X-Content-Type-Options', 'nosniff');
      jsonResponse.headers.set('X-Frame-Options', 'DENY');
      return jsonResponse;
    }

    // No cache for today, try to fetch from API
    try {
      console.log(`No cache for today, fetching data from API for ${symbol}`);
      
      const { overview, timeSeries } = await fetchStockData(symbol);

      // Save to S3 cache with today's date
      await saveCacheData(today, symbol, overview, timeSeries);

      const response: StockResponse = {
        symbol,
        overview,
        timeSeries,
        source: "api",
        timestamp: new Date().toISOString(),
        cached: false,
      };

      const jsonResponse = NextResponse.json(response);
      // Add security headers
      jsonResponse.headers.set('X-Content-Type-Options', 'nosniff');
      jsonResponse.headers.set('X-Frame-Options', 'DENY');
      return jsonResponse;
    } catch (apiError) {
      console.log("API fetch failed, retrieving from fallback cache:", apiError);
      
      // Try to get most recent cache (fallback for rate limit)
      const cachedData = await getRecentCache(symbol);
      
      if (cachedData) {
        const response: StockResponse = {
          symbol,
          overview: cachedData.overview,
          timeSeries: cachedData.timeSeries,
          source: "cache",
          timestamp: cachedData.timestamp,
          cached: true,
        };

        const jsonResponse = NextResponse.json(response);
        // Add security headers
        jsonResponse.headers.set('X-Content-Type-Options', 'nosniff');
        jsonResponse.headers.set('X-Frame-Options', 'DENY');
        return jsonResponse;
      }

      // No cache available
      throw new Error("API failed and no cache available");
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch stock data",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
