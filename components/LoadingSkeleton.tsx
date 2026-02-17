export default function LoadingSkeleton() {
  return (
    <>
      {/* Company Overview Card Shimmer */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 md:p-8 mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row items-start justify-between mb-6 md:mb-8 gap-4">
          <div className="flex-1 w-full">
            {/* Company name shimmer */}
            <div className="h-10 w-3/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer bg-[length:200%_100%] mb-3" />
            
            {/* Symbol and badges shimmer */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <div className="h-8 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer bg-[length:200%_100%]" />
              <div className="h-6 w-28 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full animate-shimmer bg-[length:200%_100%]" />
              <div className="h-4 w-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer bg-[length:200%_100%]" />
            </div>
          </div>
          
          {/* Logo shimmer */}
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-shimmer bg-[length:200%_100%]" />
        </div>

        {/* Key Metrics Grid shimmer */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="h-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-shimmer bg-[length:200%_100%]" />
          <div className="h-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-shimmer bg-[length:200%_100%]" />
          <div className="h-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-shimmer bg-[length:200%_100%]" />
          <div className="h-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-shimmer bg-[length:200%_100%]" />
        </div>

        {/* Secondary Metrics shimmer */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="h-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-shimmer bg-[length:200%_100%]" />
          <div className="h-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-shimmer bg-[length:200%_100%]" />
          <div className="h-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-shimmer bg-[length:200%_100%]" />
          <div className="h-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-shimmer bg-[length:200%_100%]" />
        </div>

        {/* Description shimmer */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 md:pt-8">
          <div className="h-6 w-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer bg-[length:200%_100%] mb-4" />
          <div className="space-y-2">
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer bg-[length:200%_100%]" />
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer bg-[length:200%_100%]" />
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer bg-[length:200%_100%] w-4/5" />
          </div>
        </div>
      </div>

      {/* Price Chart Shimmer */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 md:p-8 mb-6 md:mb-8">
        {/* Chart title shimmer */}
        <div className="mb-6">
          <div className="h-8 w-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer bg-[length:200%_100%] mb-3" />
          <div className="h-6 w-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer bg-[length:200%_100%]" />
        </div>
        
        {/* Chart area shimmer */}
        <div className="h-80 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-shimmer bg-[length:200%_100%]" />
      </div>

      {/* Historical Prices Table Shimmer */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 md:p-8">
        {/* Table title shimmer */}
        <div className="h-7 w-80 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer bg-[length:200%_100%] mb-6" />
        
        {/* Table shimmer */}
        <div className="space-y-3">
          {/* Header row */}
          <div className="flex gap-4">
            <div className="h-10 w-1/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer bg-[length:200%_100%]" />
            <div className="h-10 w-1/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer bg-[length:200%_100%]" />
            <div className="h-10 w-1/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer bg-[length:200%_100%]" />
            <div className="h-10 w-1/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer bg-[length:200%_100%]" />
          </div>
          
          {/* Table rows */}
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="h-12 w-1/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer bg-[length:200%_100%]" />
              <div className="h-12 w-1/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer bg-[length:200%_100%]" />
              <div className="h-12 w-1/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer bg-[length:200%_100%]" />
              <div className="h-12 w-1/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer bg-[length:200%_100%]" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
