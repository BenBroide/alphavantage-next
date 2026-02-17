import { TimeSeriesDaily, PriceData } from "@/types/stock";

export function processTimeSeriesData(timeSeriesData: TimeSeriesDaily): PriceData[] {
  const dailyData = timeSeriesData["Time Series (Daily)"];
  
  if (!dailyData) {
    console.error("No daily data available");
    return [];
  }
  
  const dates = Object.keys(dailyData).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  
  const priceData: PriceData[] = [];
  
  for (let i = 0; i < dates.length; i++) {
    const date = dates[i];
    const current = dailyData[date];
    const closePrice = parseFloat(current["4. close"]);
    const volume = parseInt(current["5. volume"]);
    
    let percentChange = 0;
    if (i < dates.length - 1) {
      const previousDate = dates[i + 1];
      const previous = dailyData[previousDate];
      const previousClose = parseFloat(previous["4. close"]);
      percentChange = ((closePrice - previousClose) / previousClose) * 100;
    }
    
    priceData.push({
      date,
      close: closePrice,
      volume,
      percentChange,
    });
  }
  
  return priceData;
}
