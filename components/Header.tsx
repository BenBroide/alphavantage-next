"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import StockLogo from "@/components/StockLogo";

export default function Header() {
  const pathname = usePathname();
  const isStockPage = pathname?.startsWith("/stock/");
  const symbol = isStockPage ? pathname?.split("/")[2] : null;

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link 
              href="/" 
              className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Stock Market Dashboard
            </Link>
            {isStockPage && symbol && (
              <>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <div className="flex items-center gap-2">
                  <StockLogo symbol={symbol.toUpperCase()} size="sm" />
                  <span className="text-lg md:text-xl font-semibold text-blue-600">
                    {symbol.toUpperCase()}
                  </span>
                </div>
              </>
            )}
          </div>
          {!isStockPage && (
            <p className="hidden md:block text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest">
              Track and analyze top performing stocks
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
