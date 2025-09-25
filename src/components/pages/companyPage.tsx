import { useState } from 'react';
import { Package, TrendingUp, Headphones, ChevronDown, ChevronRight } from 'lucide-react';
import Header from '../layout/Header';
import Hero from '../layout/Hero';
import Footer from '../layout/Footer';

const CompanyPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Is there a free trial available?",
      answer: "No, there are no free trials available as we believe we are offering straightforward solutions that make sense to your business. However, we do connect, understand your needs, and allow you a demo based on your use cases for you to have a firsthand experience of what the product offers."
    },
    {
      question: "What is the cancellation policy?",
      answer: "You can cancel your subscription at any time. We offer flexible cancellation terms and will work with you to ensure a smooth transition."
    },
    {
      question: "How do I change my account email?",
      answer: "You can change your account email through your account settings or by contacting our support team who will assist you with the process."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activePage="company" />
      
      <Hero 
        title="Simplify Business"
        subtitle="Operations with Scalable Technology"
      />

      {/* Mission and Main Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Our Mission */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                At Symantrix365, we believe that businesses perform at their best when they can focus on what they do best instead of getting bogged down by administrative tasks. Since our founding, we've been dedicated to providing software solutions that help businesses manage their workforce and clients more effectively. Our all-in-one SaaS platform brings together everything from employee timesheets to applicant tracking, vendor management, and client invoicing into a single, integrated tool.
              </p>
            </div>
            {/* Main Heading */}
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Simplify <span className="text-blue-600">Business</span>
              </h1>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Operations with
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900">
                Scalable <span className="text-blue-600">Technology</span>
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Our Vision</h2>
          <p className="text-xl text-blue-100">
            We envision a world where businesses, no matter their size, can thrive by using technology to automate and simplify complex HR, finance, and client management tasks.
          </p>
        </div>
      </section>

      {/* Why are we different Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why are we different?</h2>
            <p className="text-gray-600">
              Learn more about our differentiators from the market and why we are the best and see how we benefit your business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg p-8 shadow-sm border">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Package className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Comprehensive Feature Set</h3>
              <p className="text-gray-600">
                We don't just offer a solution for one aspect of your business. Our platform covers everything you need, from hiring and tracking to managing contractors and generating reports.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-lg p-8 shadow-sm border">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Scalability</h3>
              <p className="text-gray-600">
                Whether you're a small team or an enterprise, our platform grows with you. Scale your operations seamlessly without switching platforms.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-lg p-8 shadow-sm border">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Headphones className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Dedicated Support</h3>
              <p className="text-gray-600">
                Our support team is available 24/7 to assist you with any issues, ensuring you get the most from our platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Partners Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-gray-500 mb-6">Powering with world's best companies</p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {/* Company Logos */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded"></div>
              <span className="font-bold text-gray-700">Coinbase</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full"></div>
              <span className="font-bold text-gray-700">Spotify</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full"></div>
              <span className="font-bold text-gray-700">Spotify</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded"></div>
              <span className="font-bold text-gray-700">Dropbox</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded"></div>
              <span className="font-bold text-gray-700">Webflow</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded"></div>
              <span className="font-bold text-gray-700">Webflow</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">FAQ's</h2>
          <p className="text-gray-600 mb-8">Everything you need to know about pricing and billing</p>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg border">
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Let's get started Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Let's get started</h2>
              <p className="text-gray-600">
                Join more than 100+ consultancies who work<br />
                with Symantrix365 and find the right talent and<br />
                workforce for your clients and vendors.
              </p>
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium">
              Get Started
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CompanyPage;