"use client";

import Link from "next/link";
import { Stock } from "@/types/stock";
import StockLogo from "@/components/StockLogo";

interface StockCardProps {
  stock: Stock;
}

export default function StockCard({ stock }: StockCardProps) {
  return (
    <Link href={`/stock/${stock.symbol}`} className="cursor-pointer">
      <div data-testid="stock-card" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-500 dark:hover:border-blue-400 hover:scale-[1.02]">
        <div className="flex items-center justify-between mb-4">
          <StockLogo symbol={stock.symbol} size="lg" />
        </div>
        <h3 data-testid="stock-symbol" className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-1 tracking-tight">
          {stock.symbol}
        </h3>
        <p data-testid="stock-price" className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed">
          {stock.name}
        </p>
      </div>
    </Link>
  );
}
