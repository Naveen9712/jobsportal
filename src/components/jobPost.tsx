import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Briefcase } from 'lucide-react';

const PostJobPage = () => {
  const [formData, setFormData] = useState({
    recruiterName: '',
    recruiterEmail: '',
    recruiterPhone: '',
    sharePhoneNumber: false,
    recruiterCompany: '',
    jobHeader: '',
    jobDescription: '',
    jobRoleName: '',
    jobPrimaryTechnology: '',
    jobSecondaryTechnology: '',
    jobLocationCity: '',
    jobType: '',
    jobPayRatePerHour: '',
    jobContractLength: '',
    workLocation: {
      remote: false,
      hybrid: false,
      onsite: false
    },
    visaType: '',
    jobLocationState: '',
    jobPayRateYearly: '',
    autoDeleteInDays: ''
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field.startsWith('workLocation.')) {
      const [, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        workLocation: {
          ...prev.workLocation,
          [child]: value as boolean
        }
      }));
      return;
    }

    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleWorkLocationChange = (location: 'remote' | 'hybrid' | 'onsite') => {
    setFormData(prev => ({
      ...prev,
      workLocation: {
        ...prev.workLocation,
        [location]: !prev.workLocation[location]
      }
    }));
  };

  const handleClear = () => {
    setFormData({
      recruiterName: '',
      recruiterEmail: '',
      recruiterPhone: '',
      sharePhoneNumber: false,
      recruiterCompany: '',
      jobHeader: '',
      jobDescription: '',
      jobRoleName: '',
      jobPrimaryTechnology: '',
      jobSecondaryTechnology: '',
      jobLocationCity: '',
      jobType: '',
      jobPayRatePerHour: '',
      jobContractLength: '',
      workLocation: {
        remote: false,
        hybrid: false,
        onsite: false
      },
      visaType: '',
      jobLocationState: '',
      jobPayRateYearly: '',
      autoDeleteInDays: ''
    });
  };

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'];
  const contractLengths = ['1 month', '3 months', '6 months', '1 year', '2 years', 'Permanent'];
  const visaTypes = ['US Citizen', 'Green Card', 'H1B', 'L1', 'OPT/CPT', 'TN', 'No Sponsorship'];
  const autoDeleteOptions = ['30 days', '60 days', '90 days', 'Never'];
  
  const states = [
    'Alabama - AL', 'Alaska - AK', 'Arizona - AZ', 'Arkansas - AR', 'California - CA',
    'Colorado - CO', 'Connecticut - CT', 'Delaware - DE', 'Florida - FL', 'Georgia - GA',
    'Hawaii - HI', 'Idaho - ID', 'Illinois - IL', 'Indiana - IN', 'Iowa - IA',
    'Kansas - KS', 'Kentucky - KY', 'Louisiana - LA', 'Maine - ME', 'Maryland - MD',
    'Massachusetts - MA', 'Michigan - MI', 'Minnesota - MN', 'Mississippi - MS',
    'Missouri - MO', 'Montana - MT', 'Nebraska - NE', 'Nevada - NV', 'New Hampshire - NH',
    'New Jersey - NJ', 'New Mexico - NM', 'New York - NY', 'North Carolina - NC',
    'North Dakota - ND', 'Ohio - OH', 'Oklahoma - OK', 'Oregon - OR', 'Pennsylvania - PA',
    'Rhode Island - RI', 'South Carolina - SC', 'South Dakota - SD', 'Tennessee - TN',
    'Texas - TX', 'Utah - UT', 'Vermont - VT', 'Virginia - VA', 'Washington - WA',
    'West Virginia - WV', 'Wisconsin - WI', 'Wyoming - WY'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold text-blue-600">Symantrix365</div>
              <nav className="hidden md:flex space-x-8">
                <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Search Job</Link>
                <Link to="/post-job" className="text-blue-600 font-medium">Post Job</Link>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Company</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
              </nav>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Post a Job</h1>
              <p className="text-xl text-blue-100 mb-8">
                Have a job and want job seekers to apply. Fill your job details and we will reach out to you!
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-32 h-48 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-t-full relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-yellow-300 rounded-full"></div>
                <div className="absolute bottom-0 w-full h-32 bg-gray-700 rounded-t-lg"></div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-20 h-16 bg-gray-600 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Recruiter Details */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Recruiter Details
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recruiter Name*
                </label>
                <input
                  type="text"
                  required
                  value={formData.recruiterName}
                  onChange={(e) => handleInputChange('recruiterName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recruiter Email*
                </label>
                <input
                  type="email"
                  required
                  value={formData.recruiterEmail}
                  onChange={(e) => handleInputChange('recruiterEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recruiter Phone:
                </label>
                <input
                  type="tel"
                  value={formData.recruiterPhone}
                  onChange={(e) => handleInputChange('recruiterPhone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label className="flex items-center mt-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={formData.sharePhoneNumber}
                    onChange={(e) => handleInputChange('sharePhoneNumber', e.target.checked)}
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  Share Phone Number
                </label>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recruiter Company*
              </label>
              <input
                type="text"
                required
                value={formData.recruiterCompany}
                onChange={(e) => handleInputChange('recruiterCompany', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Job Details */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
              Job Details
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Header*
                </label>
                <input
                  type="text"
                  required
                  value={formData.jobHeader}
                  onChange={(e) => handleInputChange('jobHeader', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description*
                </label>
                <div className="border border-gray-300 rounded-md">
                  <div className="bg-gray-50 px-3 py-2 border-b border-gray-300 flex items-center space-x-2 text-sm">
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      <strong>B</strong>
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">
                      <em>I</em>
                    </button>
                    <select className="px-2 py-1 border border-gray-200 rounded text-xs">
                      <option>Paragraph</option>
                      <option>Heading 1</option>
                      <option>Heading 2</option>
                    </select>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">•</button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">1.</button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">"</button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded">≡</button>
                  </div>
                  <textarea
                    required
                    value={formData.jobDescription}
                    onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                    rows={8}
                    className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Enter detailed job description..."
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Role Name*
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.jobRoleName}
                    onChange={(e) => handleInputChange('jobRoleName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Primary Technology*
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.jobPrimaryTechnology}
                    onChange={(e) => handleInputChange('jobPrimaryTechnology', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Secondary Technology:
                  </label>
                  <input
                    type="text"
                    value={formData.jobSecondaryTechnology}
                    onChange={(e) => handleInputChange('jobSecondaryTechnology', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Location City:
                  </label>
                  <input
                    type="text"
                    value={formData.jobLocationCity}
                    onChange={(e) => handleInputChange('jobLocationCity', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Type:
                  </label>
                  <select
                    value={formData.jobType}
                    onChange={(e) => handleInputChange('jobType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    {jobTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Pay Rate Per Hour ($):
                  </label>
                  <input
                    type="number"
                    value={formData.jobPayRatePerHour}
                    onChange={(e) => handleInputChange('jobPayRatePerHour', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Contract Length:
                  </label>
                  <select
                    value={formData.jobContractLength}
                    onChange={(e) => handleInputChange('jobContractLength', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    {contractLengths.map(length => (
                      <option key={length} value={length}>{length}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Work Location*
                  </label>
                  <div className="flex space-x-4 pt-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.workLocation.remote}
                        onChange={() => handleWorkLocationChange('remote')}
                        className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Remote</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.workLocation.hybrid}
                        onChange={() => handleWorkLocationChange('hybrid')}
                        className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Hybrid</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.workLocation.onsite}
                        onChange={() => handleWorkLocationChange('onsite')}
                        className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Onsite</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Visa Type:
                  </label>
                  <select
                    value={formData.visaType}
                    onChange={(e) => handleInputChange('visaType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    {visaTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Location State:
                  </label>
                  <select
                    value={formData.jobLocationState}
                    onChange={(e) => handleInputChange('jobLocationState', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Pay Rate Yearly:
                  </label>
                  <input
                    type="number"
                    value={formData.jobPayRateYearly}
                    onChange={(e) => handleInputChange('jobPayRateYearly', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Auto Delete in Days*
                </label>
                <select
                  required
                  value={formData.autoDeleteInDays}
                  onChange={(e) => handleInputChange('autoDeleteInDays', e.target.value)}
                  className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  {autoDeleteOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={handleClear}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                console.log('Job Posted:', formData);
                alert('Job posted successfully!');
              }}
              className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
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
    </div>
  );
};

export default PostJobPage;