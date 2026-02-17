import { getObjectFromS3, saveToS3 } from "./s3-service";
import { validateStockSymbol, sanitizeDateString } from "./validation";

interface CachedData {
  overview: any;
  timeSeries: any;
  timestamp: string;
}

export async function getTodayCache(symbol: string, today: string): Promise<CachedData | null> {
  try {
    // Validate inputs to prevent path traversal
    const symbolValidation = validateStockSymbol(symbol);
    const dateValidation = sanitizeDateString(today);
    
    if (!symbolValidation.isValid || !dateValidation.isValid) {
      console.error('Invalid cache key parameters');
      return null;
    }
    
    const safeSymbol = symbolValidation.sanitized;
    const safeDate = dateValidation.sanitized;
    
    console.log(`Looking for cache: ${safeDate}/${safeSymbol}/`);
    const [overviewData, timeSeriesData] = await Promise.all([
      getObjectFromS3(`${safeDate}/${safeSymbol}/overview.json`),
      getObjectFromS3(`${safeDate}/${safeSymbol}/timeseries.json`),
    ]);

    if (overviewData && timeSeriesData) {
      return {
        overview: overviewData,
        timeSeries: timeSeriesData,
        timestamp: today,
      };
    }
    
    return null;
  } catch (error) {
    console.log(`No cache found for today (${today})`);
    return null;
  }
}

export async function getRecentCache(symbol: string): Promise<CachedData | null> {
  try {
    // Validate symbol to prevent path traversal
    const symbolValidation = validateStockSymbol(symbol);
    if (!symbolValidation.isValid) {
      console.error('Invalid symbol for cache retrieval');
      return null;
    }
    const safeSymbol = symbolValidation.sanitized;
    
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const dateStr = checkDate.toISOString().split("T")[0];
      
      try {
        const [overviewData, timeSeriesData] = await Promise.all([
          getObjectFromS3(`${dateStr}/${safeSymbol}/overview.json`),
          getObjectFromS3(`${dateStr}/${safeSymbol}/timeseries.json`),
        ]);

        if (overviewData && timeSeriesData) {
          console.log(`Found cache from ${dateStr}`);
          return {
            overview: overviewData,
            timeSeries: timeSeriesData,
            timestamp: dateStr,
          };
        }
      } catch (err) {
        continue;
      }
    }
    
    return null;
  } catch (error) {
    console.error("Error retrieving from cache:", error);
    return null;
  }
}

export async function saveCacheData(
  date: string,
  symbol: string,
  overviewData: any,
  timeSeriesData: any
): Promise<void> {
  // Validate inputs to prevent path traversal
  const symbolValidation = validateStockSymbol(symbol);
  const dateValidation = sanitizeDateString(date);
  
  if (!symbolValidation.isValid || !dateValidation.isValid) {
    throw new Error('Invalid cache parameters');
  }
  
  await Promise.all([
    saveToS3(dateValidation.sanitized, symbolValidation.sanitized, "overview.json", overviewData),
    saveToS3(dateValidation.sanitized, symbolValidation.sanitized, "timeseries.json", timeSeriesData),
  ]);
}
