import { useState, useMemo } from 'react';
import { MapPin, Clock, DollarSign, Building2, Users, Star, Trash2 } from 'lucide-react';
import { jobsData, filterOptions, type Job } from '../jobsData';

type JobType = (typeof filterOptions.jobTypes)[number];
type VisaType = (typeof filterOptions.visaTypes)[number];
type WorkLocation = (typeof filterOptions.workLocations)[number];
type StateCode = (typeof filterOptions.states)[number]['code'];

type SelectedFilters = {
  jobTypes: JobType[];
  visaTypes: VisaType[];
  workLocations: WorkLocation[];
  states: StateCode[];
};



const JobPortal = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    jobTypes: [],
    visaTypes: [],
    workLocations: [],
    states: []
  });

  // Filter jobs based on selected filters and search query
  const filteredJobs = useMemo(() => {
    return jobsData.filter((job: Job) => {
      // Search query filter
      const matchesSearch = searchQuery === '' || 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());

      // Job type filter
      const matchesJobType = selectedFilters.jobTypes.length === 0 || 
        selectedFilters.jobTypes.includes(job.jobType as JobType);

      // Visa type filter
      const matchesVisaType = selectedFilters.visaTypes.length === 0 || 
        selectedFilters.visaTypes.includes(job.visaType as VisaType);

      // Work location filter
      const matchesWorkLocation = selectedFilters.workLocations.length === 0 || 
        selectedFilters.workLocations.includes(job.workLocation as WorkLocation);

      // State filter
      const matchesState = selectedFilters.states.length === 0 || 
        selectedFilters.states.includes(job.state as StateCode);

      return matchesSearch && matchesJobType && matchesVisaType && matchesWorkLocation && matchesState;
    });
  }, [searchQuery, selectedFilters]);

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

  const JobCard = ({ job }: { job: Job }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Job Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">{job.title}</h3>
            <p className="text-blue-600 font-medium">{job.company}</p>
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
          <span className="text-sm">{job.location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span className="text-sm">Experience: {job.experienceYears}</span>
        </div>
        <div className="flex items-center text-green-600 font-medium">
          <DollarSign className="w-4 h-4 mr-2" />
          <span className="text-sm">{job.salaryRange}</span>
        </div>
      </div>

      {/* Job Type Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
          {job.jobType}
        </span>
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
          {job.visaType}
        </span>
        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
          {job.workLocation}
        </span>
      </div>

      {/* Job Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{job.description}</p>

      {/* Key Responsibilities */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Key Responsibilities</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          {job.keyResponsibilities.map((responsibility, index) => (
            <li key={index}>• {responsibility}</li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
        <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors">
          Apply
        </button>
        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors">
          Save
        </button>
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
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold text-blue-600">Symantrix365</div>
              <nav className="hidden md:flex space-x-8">
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Search Jobs</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Post Jobs</a>
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Find your job</h1>
              <p className="text-xl text-blue-100 mb-8">
                Looking for a job? Search for the job that suits your need.
              </p>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your email"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 rounded-l-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-0 top-0 h-full px-6 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors">
                  Get Started
                </button>
              </div>
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
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
                <input
                  type="text"
                  placeholder="Title, skill or company"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Find Jobs
                </button>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-600">
                Showing {filteredJobs.length} Jobs of {jobsData.length}
              </p>
            </div>

            {/* Job Cards */}
            <div className="space-y-6">
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))
              ) : (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                  <p className="text-gray-600">Try adjusting your filters or search query to see more results.</p>
                </div>
              )}
            </div>

            {/* Load More Button */}
            {filteredJobs.length > 0 && (
              <div className="text-center mt-8">
                <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition-colors">
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPortal;