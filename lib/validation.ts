/**
 * Input validation utilities
 */

/**
 * Validates a stock symbol
 * Stock symbols are typically 1-5 characters, alphanumeric only
 * Some international markets may have longer symbols or include dots/hyphens
 */
export function validateStockSymbol(symbol: string): {
  isValid: boolean;
  sanitized: string;
  error?: string;
} {
  // Check if symbol exists
  if (!symbol || typeof symbol !== 'string') {
    return {
      isValid: false,
      sanitized: '',
      error: 'Stock symbol is required',
    };
  }

  // Trim and convert to uppercase
  const cleaned = symbol.trim().toUpperCase();

  // Check for empty string after trimming
  if (cleaned.length === 0) {
    return {
      isValid: false,
      sanitized: '',
      error: 'Stock symbol cannot be empty',
    };
  }

  // Check length (most symbols are 1-5 chars, some markets up to 10)
  if (cleaned.length > 10) {
    return {
      isValid: false,
      sanitized: cleaned,
      error: 'Stock symbol too long (max 10 characters)',
    };
  }

  // Allow only alphanumeric characters, dots, and hyphens
  // This covers US stocks (AAPL), some international (BRK.A), and indices (^GSPC)
  const validPattern = /^[A-Z0-9.\-^]+$/;
  if (!validPattern.test(cleaned)) {
    return {
      isValid: false,
      sanitized: cleaned,
      error: 'Stock symbol contains invalid characters (only letters, numbers, dots, hyphens, and ^ allowed)',
    };
  }

  // Additional check: prevent path traversal attempts
  if (cleaned.includes('..') || cleaned.includes('/') || cleaned.includes('\\')) {
    return {
      isValid: false,
      sanitized: cleaned,
      error: 'Invalid stock symbol format',
    };
  }

  return {
    isValid: true,
    sanitized: cleaned,
  };
}

/**
 * Sanitizes a date string to YYYY-MM-DD format
 * Prevents path traversal in S3 keys
 */
export function sanitizeDateString(dateStr: string): {
  isValid: boolean;
  sanitized: string;
  error?: string;
} {
  // Check basic format YYYY-MM-DD
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(dateStr)) {
    return {
      isValid: false,
      sanitized: '',
      error: 'Invalid date format (expected YYYY-MM-DD)',
    };
  }

  // Check for path traversal attempts
  if (dateStr.includes('..') || dateStr.includes('/') || dateStr.includes('\\')) {
    return {
      isValid: false,
      sanitized: '',
      error: 'Invalid date format',
    };
  }

  // Validate it's a real date
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return {
      isValid: false,
      sanitized: '',
      error: 'Invalid date',
    };
  }

  // Ensure the parsed date matches the input (catches invalid dates like Feb 30)
  const [year, month, day] = dateStr.split('-').map(Number);
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return {
      isValid: false,
      sanitized: '',
      error: 'Invalid date',
    };
  }

  return {
    isValid: true,
    sanitized: dateStr,
  };
}
