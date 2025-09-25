import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

interface HeaderProps {
  activePage?: 'search' | 'post' | 'company' | 'contact' | 'admin';
}

const Header = ({ activePage }: HeaderProps) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const resolvedActive = activePage ?? (
    location.pathname === '/' ? 'search' :
    location.pathname.startsWith('/post-job') ? 'post' :
    location.pathname.startsWith('/company') ? 'company' :
    location.pathname.startsWith('/contact') ? 'contact' :
    location.pathname.startsWith('/admin') ? 'admin' : undefined
  );
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4 md:space-x-8">
            <button
              aria-label="Open menu"
              className="md:hidden p-2 -ml-2 rounded hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
            >
              <svg className="h-6 w-6 text-gray-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <div className="text-2xl font-bold text-blue-600"><Link to="/">Symantrix365</Link></div>
            <nav className="hidden md:flex space-x-8">
              <Link 
                to="/" 
                className={`transition-colors ${
                  resolvedActive === 'search' 
                    ? 'text-blue-600 font-medium' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Search Jobs
              </Link>
              <Link 
                to="/post-job" 
                className={`transition-colors ${
                  resolvedActive === 'post' 
                    ? 'text-blue-600 font-medium' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Post Jobs
              </Link>
              <Link 
                to="/company" 
                className={`transition-colors ${
                  resolvedActive === 'company' 
                    ? 'text-blue-600 font-medium' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Company
              </Link>
              <Link 
                to="/contact" 
                className={`transition-colors ${
                  resolvedActive === 'contact' 
                    ? 'text-blue-600 font-medium' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Contact
              </Link>
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <Link 
              to="/admin/login" 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Admin SignIn
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2 border-t border-gray-200 pt-4">
              <Link 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-2 py-2 rounded transition-colors ${
                  resolvedActive === 'search' 
                    ? 'text-blue-600 font-medium bg-blue-50' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Search Jobs
              </Link>
              <Link 
                to="/post-job" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-2 py-2 rounded transition-colors ${
                  resolvedActive === 'post' 
                    ? 'text-blue-600 font-medium bg-blue-50' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Post Jobs
              </Link>
              <Link 
                to="/company" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-2 py-2 rounded transition-colors ${
                  resolvedActive === 'company' 
                    ? 'text-blue-600 font-medium bg-blue-50' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Company
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-2 py-2 rounded transition-colors ${
                  resolvedActive === 'contact' 
                    ? 'text-blue-600 font-medium bg-blue-50' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Contact
              </Link>
              <Link 
                to="/admin/login" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Admin SignIn
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
