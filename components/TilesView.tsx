"use client";

import Link from "next/link";
import { Stock } from "@/types/stock";
import StockLogo from "@/components/StockLogo";

interface TilesViewProps {
  stocks: Stock[];
}

export default function TilesView({ stocks }: TilesViewProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
      {stocks.map((stock) => (
        <Link key={stock.symbol} href={`/stock/${stock.symbol}`} className="cursor-pointer">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 md:p-4 hover:shadow-lg transition-all hover:border-blue-500 dark:hover:border-blue-400 text-center">
            <StockLogo symbol={stock.symbol} size="md" className="mx-auto mb-2" />
            <h3 className="font-bold text-sm md:text-base text-gray-900 dark:text-gray-100 mb-1">
              {stock.symbol}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs hidden sm:block line-clamp-2">
              {stock.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
