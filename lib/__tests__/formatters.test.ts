import { describe, it, expect } from '@jest/globals';
import {
  formatCurrency,
  formatLargeNumber,
  formatVolume,
  formatPercentage,
} from '../formatters';

describe('formatCurrency', () => {
  it('should format numbers with thousands separator and decimals', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
    expect(formatCurrency(1000000)).toBe('$1,000,000.00');
  });

  it('should return N/A for invalid inputs', () => {
    expect(formatCurrency('invalid')).toBe('N/A');
    expect(formatCurrency(NaN)).toBe('N/A');
  });
});

describe('formatLargeNumber', () => {
  it('should format with K, M, B, T suffixes', () => {
    expect(formatLargeNumber(5000)).toBe('$5.00K');
    expect(formatLargeNumber(5000000)).toBe('$5.00M');
    expect(formatLargeNumber(5000000000)).toBe('$5.00B');
    expect(formatLargeNumber(5000000000000)).toBe('$5.00T');
  });

  it('should return N/A for invalid inputs', () => {
    expect(formatLargeNumber('invalid')).toBe('N/A');
  });
});

describe('formatVolume', () => {
  it('should format with K, M, B suffixes without dollar sign', () => {
    expect(formatVolume(5000)).toBe('5.00K');
    expect(formatVolume(5000000)).toBe('5.00M');
    expect(formatVolume(5000000000)).toBe('5.00B');
  });

  it('should return N/A for invalid inputs', () => {
    expect(formatVolume('invalid')).toBe('N/A');
  });
});

describe('formatPercentage', () => {
  it('should format with +/- signs', () => {
    expect(formatPercentage(5.25)).toBe('+5.25%');
    expect(formatPercentage(-5.25)).toBe('-5.25%');
    expect(formatPercentage(0)).toBe('0.00%');
  });

  it('should return N/A for invalid inputs', () => {
    expect(formatPercentage('invalid')).toBe('N/A');
  });
});
