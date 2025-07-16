import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, Star, ArrowRight, Smartphone, Download } from 'lucide-react';

const BoroBazarTemplate = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner */}
      <div className="bg-emerald-400 text-white py-2 px-4 text-center text-sm">
        <span>📍 Claim your online FREE Delivery or Shipping before Expires in</span>
        <span className="ml-2 bg-white text-emerald-400 px-2 py-1 rounded font-bold">09 : 51 : 11</span>
        <button className="absolute right-4 top-2 text-white hover:text-gray-200">✕</button>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-emerald-500 text-white p-2 rounded-lg font-bold text-xl">
                🛒 BoroBazar
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-emerald-600">Demos</a>
              <a href="#" className="text-gray-700 hover:text-emerald-600">Categories</a>
              <a href="#" className="text-gray-700 hover:text-emerald-600">Dietary</a>
              <a href="#" className="text-gray-700 hover:text-emerald-600">Search</a>
              <a href="#" className="text-gray-700 hover:text-emerald-600">Shops</a>
              <a href="#" className="text-gray-700 hover:text-emerald-600">Pages</a>
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm text-gray-600">English - EN</span>
              </div>
              <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-emerald-600 cursor-pointer" />
              <User className="h-6 w-6 text-gray-600 hover:text-emerald-600 cursor-pointer" />
              <button 
                className="md:hidden"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-gray-700">Demos</a>
              <a href="#" className="block px-3 py-2 text-gray-700">Categories</a>
              <a href="#" className="block px-3 py-2 text-gray-700">Dietary</a>
              <a href="#" className="block px-3 py-2 text-gray-700">Search</a>
              <a href="#" className="block px-3 py-2 text-gray-700">Shops</a>
              <a href="#" className="block px-3 py-2 text-gray-700">Pages</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-100 to-gray-200 py-20">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{
          backgroundImage: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle cx=\"20\" cy=\"20\" r=\"2\" fill=\"%23059669\"/><circle cx=\"80\" cy=\"20\" r=\"2\" fill=\"%23059669\"/><circle cx=\"20\" cy=\"80\" r=\"2\" fill=\"%23059669\"/><circle cx=\"80\" cy=\"80\" r=\"2\" fill=\"%23059669\"/></svg>')"
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Healthy vegetable that you deserve to eat fresh
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                We source and sell the very best beef, lamb and pork, sourced with the greatest care from farmer.
              </p>
              <div className="relative max-w-md">
                <input
                  type="text"
                  placeholder="What are you looking..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <Search className="absolute right-3 top-3 h-6 w-6 text-gray-400" />
              </div>
            </div>
            
            {/* Decorative vegetables */}
            <div className="hidden lg:block relative">
              <div className="w-80 h-80 rounded-full bg-white/50 flex items-center justify-center">
                <div className="text-6xl">🥕🥬🍅</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="text-4xl mb-4">🧽</div>
              <h3 className="font-semibold text-gray-900 mb-2">Spring cleaning for home appliance</h3>
              <p className="text-sm text-gray-600">Get your clean on supplies</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="text-4xl mb-4">🐕</div>
              <h3 className="font-semibold text-gray-900 mb-2">Your pet choice for fresh healthy food</h3>
              <p className="text-sm text-gray-600">Get your clean on supplies</p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg text-center">
              <div className="text-4xl mb-4">🧴</div>
              <h3 className="font-semibold text-gray-900 mb-2">Washing item with discount product</h3>
              <p className="text-sm text-gray-600">Get your clean on supplies</p>
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg text-center">
              <div className="text-4xl mb-4">🥩</div>
              <h3 className="font-semibold text-gray-900 mb-2">Fresh quality meat item with discount</h3>
              <p className="text-sm text-gray-600">Get your clean on supplies</p>
            </div>
          </div>
        </div>
      </section>

      {/* What food you love to order */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What food you love to order</h2>
          <p className="text-gray-600 mb-8">Here order your favorite foods from different categories</p>
          <div className="bg-white p-8 rounded-lg">
            <div className="text-red-500 font-semibold">Network Error</div>
          </div>
        </div>
      </section>

      {/* Best seller grocery */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Best seller grocery near you</h2>
          <p className="text-gray-600 mb-8">We provide best quality & fresh grocery items near your location</p>
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="text-red-500 font-semibold">Network Error</div>
          </div>
        </div>
      </section>

      {/* Super Discount Banner */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{
          backgroundImage: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><path d=\"M20,20 Q50,5 80,20 Q95,50 80,80 Q50,95 20,80 Q5,50 20,20\" fill=\"%23fbbf24\"/></svg>')"
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Super Discount 70% OFF</h2>
          <p className="text-lg mb-6">
            We source and sell the very best beef, lamb and pork,<br />
            sourced with the greatest care from farmer.
          </p>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold transition duration-200">
            Explore More
          </button>
        </div>
        
        {/* Decorative food images */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-4xl opacity-70">
          🍎🥖🌶️
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-4xl opacity-70">
          🥑🍋🧄
        </div>
      </section>

      {/* Popular products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular product that we sold</h2>
          <p className="text-gray-600 mb-8">We provide best quality & fresh grocery items near your location</p>
          <div className="bg-white p-8 rounded-lg">
            <div className="text-red-500 font-semibold">Network Error</div>
          </div>
        </div>
      </section>

      {/* Curated Collections */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Curated collections</h2>
            <p className="text-gray-600">We have categories the best quality grocery items</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-200">
              <div className="h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                <span className="text-6xl">🍹</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Feel the Thirst in summer anytime</h3>
                <p className="text-sm text-gray-600">Your body's way of telling you that it</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-200">
              <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                <span className="text-6xl">🍛</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Most popular item for Fast food</h3>
                <p className="text-sm text-gray-600">Tasty and spicy fast food with different</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-200">
              <div className="h-48 bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                <span className="text-6xl">🍱</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Authentic japanese food in real taste</h3>
                <p className="text-sm text-gray-600">Your body's way of telling you that it</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-200">
              <div className="h-48 bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
                <span className="text-6xl">🍽️</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Explore our family of freshest Foo...</h3>
                <p className="text-sm text-gray-600">Your pet's way of telling you that it</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Make your online shop easier with our mobile app
              </h2>
              <p className="text-gray-600 mb-8">
                BoroBazar makes online grocery shopping fast and easy. Get groceries delivered and order the best of seasonal farm fresh food.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition duration-200">
                  <div className="mr-3">
                    <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                      <span className="text-black text-xs">📱</span>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </button>
                
                <button className="flex items-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition duration-200">
                  <div className="mr-3">
                    <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                      <span className="text-black text-xs">▶️</span>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
            
            <div className="lg:w-1/2 flex justify-center">
              <div className="bg-emerald-100 rounded-full p-8">
                <div className="text-8xl">🛍️👨‍🍳</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="bg-emerald-500 text-white p-2 rounded-lg font-bold text-xl mb-4 inline-block">
                🛒 BoroBazar
              </div>
              <p className="text-gray-600 text-sm mb-4">
                We offer high-quality foods and the best delivery service, and the food market you can blindly trust
              </p>
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-sm">f</div>
                <div className="w-8 h-8 bg-blue-400 rounded flex items-center justify-center text-white text-sm">t</div>
                <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white text-sm">y</div>
              </div>
            </div>

            {/* About Us */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">About Us</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-emerald-600">About us</a></li>
                <li><a href="#" className="hover:text-emerald-600">Contact us</a></li>
                <li><a href="#" className="hover:text-emerald-600">About team</a></li>
                <li><a href="#" className="hover:text-emerald-600">Customer Support</a></li>
              </ul>
            </div>

            {/* Our Information */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Our Information</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-emerald-600">Privacy policy update</a></li>
                <li><a href="#" className="hover:text-emerald-600">Terms & conditions</a></li>
                <li><a href="#" className="hover:text-emerald-600">Return Policy</a></li>
                <li><a href="#" className="hover:text-emerald-600">Site Map</a></li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-emerald-600">Announcements</a></li>
                <li><a href="#" className="hover:text-emerald-600">Answer center</a></li>
                <li><a href="#" className="hover:text-emerald-600">Discussion boards</a></li>
                <li><a href="#" className="hover:text-emerald-600">Giving works</a></li>
              </ul>
            </div>

            {/* Subscribe */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Subscribe Now</h3>
              <p className="text-sm text-gray-600 mb-4">
                Subscribe your email for newsletter and featured news based on your interest
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-r-lg transition duration-200">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-600 mb-4 md:mb-0">
              © Copyright 2025 REGO. All rights reserved
            </div>
            <div className="flex space-x-4">
              <div className="w-8 h-5 bg-orange-500 rounded text-white text-xs flex items-center justify-center">MC</div>
              <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">V</div>
              <div className="w-8 h-5 bg-blue-800 rounded text-white text-xs flex items-center justify-center">PP</div>
              <div className="w-8 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center">S</div>
              <div className="w-8 h-5 bg-purple-600 rounded text-white text-xs flex items-center justify-center">S</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BoroBazarTemplate;