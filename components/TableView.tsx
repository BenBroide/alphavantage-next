"use client";

import Link from "next/link";
import { Stock } from "@/types/stock";
import StockLogo from "@/components/StockLogo";

interface TableViewProps {
  stocks: Stock[];
}

export default function TableView({ stocks }: TableViewProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="text-left py-3 md:py-4 px-3 md:px-6 font-semibold text-gray-900 dark:text-gray-100 text-sm md:text-base">
                Symbol
              </th>
              <th className="text-left py-3 md:py-4 px-3 md:px-6 font-semibold text-gray-900 dark:text-gray-100 text-sm md:text-base">
                Company Name
              </th>
              <th className="text-center py-3 md:py-4 px-3 md:px-6 font-semibold text-gray-900 dark:text-gray-100 text-sm md:text-base">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {stocks.map((stock) => (
              <tr key={stock.symbol} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="py-3 md:py-4 px-3 md:px-6">
                  <div className="flex items-center gap-2 md:gap-3">
                    <StockLogo symbol={stock.symbol} size="sm" className="flex-shrink-0" />
                    <span className="font-bold text-sm md:text-base text-gray-900 dark:text-gray-100">
                      {stock.symbol}
                    </span>
                  </div>
                </td>
                <td className="py-3 md:py-4 px-3 md:px-6 text-gray-700 dark:text-gray-300 text-sm md:text-base">
                  {stock.name}
                </td>
                <td className="py-3 md:py-4 px-3 md:px-6 text-center">
                  <Link href={`/stock/${stock.symbol}`} className="cursor-pointer">
                    <button className="bg-blue-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg hover:bg-blue-700 transition-colors text-xs md:text-sm font-medium cursor-pointer">
                      View Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
