import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, DollarSign, Building2, Users, Star, Trash2 } from 'lucide-react';
import { API_CONFIG } from '../config/api';
import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';

// Filter options data
const filterOptions = {
  jobTypes: ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'] as const,
  visaTypes: ['H1B', 'H2B', 'L1', 'L2', 'E3', 'TN', 'GC', 'Citizen', 'Other'] as const,
  workLocations: ['Remote', 'Hybrid', 'Onsite'] as const,
  states: [
    { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' }, { code: 'AZ', name: 'Arizona' },
    { code: 'AR', name: 'Arkansas' }, { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' },
    { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' }, { code: 'FL', name: 'Florida' },
    { code: 'GA', name: 'Georgia' }, { code: 'HI', name: 'Hawaii' }, { code: 'ID', name: 'Idaho' },
    { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' }, { code: 'IA', name: 'Iowa' },
    { code: 'KS', name: 'Kansas' }, { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' },
    { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' }, { code: 'MA', name: 'Massachusetts' },
    { code: 'MI', name: 'Michigan' }, { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' },
    { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' }, { code: 'NE', name: 'Nebraska' },
    { code: 'NV', name: 'Nevada' }, { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' },
    { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' }, { code: 'NC', name: 'North Carolina' },
    { code: 'ND', name: 'North Dakota' }, { code: 'OH', name: 'Ohio' }, { code: 'OK', name: 'Oklahoma' },
    { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' }, { code: 'RI', name: 'Rhode Island' },
    { code: 'SC', name: 'South Carolina' }, { code: 'SD', name: 'South Dakota' }, { code: 'TN', name: 'Tennessee' },
    { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' }, { code: 'VT', name: 'Vermont' },
    { code: 'VA', name: 'Virginia' }, { code: 'WA', name: 'Washington' }, { code: 'WV', name: 'West Virginia' },
    { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' }
  ] as const
};

type JobType = (typeof filterOptions.jobTypes)[number];
type VisaType = (typeof filterOptions.visaTypes)[number];
type WorkLocation = (typeof filterOptions.workLocations)[number];
type StateCode = (typeof filterOptions.states)[number]['code'];

// Database Job interface matching the form data structure
interface DatabaseJob {
  id?: string | number; // MySQL primary key
  recruiterName: string;
  recruiterEmail: string;
  recruiterPhone: string;
  sharePhoneNumber: boolean;
  recruiterCompany: string;
  jobHeader: string;
  jobDescription: string;
  jobRoleName: string;
  jobPrimaryTechnology: string;
  jobSecondaryTechnology: string;
  jobLocationCity: string;
  jobType: string;
  jobPayRatePerHour: string; // Change to number if MySQL uses numeric type
  jobContractLength: string;
  workLocation: {
    remote: boolean;
    hybrid: boolean;
    onsite: boolean;
  };
  visaType: string;
  jobLocationState: string;
  jobPayRateYearly: string; // Change to number if MySQL uses numeric type
  autoDeleteInDays: string;
  createdAt?: string;
}

type SelectedFilters = {
  jobTypes: JobType[];
  visaTypes: VisaType[];
  workLocations: WorkLocation[];
  states: StateCode[];
};

// Transform API payload (snake_case) to UI-friendly camelCase shape
const transformJobFromApi = (apiJob: any): DatabaseJob => {
  if (!apiJob || typeof apiJob !== 'object') {
    return {} as DatabaseJob;
  }

  // Handle work_location coming as an array like ["Remote","Hybrid","Onsite"]
  const workLocationArray: string[] = Array.isArray(apiJob.work_location) ? apiJob.work_location : [];
  const workLocation = {
    remote: workLocationArray.includes('Remote'),
    hybrid: workLocationArray.includes('Hybrid'),
    onsite: workLocationArray.includes('Onsite'),
  };

  return {
    id: apiJob.id,
    recruiterName: apiJob.recruiter_name ?? '',
    recruiterEmail: apiJob.recruiter_email ?? '',
    recruiterPhone: apiJob.recruiter_phone ?? '',
    sharePhoneNumber: Boolean(apiJob.share_phone_number ?? false),
    recruiterCompany: apiJob.recruiter_company ?? '',
    jobHeader: apiJob.job_header ?? '',
    jobDescription: apiJob.job_description ?? '',
    jobRoleName: apiJob.job_role_name ?? '',
    jobPrimaryTechnology: apiJob.job_primary_technology ?? '',
    jobSecondaryTechnology: apiJob.job_secondary_technology ?? '',
    jobLocationCity: apiJob.job_location_city ?? '',
    jobType: apiJob.job_type ?? '',
    jobPayRatePerHour: String(apiJob.job_pay_rate_hourly ?? ''),
    jobContractLength: apiJob.job_contract_length ?? '',
    workLocation,
    visaType: apiJob.visa_type ?? '',
    jobLocationState: apiJob.job_location_state ?? '',
    jobPayRateYearly: String(apiJob.job_pay_rate_yearly ?? ''),
    autoDeleteInDays: apiJob.auto_delete_in_days ?? '',
    createdAt: apiJob.date_created ?? apiJob.created_at ?? undefined,
  };
};

const JobPortal = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [databaseJobs, setDatabaseJobs] = useState<DatabaseJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    jobTypes: [],
    visaTypes: [],
    workLocations: [],
    states: []
  });
  const [retryCount, setRetryCount] = useState(0);
  const [visibleCount, setVisibleCount] = useState(10);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Fetch jobs from database
  const fetchJobs = async (isRetry = false) => {
    try {
      setLoading(true);
      if (!isRetry) {
        setError(null);
        setRetryCount(0);
      }
      
      // Try requesting a higher limit so more than 10 jobs are returned (backend may default to 10)
      const url = `${API_CONFIG.LIST_URL}?limit=100`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched jobs:', data);

        // Accept either { jobs: [...] } or [...] and normalize + transform keys
        const rawJobs = Array.isArray(data) ? data : (Array.isArray(data?.jobs) ? data.jobs : []);
        const normalizedJobs: DatabaseJob[] = rawJobs.map(transformJobFromApi);
        setDatabaseJobs(normalizedJobs);
        setLastUpdated(new Date());
        // Reset visible count on new data load
        setVisibleCount(10);
      } else {
        console.error('Response not ok:', response.status, response.statusText);
        setDatabaseJobs([]);
        setError(`API Error: ${response.status} ${response.statusText}. Please check your backend server.`);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setDatabaseJobs([]);
      setError(`Network Error: ${error instanceof Error ? error.message : 'Unknown error'}. Please check your backend server.`);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchJobs(true);
  };

  useEffect(() => {
    // Ensure the component is mounted before fetching
    let mounted = true;
    
    const loadJobs = async () => {
      if (mounted) {
        await fetchJobs();
      }
    };
    
    loadJobs();
    
    return () => {
      mounted = false;
    };
  }, []);

  // Reset visible items when filters or search change
  useEffect(() => {
    setVisibleCount(10);
  }, [searchQuery, selectedFilters]);

  // Filter jobs based on selected filters and search query
  const filteredJobs = useMemo(() => {
    if (!Array.isArray(databaseJobs)) {
      return [];
    }
    
    return databaseJobs.filter((job: DatabaseJob) => {
      if (!job) return false;
      
      // Search query filter
      const matchesSearch = searchQuery === '' || 
        (job.jobHeader && job.jobHeader.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (job.recruiterCompany && job.recruiterCompany.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (job.jobLocationCity && job.jobLocationCity.toLowerCase().includes(searchQuery.toLowerCase()));

      // Job type filter
      const matchesJobType = selectedFilters.jobTypes.length === 0 || 
        (job.jobType && selectedFilters.jobTypes.includes(job.jobType as JobType));

      // Visa type filter
      const matchesVisaType = selectedFilters.visaTypes.length === 0 || 
        (job.visaType && selectedFilters.visaTypes.includes(job.visaType as VisaType));

      // Work location filter
      const matchesWorkLocation = selectedFilters.workLocations.length === 0 || 
        (job.workLocation && 
          ((job.workLocation.remote && selectedFilters.workLocations.includes('Remote')) ||
           (job.workLocation.hybrid && selectedFilters.workLocations.includes('Hybrid')) ||
           (job.workLocation.onsite && selectedFilters.workLocations.includes('Onsite'))));

      // State filter
      const matchesState = selectedFilters.states.length === 0 || 
        (job.jobLocationState && selectedFilters.states.includes(job.jobLocationState.split(' - ')[1] as StateCode));

      return matchesSearch && matchesJobType && matchesVisaType && matchesWorkLocation && matchesState;
    });
  }, [searchQuery, selectedFilters, databaseJobs]);

  const handleFilterChange = (
    filterType: 'jobTypes' | 'visaTypes' | 'workLocations' | 'states',
    value: JobType | VisaType | WorkLocation | StateCode
  ) => {
    setSelectedFilters(prev => {
      switch (filterType) {
        case 'jobTypes': {
          const v = value as JobType;
          const arr = prev.jobTypes.includes(v)
            ? prev.jobTypes.filter(x => x !== v)
            : [...prev.jobTypes, v];
          return { ...prev, jobTypes: arr };
        }
        case 'visaTypes': {
          const v = value as VisaType;
          const arr = prev.visaTypes.includes(v)
            ? prev.visaTypes.filter(x => x !== v)
            : [...prev.visaTypes, v];
          return { ...prev, visaTypes: arr };
        }
        case 'workLocations': {
          const v = value as WorkLocation;
          const arr = prev.workLocations.includes(v)
            ? prev.workLocations.filter(x => x !== v)
            : [...prev.workLocations, v];
          return { ...prev, workLocations: arr };
        }
        case 'states': {
          const v = value as StateCode;
          const arr = prev.states.includes(v)
            ? prev.states.filter(x => x !== v)
            : [...prev.states, v];
          return { ...prev, states: arr };
        }
        default:
          return prev;
      }
    });
  };

  const clearFilters = () => {
    setSelectedFilters({
      jobTypes: [],
      visaTypes: [],
      workLocations: [],
      states: []
    });
  };

  const FilterCheckbox = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) => (
    <label className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );

  const JobCard = ({ job }: { job: DatabaseJob }) => {
    if (!job) return null;
    
    return (
      <Link to={`/jobs/${job.id}`} className="block bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
        {/* Job Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{job.jobHeader || 'No Title'}</h3>
              <p className="text-blue-600 font-medium">{job.recruiterCompany || 'No Company'}</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <Star className="w-5 h-5" />
          </button>
        </div>

        {/* Job Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {job.jobLocationCity || 'No City'}, {job.jobLocationState || 'No State'}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">Contract: {job.jobContractLength || 'Not specified'}</span>
          </div>
          <div className="flex items-center text-green-600 font-medium">
            <DollarSign className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {job.jobPayRatePerHour ? `$${job.jobPayRatePerHour}/hr` : ''}
              {job.jobPayRateYearly ? `$${job.jobPayRateYearly}/year` : ''}
              {!job.jobPayRatePerHour && !job.jobPayRateYearly && 'Rate not specified'}
            </span>
          </div>
        </div>

        {/* Job Type Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            {job.jobType || 'Not specified'}
          </span>
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
            {job.visaType || 'Not specified'}
          </span>
          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
            {job.workLocation ? 
              (job.workLocation.remote ? 'Remote' : job.workLocation.hybrid ? 'Hybrid' : 'Onsite') : 
              'Not specified'
            }
          </span>
        </div>

        {/* Job Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {job.jobDescription || 'No description available'}
        </p>

        {/* Technologies */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Technologies</h4>
          <div className="text-sm text-gray-600">
            <p><strong>Primary:</strong> {job.jobPrimaryTechnology || 'Not specified'}</p>
            {job.jobSecondaryTechnology && (
              <p><strong>Secondary:</strong> {job.jobSecondaryTechnology}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
          <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors">
            Contract
          </button>
          <button className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200 transition-colors">
            <Trash2 className="w-3 h-3 inline mr-1" />
            Remove
          </button>
          <button className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-sm hover:bg-green-200 transition-colors">
            $$$/hour
          </button>
        </div>
      </Link>
    );
  };

  // Early return for critical errors
  if (error && !loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center py-12 max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">!</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Connection Issue</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          {retryCount > 0 && (
            <p className="text-sm text-gray-500 mb-4">Retry attempt: {retryCount}</p>
          )}
          <div className="space-x-3">
            <button 
              onClick={handleRetry} 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Reload Page
            </button>
          </div>
          <div className="mt-4 text-xs text-gray-500">
            <p>Make sure your backend server is running and accessible</p>
            <p>Check the browser console for more details</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activePage="search" />
      
      <Hero 
        title="Find your job"
        subtitle="Looking for a job? Search for the job that suits your need."
        showSearch={true}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={() => {}}
      />

      {/* Mobile Filters Drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsMobileFiltersOpen(false)}></div>
          <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-out">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <div className="flex items-center gap-3">
                <button 
                  onClick={clearFilters}
                  className="text-blue-600 text-sm hover:text-blue-700"
                >
                  Reset
                </button>
                <button
                  aria-label="Close filters"
                  className="p-2 rounded hover:bg-gray-100"
                  onClick={() => setIsMobileFiltersOpen(false)}
                >
                  <svg className="h-5 w-5 text-gray-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-4 overflow-x-auto">
              <div className="flex gap-4 min-w-full">
                {/* Job Type */}
                <div className="min-w-[16rem] bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Job Type</h3>
                  <div className="space-y-2">
                    {filterOptions.jobTypes.map(type => (
                      <FilterCheckbox
                        key={type}
                        label={type}
                        checked={selectedFilters.jobTypes.includes(type)}
                        onChange={() => handleFilterChange('jobTypes', type)}
                      />
                    ))}
                  </div>
                </div>
                {/* Visa Type */}
                <div className="min-w-[16rem] bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Visa Type</h3>
                  <div className="space-y-2">
                    {filterOptions.visaTypes.map(type => (
                      <FilterCheckbox
                        key={type}
                        label={type}
                        checked={selectedFilters.visaTypes.includes(type)}
                        onChange={() => handleFilterChange('visaTypes', type)}
                      />
                    ))}
                  </div>
                </div>
                {/* Work Location */}
                <div className="min-w-[16rem] bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Work Location</h3>
                  <div className="space-y-2">
                    {filterOptions.workLocations.map(location => (
                      <FilterCheckbox
                        key={location}
                        label={location}
                        checked={selectedFilters.workLocations.includes(location)}
                        onChange={() => handleFilterChange('workLocations', location)}
                      />
                    ))}
                  </div>
                </div>
                {/* States */}
                <div className="min-w-[16rem] bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Job Location States</h3>
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {filterOptions.states.map(state => (
                      <FilterCheckbox
                        key={state.code}
                        label={`${state.name} - ${state.code}`}
                        checked={selectedFilters.states.includes(state.code)}
                        onChange={() => handleFilterChange('states', state.code)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar (desktop) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button 
                  onClick={clearFilters}
                  className="text-blue-600 text-sm hover:text-blue-700"
                >
                  Reset Filter
                </button>
              </div>

              {/* Job Type Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Job Type</h3>
                <div className="space-y-2">
                  {filterOptions.jobTypes.map(type => (
                    <FilterCheckbox
                      key={type}
                      label={type}
                      checked={selectedFilters.jobTypes.includes(type)}
                      onChange={() => handleFilterChange('jobTypes', type)}
                    />
                  ))}
                </div>
              </div>

              {/* Visa Type Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Visa Type</h3>
                <div className="space-y-2">
                  {filterOptions.visaTypes.map(type => (
                    <FilterCheckbox
                      key={type}
                      label={type}
                      checked={selectedFilters.visaTypes.includes(type)}
                      onChange={() => handleFilterChange('visaTypes', type)}
                    />
                  ))}
                </div>
              </div>

              {/* Work Location Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Work Location</h3>
                <div className="space-y-2">
                  {filterOptions.workLocations.map(location => (
                    <FilterCheckbox
                      key={location}
                      label={location}
                      checked={selectedFilters.workLocations.includes(location)}
                      onChange={() => handleFilterChange('workLocations', location)}
                    />
                  ))}
                </div>
              </div>

              {/* Job Location States Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Job Location States</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {filterOptions.states.map(state => (
                    <FilterCheckbox
                      key={state.code}
                      label={`${state.name} - ${state.code}`}
                      checked={selectedFilters.states.includes(state.code)}
                      onChange={() => handleFilterChange('states', state.code)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <button 
                  className="md:hidden px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  onClick={() => setIsMobileFiltersOpen(true)}
                >
                  Filters
                </button>
                <input
                  type="text"
                  placeholder="Title, skill or company"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-40 sm:w-64"
                />
                <button className="hidden sm:inline-flex bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Find Jobs
                </button>
              </div>
              <button 
                onClick={() => fetchJobs()}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Refresh</span>
              </button>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between">
                <p className="text-gray-600">
                  Showing {Math.min(visibleCount, filteredJobs.length)} Jobs of {databaseJobs.length}
                </p>
                {lastUpdated && (
                  <p className="text-sm text-gray-500">
                    Last updated: {lastUpdated.toLocaleTimeString()}
                  </p>
                )}
              </div>
            </div>

            {/* Loading and Error States */}
            {loading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading jobs...</p>
              </div>
            )}

            {/* Job Cards */}
            {!loading && (
              <div className="space-y-6">
                {filteredJobs.length > 0 ? (
                  filteredJobs.slice(0, visibleCount).map(job => (
                    <JobCard key={job.id || `job-${Math.random()}`} job={job} />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                    <p className="text-gray-600">
                      {databaseJobs.length === 0 
                        ? 'No jobs available. Please check back later or contact support if the issue persists.'
                        : 'Try adjusting your filters or search query to see more results.'
                      }
                    </p>
                    {databaseJobs.length === 0 && (
                      <button 
                        onClick={() => fetchJobs()}
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Try Again
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Load More Button */}
            {filteredJobs.length > 0 && visibleCount < filteredJobs.length && (
              <div className="text-center mt-8">
                <button 
                  className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition-colors"
                  onClick={() => setVisibleCount(prev => Math.min(prev + 10, filteredJobs.length))}
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobPortal;