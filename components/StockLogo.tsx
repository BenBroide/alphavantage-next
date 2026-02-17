"use client";

import { useState } from "react";
import { getLogoUrlBySymbol } from "@/lib/formatters";

interface StockLogoProps {
  symbol: string;
  logoUrl?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8 md:w-10 md:h-10",
  md: "w-10 h-10 md:w-12 md:h-12",
  lg: "w-12 h-12",
  xl: "w-16 h-16 md:w-20 md:h-20",
};

const textSizeClasses = {
  sm: "text-xs md:text-sm",
  md: "text-base md:text-lg",
  lg: "text-lg",
  xl: "text-2xl md:text-3xl",
};

export default function StockLogo({ 
  symbol, 
  logoUrl, 
  size = "md", 
  className = "" 
}: StockLogoProps) {
  const [logoError, setLogoError] = useState(false);
  const finalLogoUrl = logoUrl || getLogoUrlBySymbol(symbol);

  return (
    <div data-testid="stock-logo" className={`${sizeClasses[size]} rounded-lg flex items-center justify-center overflow-hidden border border-gray-100 ${className}`}>
      {finalLogoUrl && !logoError ? (
        <img
          src={finalLogoUrl}
          alt={symbol}
          className="w-full h-full object-contain"
          onError={() => setLogoError(true)}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <span className={`text-white font-bold ${textSizeClasses[size]}`}>
            {symbol.charAt(0)}
          </span>
        </div>
      )}
    </div>
  );
}
