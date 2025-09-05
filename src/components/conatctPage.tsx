import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    alert('Message sent successfully!');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activePage="contact" />
      
      <Hero 
        title="Get In Touch"
        subtitle="Reach out to our team to connect with you"
      />

      {/* Contact Form Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            <div className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First name*
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last name*
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Smith"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email*
                </label>
                <input
                  type="email"
                  required
                  placeholder="example@yourmail.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone*
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+885 1254 5211 552"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message*
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="Type your message here"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Send message</span>
              </button>
            </div>
          </div>

          {/* Logo/Brand Visual */}
          <div className="flex justify-center items-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-2xl">
              {/* Symantrix365 Logo Design */}
              <div className="relative">
                {/* Main curved shape resembling the wood grain pattern from original */}
                <div className="w-36 h-28 md:w-40 md:h-32 bg-gradient-to-r from-yellow-200 via-yellow-300 to-orange-300 rounded-full transform rotate-12 opacity-90 shadow-lg"></div>
                {/* Secondary shape for depth */}
                <div className="absolute -top-6 -left-6 w-20 h-20 bg-yellow-100 rounded-full opacity-80 shadow-md"></div>
                {/* Accent shape for visual interest */}
                <div className="absolute -bottom-4 -right-4 w-24 h-12 bg-orange-200 rounded-full transform -rotate-45 opacity-75 shadow-md"></div>
                {/* Additional detail shape */}
                <div className="absolute top-2 right-2 w-8 h-8 bg-yellow-400 rounded-full opacity-60"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
            <p className="text-gray-600">info@symantrix365.com</p>
            <p className="text-gray-600">support@symantrix365.com</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
            <p className="text-gray-600">+1 (555) 987-6543</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
            <p className="text-gray-600">123 Business Ave</p>
            <p className="text-gray-600">Suite 100, City, ST 12345</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;