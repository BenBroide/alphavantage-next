import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { fetchStockData } from '../alphavantage-api';

// Mock global fetch
global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

describe('AlphaVantage API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchStockData', () => {
    it('should fetch and return both overview and timeseries data', async () => {
      const mockOverview = {
        Symbol: 'AAPL',
        Name: 'Apple Inc.',
        MarketCapitalization: '3000000000000',
      };

      const mockTimeSeries = {
        'Time Series (Daily)': {
          '2024-01-15': {
            '1. open': '150.00',
            '2. high': '155.00',
            '3. low': '149.00',
            '4. close': '154.00',
            '5. volume': '50000000',
          },
        },
      };

      (global.fetch as jest.MockedFunction<typeof fetch>)
        .mockResolvedValueOnce({
          json: async () => mockOverview,
        } as Response)
        .mockResolvedValueOnce({
          json: async () => mockTimeSeries,
        } as Response);

      const result = await fetchStockData('AAPL');

      expect(result).toEqual({
        overview: mockOverview,
        timeSeries: mockTimeSeries,
      });
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    it('should throw error when overview has rate limit error', async () => {
      const mockOverviewError = {
        Note: 'Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute.',
      };

      const mockTimeSeries = {
        'Time Series (Daily)': {},
      };

      (global.fetch as jest.MockedFunction<typeof fetch>)
        .mockResolvedValueOnce({
          json: async () => mockOverviewError,
        } as Response)
        .mockResolvedValueOnce({
          json: async () => mockTimeSeries,
        } as Response);

      await expect(fetchStockData('AAPL')).rejects.toThrow('API error or rate limit');
    });

    it('should throw error when timeseries has error message', async () => {
      const mockOverview = {
        Symbol: 'AAPL',
        Name: 'Apple Inc.',
      };

      const mockTimeSeriesError = {
        'Error Message': 'Invalid API call.',
      };

      (global.fetch as jest.MockedFunction<typeof fetch>)
        .mockResolvedValueOnce({
          json: async () => mockOverview,
        } as Response)
        .mockResolvedValueOnce({
          json: async () => mockTimeSeriesError,
        } as Response);

      await expect(fetchStockData('AAPL')).rejects.toThrow('API error or rate limit');
    });

    it('should throw error when overview is missing Symbol', async () => {
      const mockOverviewInvalid = {
        Name: 'Apple Inc.',
        // Missing Symbol field
      };

      const mockTimeSeries = {
        'Time Series (Daily)': {},
      };

      (global.fetch as jest.MockedFunction<typeof fetch>)
        .mockResolvedValueOnce({
          json: async () => mockOverviewInvalid,
        } as Response)
        .mockResolvedValueOnce({
          json: async () => mockTimeSeries,
        } as Response);

      await expect(fetchStockData('AAPL')).rejects.toThrow('API error or rate limit');
    });

    it('should throw error when timeseries is missing Time Series data', async () => {
      const mockOverview = {
        Symbol: 'AAPL',
        Name: 'Apple Inc.',
      };

      const mockTimeSeriesInvalid = {
        // Missing "Time Series (Daily)" field
      };

      (global.fetch as jest.MockedFunction<typeof fetch>)
        .mockResolvedValueOnce({
          json: async () => mockOverview,
        } as Response)
        .mockResolvedValueOnce({
          json: async () => mockTimeSeriesInvalid,
        } as Response);

      await expect(fetchStockData('AAPL')).rejects.toThrow('API error or rate limit');
    });

    it('should make API calls with correct URLs and API keys', async () => {
      const mockOverview = { Symbol: 'TSLA', Name: 'Tesla Inc.' };
      const mockTimeSeries = { 'Time Series (Daily)': {} };

      (global.fetch as jest.MockedFunction<typeof fetch>)
        .mockResolvedValueOnce({
          json: async () => mockOverview,
        } as Response)
        .mockResolvedValueOnce({
          json: async () => mockTimeSeries,
        } as Response);

      await fetchStockData('TSLA');

      const calls = (global.fetch as jest.MockedFunction<typeof fetch>).mock.calls;
      
      // Check that overview call includes OVERVIEW function and symbol
      expect(calls[0][0]).toContain('function=OVERVIEW');
      expect(calls[0][0]).toContain('symbol=TSLA');
      
      // Check that timeseries call includes TIME_SERIES_DAILY function
      expect(calls[1][0]).toContain('function=TIME_SERIES_DAILY');
      expect(calls[1][0]).toContain('symbol=TSLA');
    });

    it('should handle network errors', async () => {
      (global.fetch as jest.MockedFunction<typeof fetch>)
        .mockRejectedValueOnce(new Error('Network error'));

      await expect(fetchStockData('AAPL')).rejects.toThrow('Network error');
    });
  });
});
