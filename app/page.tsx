"use client";

import { useState } from "react";
import ViewSwitcher from "@/components/ViewSwitcher";
import CardsView from "@/components/CardsView";
import TilesView from "@/components/TilesView";
import TableView from "@/components/TableView";
import { STOCKS } from "@/lib/stocks";

type ViewType = "cards" | "tiles" | "table";

export default function Home() {
  const [viewType, setViewType] = useState<ViewType>("cards");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100">Select a Stock:</h1>
            <ViewSwitcher viewType={viewType} onViewChange={setViewType} />
          </div>
          
          <div className="p-4 md:p-6">
            {viewType === "cards" && <CardsView stocks={STOCKS} />}
            {viewType === "tiles" && <TilesView stocks={STOCKS} />}
            {viewType === "table" && <TableView stocks={STOCKS} />}
          </div>
        </section>
      </div>
    </div>
  );
}
