import { PriceData } from "@/types/stock";
import { formatCurrency, formatVolume, formatPercentage, getChangeColor, getChangeBgColor } from "@/lib/formatters";

interface HistoricalPricesTableProps {
  priceData: PriceData[];
}

export default function HistoricalPricesTable({ priceData }: HistoricalPricesTableProps) {
  return (
    <section data-testid="historical-prices" className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 md:mb-6">
        Historical Prices (Last 100 Days)
      </h2>
      
      <div className="overflow-x-auto -mx-4 md:mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900">
                <th className="text-left py-3 md:py-4 px-3 md:px-6 font-bold text-gray-900 dark:text-gray-100 text-xs md:text-sm whitespace-nowrap uppercase tracking-wide">
                  Date
                </th>
                <th className="text-right py-3 md:py-4 px-3 md:px-6 font-bold text-gray-900 dark:text-gray-100 text-xs md:text-sm whitespace-nowrap uppercase tracking-wide">
                  Close
                </th>
                <th className="text-right py-3 md:py-4 px-3 md:px-6 font-bold text-gray-900 dark:text-gray-100 text-xs md:text-sm whitespace-nowrap uppercase tracking-wide">
                  Volume
                </th>
                <th className="text-right py-3 md:py-4 px-3 md:px-6 font-bold text-gray-900 dark:text-gray-100 text-xs md:text-sm whitespace-nowrap uppercase tracking-wide">
                  Change
                </th>
              </tr>
            </thead>
            <tbody>
              {priceData.map((data, index) => {
                const isPositive = data.percentChange > 0;
                const isNegative = data.percentChange < 0;
                
                return (
                  <tr 
                    key={data.date} 
                    className={`border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      index === 0 ? 'bg-blue-50/30 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    <td className="py-3 md:py-4 px-3 md:px-6 text-gray-900 dark:text-gray-100 text-xs md:text-sm whitespace-nowrap font-medium">
                      {new Date(data.date).toLocaleDateString("en-US", { 
                        month: "short", 
                        day: "numeric",
                        year: "numeric"
                      })}
                      {index === 0 && (
                        <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-0.5 rounded-full font-semibold">
                          Latest
                        </span>
                      )}
                    </td>
                    <td className="py-3 md:py-4 px-3 md:px-6 text-right text-gray-900 dark:text-gray-100 font-bold text-sm md:text-base whitespace-nowrap font-mono">
                      {formatCurrency(data.close)}
                    </td>
                    <td className="py-3 md:py-4 px-3 md:px-6 text-right text-gray-600 dark:text-gray-400 text-xs md:text-sm whitespace-nowrap font-mono">
                      {formatVolume(data.volume)}
                    </td>
                    <td className="py-3 md:py-4 px-3 md:px-6 text-right whitespace-nowrap">
                      {index === priceData.length - 1 ? (
                        <span className="text-gray-400 text-xs md:text-sm">—</span>
                      ) : (
                        <div className="inline-flex items-center gap-1">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs md:text-sm font-bold font-mono ${
                            isPositive 
                              ? 'bg-green-100 text-green-700 border border-green-300' 
                              : isNegative 
                              ? 'bg-red-100 text-red-700 border border-red-300'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {isPositive && (
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                            {isNegative && (
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                            {formatPercentage(data.percentChange)}
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
