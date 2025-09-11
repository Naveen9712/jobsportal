interface HeroProps {
  title: string;
  subtitle: string;
  showSearch?: boolean;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onSearchSubmit?: () => void;
}

const Hero = ({ 
  title, 
  subtitle, 
  showSearch = false, 
  searchQuery = '', 
  onSearchChange, 
  onSearchSubmit 
}: HeroProps) => {
  return (
    <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8">{subtitle}</p>
            {showSearch && (
              <div className="flex flex-col sm:flex-row sm:items-stretch gap-3 sm:gap-0">
                <input
                  type="text"
                  placeholder="Search for jobs, companies, or locations..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="w-full px-4 py-3 rounded-md sm:rounded-l-md sm:rounded-r-none text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  onClick={onSearchSubmit}
                  className="sm:ml-0 sm:self-stretch sm:h-auto px-6 py-3 bg-blue-600 text-white rounded-md sm:rounded-r-md sm:rounded-l-none hover:bg-blue-700 transition-colors search-jobs-btn"
                  style={{width: '40%'}}
                >
                  Search Jobs
                </button>
              </div>
            )}
          </div>
          <div className="flex justify-center mt-6 md:mt-0">
            <div className="w-40 h-56 md:w-32 md:h-48 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-t-full relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-yellow-300 rounded-full"></div>
              <div className="absolute bottom-0 w-full h-32 bg-gray-700 rounded-t-lg"></div>
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-20 h-16 bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
