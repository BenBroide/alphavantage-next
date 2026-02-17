export interface Stock {
  symbol: string;
  name: string;
}

export interface CompanyOverview {
  Symbol: string;
  AssetType: string;
  Name: string;
  Description: string;
  Exchange: string;
  Sector: string;
  Industry: string;
  MarketCapitalization: string;
  Address?: string;
  OfficialSite?: string;
  PERatio?: string;
  EPS?: string;
  DividendYield?: string;
  Beta?: string;
  "52WeekHigh"?: string;
  "52WeekLow"?: string;
  "50DayMovingAverage"?: string;
  "200DayMovingAverage"?: string;
  PriceToBookRatio?: string;
}

export interface TimeSeriesDaily {
  "Meta Data": {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Output Size": string;
    "5. Time Zone": string;
  };
  "Time Series (Daily)": {
    [date: string]: {
      "1. open": string;
      "2. high": string;
      "3. low": string;
      "4. close": string;
      "5. volume": string;
    };
  };
}

export interface PriceData {
  date: string;
  close: number;
  volume: number;
  percentChange: number;
}
