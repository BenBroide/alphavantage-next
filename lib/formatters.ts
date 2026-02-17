/**
 * Utility functions for formatting financial data
 */

/**
 * Format currency with proper decimal places and thousands separator
 * @param value - The number to format
 * @param decimals - Number of decimal places (default: 2)
 */
export function formatCurrency(value: number | string, decimals: number = 2): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "N/A";
  return `$${num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

/**
 * Format large numbers with K, M, B, T suffixes
 * @param value - The number to format
 */
export function formatLargeNumber(value: number | string): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "N/A";
  
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
  return formatCurrency(num);
}

/**
 * Format volume with K, M, B suffixes (no dollar sign)
 * @param value - The number to format
 */
export function formatVolume(value: number | string): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "N/A";
  
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
  return num.toLocaleString();
}

/**
 * Format percentage with sign and 2 decimal places
 * @param value - The percentage value
 */
export function formatPercentage(value: number | string): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "N/A";
  
  const sign = num > 0 ? "+" : "";
  return `${sign}${num.toFixed(2)}%`;
}

/**
 * Get color class for positive/negative values
 * @param value - The value to check
 */
export function getChangeColor(value: number): string {
  if (value > 0) return "text-green-600";
  if (value < 0) return "text-red-600";
  return "text-gray-600";
}

/**
 * Get background color class for positive/negative values
 * @param value - The value to check
 */
export function getChangeBgColor(value: number): string {
  if (value > 0) return "bg-green-50";
  if (value < 0) return "bg-red-50";
  return "bg-gray-50";
}

/**
 * Extract domain from URL
 * @param url - The URL to extract domain from
 */
export function extractDomain(url: string): string {
  if (!url) return "";
  
  try {
    // Remove protocol if present
    let domain = url.replace(/^https?:\/\//, "");
    // Remove www. if present
    domain = domain.replace(/^www\./, "");
    // Remove path and query params
    domain = domain.split("/")[0];
    domain = domain.split("?")[0];
    return domain;
  } catch {
    return "";
  }
}

/**
 * Get company logo URL from Google favicon service
 * @param websiteUrl - Company website URL
 * @param symbol - Stock symbol (fallback)
 */
export function getCompanyLogoUrl(websiteUrl: string, symbol: string): string {
  const domain = extractDomain(websiteUrl);
  
  if (domain) {
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  }
  
  // Fallback to symbol-based domain mapping
  return getLogoUrlBySymbol(symbol);
}

/**
 * Get logo URL by stock symbol using common domain mappings
 * @param symbol - Stock symbol
 */
export function getLogoUrlBySymbol(symbol: string): string {
  const domainMap: { [key: string]: string } = {
    "AAPL": "apple.com",
    "GOOGL": "google.com",
    "MSFT": "microsoft.com",
    "AMZN": "amazon.com",
    "META": "meta.com",
    "TSLA": "tesla.com",
    "NVDA": "nvidia.com",
    "JPM": "jpmorganchase.com",
    "V": "visa.com",
    "WMT": "walmart.com",
    "JNJ": "jnj.com",
    "PG": "pg.com",
    "XOM": "exxonmobil.com",
    "BAC": "bankofamerica.com",
    "MA": "mastercard.com",
    "DIS": "disney.com",
    "NFLX": "netflix.com",
    "BA": "boeing.com",
    "IBM": "ibm.com",
    "INTC": "intel.com",
    "AMD": "amd.com",
  };
  
  const domain = domainMap[symbol.toUpperCase()];
  return domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : "";
}

/**
 * Format date to relative time (e.g., "2 hours ago")
 * @param dateString - ISO date string
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
