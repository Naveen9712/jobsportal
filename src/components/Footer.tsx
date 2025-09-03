const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="text-2xl font-bold text-blue-600">Symantrix365</div>
          <div className="flex space-x-8 text-sm text-gray-600">
            <a href="#" className="hover:text-blue-600 transition-colors">Overview</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Feature</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Help</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
          </div>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <p>© 2025 Symantrix365. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of service</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Legal notice</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


