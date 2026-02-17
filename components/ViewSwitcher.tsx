type ViewType = "cards" | "tiles" | "table";

interface ViewSwitcherProps {
  viewType: ViewType;
  onViewChange: (view: ViewType) => void;
}

export default function ViewSwitcher({ viewType, onViewChange }: ViewSwitcherProps) {
  return (
    <div className="inline-flex gap-1 bg-gray-100 dark:bg-gray-700/50 p-1 rounded-lg">
      {/* Cards View */}
      <button
        onClick={() => onViewChange("cards")}
        className={`p-2 rounded-md font-medium transition-all w-9 h-9 flex items-center justify-center ${
          viewType === "cards"
            ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm"
            : "text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-600/50"
        }`}
        title="Cards View"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
        </svg>
      </button>

      {/* Tiles View */}
      <button
        onClick={() => onViewChange("tiles")}
        className={`p-2 rounded-md font-medium transition-all w-9 h-9 flex items-center justify-center ${
          viewType === "tiles"
            ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm"
            : "text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-600/50"
        }`}
        title="Tiles View"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="6" width="4" height="4" strokeWidth="2" rx="0.5"/>
          <rect x="9" y="6" width="4" height="4" strokeWidth="2" rx="0.5"/>
          <rect x="15" y="6" width="4" height="4" strokeWidth="2" rx="0.5"/>
          <rect x="21" y="6" width="0.5" height="4" strokeWidth="2" rx="0.5"/>
          <rect x="3" y="14" width="4" height="4" strokeWidth="2" rx="0.5"/>
          <rect x="9" y="14" width="4" height="4" strokeWidth="2" rx="0.5"/>
          <rect x="15" y="14" width="4" height="4" strokeWidth="2" rx="0.5"/>
          <rect x="21" y="14" width="0.5" height="4" strokeWidth="2" rx="0.5"/>
        </svg>
      </button>

      {/* Table View */}
      <button
        onClick={() => onViewChange("table")}
        className={`p-2 rounded-md font-medium transition-all w-9 h-9 flex items-center justify-center ${
          viewType === "table"
            ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm"
            : "text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-600/50"
        }`}
        title="Table View"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
  );
}
