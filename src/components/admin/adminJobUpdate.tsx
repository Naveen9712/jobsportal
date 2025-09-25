import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { User, Briefcase, Save, ArrowLeft, AlertCircle } from 'lucide-react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { API_CONFIG, getAuthHeaders } from '../../config/api';

interface JobFormData {
  recruiter_name: string;
  recruiter_email: string;
  recruiter_phone: string;
  share_phone_number: boolean;
  recruiter_company: string;
  job_header: string;
  job_description: string;
  job_role_name: string;
  job_primary_technology: string;
  job_secondary_technology: string;
  job_location_city: string;
  job_location_state: string;
  job_type: string;
  job_pay_rate_per_hour: string;
  job_pay_rate_yearly: string;
  job_contract_length: string;
  work_location_remote: boolean;
  work_location_hybrid: boolean;
  work_location_onsite: boolean;
  visa_type: string;
  status: string;
  auto_delete_in_days: string;
}

const AdminJobUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<JobFormData>({
    recruiter_name: '',
    recruiter_email: '',
    recruiter_phone: '',
    share_phone_number: false,
    recruiter_company: '',
    job_header: '',
    job_description: '',
    job_role_name: '',
    job_primary_technology: '',
    job_secondary_technology: '',
    job_location_city: '',
    job_location_state: '',
    job_type: '',
    job_pay_rate_per_hour: '',
    job_pay_rate_yearly: '',
    job_contract_length: '',
    work_location_remote: false,
    work_location_hybrid: false,
    work_location_onsite: false,
    visa_type: '',
    status: 'active',
    auto_delete_in_days: ''
  });

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;
      setIsLoading(true);
      setError('');
      
      try {
        // Use the single job endpoint to fetch job details
        const res = await fetch(`${API_CONFIG.BASE_URL}/jobs/v1/${id}`, {
          headers: getAuthHeaders()
        });
        
        if (!res.ok) {
          throw new Error(`Failed to load job ${id}`);
        }
        
        const job = await res.json();
        
        setFormData({
          recruiter_name: job.recruiter_name || '',
          recruiter_email: job.recruiter_email || '',
          recruiter_phone: job.recruiter_phone || '',
          share_phone_number: job.share_phone_number || false,
          recruiter_company: job.recruiter_company || '',
          job_header: job.job_header || '',
          job_description: job.job_description || '',
          job_role_name: job.job_role_name || '',
          job_primary_technology: job.job_primary_technology || '',
          job_secondary_technology: job.job_secondary_technology || '',
          job_location_city: job.job_location_city || '',
          job_location_state: job.job_location_state || '',
          job_type: job.job_type || '',
          job_pay_rate_per_hour: String(job.job_pay_rate_per_hour || ''),
          job_pay_rate_yearly: String(job.job_pay_rate_yearly || ''),
          job_contract_length: job.job_contract_length || '',
          work_location_remote: job.work_location?.includes('Remote') || false,
          work_location_hybrid: job.work_location?.includes('Hybrid') || false,
          work_location_onsite: job.work_location?.includes('Onsite') || false,
          visa_type: job.visa_type || '',
          status: job.status || 'active',
          auto_delete_in_days: String(job.auto_delete_in_days || '')
        });
      } catch (e: any) {
        setError(e.message || 'Failed to load job');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchJob();
  }, [id]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleWorkLocationChange = (location: 'work_location_remote' | 'work_location_hybrid' | 'work_location_onsite') => {
    setFormData(prev => ({
      ...prev,
      [location]: !prev[location]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    
    setIsSaving(true);
    setError('');
    
    try {
      const payload = {
        ...formData,
        job_pay_rate_per_hour: formData.job_pay_rate_per_hour ? Number(formData.job_pay_rate_per_hour) : 0,
        job_pay_rate_yearly: formData.job_pay_rate_yearly ? Number(formData.job_pay_rate_yearly) : 0,
      };

      const res = await fetch(`${API_CONFIG.ADMIN.JOBS.UPDATE}/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update job');
      }
      
      navigate('/admin/dashboard');
    } catch (e: any) {
      setError(e.message || 'Failed to update job');
    } finally {
      setIsSaving(false);
    }
  };

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'];
  const contractLengths = ['1 month', '3 months', '6 months', '1 year', '2 years', 'Permanent'];
  const visaTypes = ['US Citizen', 'Green Card', 'H1B', 'L1', 'OPT/CPT', 'TN', 'No Sponsorship'];
  const autoDeleteOptions = [
    { value: '1min', label: '1 minute (test)' },
    { value: '1', label: '1 day' },
    { value: '3', label: '3 days' },
    { value: '7', label: '7 days' },
    { value: '15', label: '15 days' },
    { value: '30', label: '30 days' }
  ];

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header activePage="admin" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading job details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activePage="admin" />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="mb-4 flex items-center text-blue-200 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Update Job Posting
          </h1>
          <p className="text-xl text-blue-100">
            Edit job details and manage posting information
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700">{error}</span>
          </div>
        </div>
      )}

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
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
                  value={formData.recruiter_name}
                  onChange={(e) => handleInputChange('recruiter_name', e.target.value)}
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
                  value={formData.recruiter_email}
                  onChange={(e) => handleInputChange('recruiter_email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recruiter Phone
                </label>
                <input
                  type="tel"
                  value={formData.recruiter_phone}
                  onChange={(e) => handleInputChange('recruiter_phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label className="flex items-center mt-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={formData.share_phone_number}
                    onChange={(e) => handleInputChange('share_phone_number', e.target.checked)}
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
                value={formData.recruiter_company}
                onChange={(e) => handleInputChange('recruiter_company', e.target.value)}
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
                  value={formData.job_header}
                  onChange={(e) => handleInputChange('job_header', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description*
                </label>
                <textarea
                  required
                  value={formData.job_description}
                  onChange={(e) => handleInputChange('job_description', e.target.value)}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Enter detailed job description..."
                />
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Role Name*
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.job_role_name}
                    onChange={(e) => handleInputChange('job_role_name', e.target.value)}
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
                    value={formData.job_primary_technology}
                    onChange={(e) => handleInputChange('job_primary_technology', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Secondary Technology
                  </label>
                  <input
                    type="text"
                    value={formData.job_secondary_technology}
                    onChange={(e) => handleInputChange('job_secondary_technology', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Location City
                  </label>
                  <input
                    type="text"
                    value={formData.job_location_city}
                    onChange={(e) => handleInputChange('job_location_city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Location State
                  </label>
                  <select
                    value={formData.job_location_state}
                    onChange={(e) => handleInputChange('job_location_state', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select State</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Type
                  </label>
                  <select
                    value={formData.job_type}
                    onChange={(e) => handleInputChange('job_type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Type</option>
                    {jobTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Pay Rate Per Hour ($)
                  </label>
                  <input
                    type="number"
                    value={formData.job_pay_rate_per_hour}
                    onChange={(e) => handleInputChange('job_pay_rate_per_hour', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Pay Rate Yearly ($)
                  </label>
                  <input
                    type="number"
                    value={formData.job_pay_rate_yearly}
                    onChange={(e) => handleInputChange('job_pay_rate_yearly', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Contract Length
                  </label>
                  <select
                    value={formData.job_contract_length}
                    onChange={(e) => handleInputChange('job_contract_length', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Length</option>
                    {contractLengths.map(length => (
                      <option key={length} value={length}>{length}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Work Location*
                  </label>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.work_location_remote}
                        onChange={() => handleWorkLocationChange('work_location_remote')}
                        className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Remote</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.work_location_hybrid}
                        onChange={() => handleWorkLocationChange('work_location_hybrid')}
                        className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Hybrid</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.work_location_onsite}
                        onChange={() => handleWorkLocationChange('work_location_onsite')}
                        className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Onsite</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Visa Type
                  </label>
                  <select
                    value={formData.visa_type}
                    onChange={(e) => handleInputChange('visa_type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Visa Type</option>
                    {visaTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Status*
                  </label>
                  <select
                    required
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Auto Delete in Days*
                  </label>
                  <select
                    required
                    value={formData.auto_delete_in_days}
                    onChange={(e) => handleInputChange('auto_delete_in_days', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Duration</option>
                    {autoDeleteOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Update Job
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default AdminJobUpdate;