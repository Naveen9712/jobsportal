import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  activePage?: 'search' | 'post' | 'company' | 'contact';
}

const Header = ({ activePage }: HeaderProps) => {
  const location = useLocation();
  const resolvedActive = activePage ?? (
    location.pathname === '/' ? 'search' :
    location.pathname.startsWith('/post-job') ? 'post' :
    location.pathname.startsWith('/company') ? 'company' :
    location.pathname.startsWith('/contact') ? 'contact' : undefined
  );
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-bold text-blue-600">Symantrix365</div>
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
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
