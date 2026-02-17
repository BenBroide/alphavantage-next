import StockCard from "@/components/StockCard";
import { Stock } from "@/types/stock";

interface CardsViewProps {
  stocks: Stock[];
}

export default function CardsView({ stocks }: CardsViewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {stocks.map((stock) => (
        <StockCard key={stock.symbol} stock={stock} />
      ))}
    </div>
  );
}
