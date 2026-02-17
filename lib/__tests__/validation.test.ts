import { validateStockSymbol, sanitizeDateString } from '../validation';

describe('validateStockSymbol', () => {
  it('should validate correct stock symbols', () => {
    expect(validateStockSymbol('AAPL').isValid).toBe(true);
    expect(validateStockSymbol('MSFT').isValid).toBe(true);
    expect(validateStockSymbol('BRK.A').isValid).toBe(true);
    expect(validateStockSymbol('^GSPC').isValid).toBe(true);
  });

  it('should sanitize and uppercase symbols', () => {
    expect(validateStockSymbol('aapl').sanitized).toBe('AAPL');
    expect(validateStockSymbol('  msft  ').sanitized).toBe('MSFT');
  });

  it('should reject empty symbols', () => {
    expect(validateStockSymbol('').isValid).toBe(false);
    expect(validateStockSymbol('   ').isValid).toBe(false);
  });

  it('should reject symbols that are too long', () => {
    expect(validateStockSymbol('VERYLONGSYMBOL').isValid).toBe(false);
  });

  it('should reject path traversal attempts', () => {
    expect(validateStockSymbol('../etc/passwd').isValid).toBe(false);
    expect(validateStockSymbol('../../secret').isValid).toBe(false);
    expect(validateStockSymbol('AAPL/../MSFT').isValid).toBe(false);
  });

  it('should reject invalid characters', () => {
    expect(validateStockSymbol('AAPL;DROP TABLE').isValid).toBe(false);
    expect(validateStockSymbol('AAPL<script>').isValid).toBe(false);
    expect(validateStockSymbol('AAPL/MSFT').isValid).toBe(false);
  });

  it('should handle null/undefined inputs', () => {
    expect(validateStockSymbol(null as any).isValid).toBe(false);
    expect(validateStockSymbol(undefined as any).isValid).toBe(false);
  });
});

describe('sanitizeDateString', () => {
  it('should validate correct date formats', () => {
    expect(sanitizeDateString('2024-01-15').isValid).toBe(true);
    expect(sanitizeDateString('2024-12-31').isValid).toBe(true);
  });

  it('should reject invalid date formats', () => {
    expect(sanitizeDateString('2024/01/15').isValid).toBe(false);
    expect(sanitizeDateString('15-01-2024').isValid).toBe(false);
    expect(sanitizeDateString('2024-1-5').isValid).toBe(false);
  });

  it('should reject path traversal attempts', () => {
    expect(sanitizeDateString('2024-01-15/../secret').isValid).toBe(false);
    expect(sanitizeDateString('../2024-01-15').isValid).toBe(false);
  });

  it('should reject invalid dates', () => {
    expect(sanitizeDateString('2024-13-01').isValid).toBe(false);
    expect(sanitizeDateString('2024-02-30').isValid).toBe(false);
  });
});
