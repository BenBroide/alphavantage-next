export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base font-medium">
            © {new Date().getFullYear()} Stock Market Data. All rights reserved.
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-xs md:text-sm font-normal tracking-wide">
            Powered by Alpha Vantage API
          </p>
        </div>
      </div>
    </footer>
  );
}
