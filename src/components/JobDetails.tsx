import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  DollarSign, 
  Building2, 
  Users, 
  Calendar,
  Code,
  Briefcase,
  Globe,
  Shield,
  FileText,
  Heart,
  Share2,
  User
} from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { API_CONFIG } from '../config/api';

interface DatabaseJob {
  id?: string | number;
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
  jobPayRatePerHour: string;
  jobContractLength: string;
  workLocation: {
    remote: boolean;
    hybrid: boolean;
    onsite: boolean;
  };
  visaType: string;
  jobLocationState: string;
  jobPayRateYearly: string;
  autoDeleteInDays: string;
  createdAt?: string;
}

const transformJobFromApi = (apiJob: any): DatabaseJob => {
  const workLocationArray: string[] = Array.isArray(apiJob?.work_location) ? apiJob.work_location : [];
  const workLocation = {
    remote: workLocationArray.includes('Remote'),
    hybrid: workLocationArray.includes('Hybrid'),
    onsite: workLocationArray.includes('Onsite'),
  };
  console.log(apiJob);

  return {
    id: apiJob?.id,
    recruiterName: apiJob?.recruiter_name ?? '',
    recruiterEmail: apiJob?.recruiter_email ?? '',
    recruiterPhone: apiJob?.recruiter_phone ?? '',
    sharePhoneNumber: Boolean(apiJob?.share_phone_number ?? true),
    recruiterCompany: apiJob?.recruiter_company ?? '',
    jobHeader: apiJob?.job_header ?? '',
    jobDescription: apiJob?.job_description ?? '',
    jobRoleName: apiJob?.job_role_name ?? '',
    jobPrimaryTechnology: apiJob?.job_primary_technology ?? '',
    jobSecondaryTechnology: apiJob?.job_secondary_technology ?? '',
    jobLocationCity: apiJob?.job_location_city ?? '',
    jobType: apiJob?.job_type ?? '',
    jobPayRatePerHour: apiJob?.job_pay_rate_per_hour ? String(apiJob.job_pay_rate_per_hour).trim() : '',
    jobContractLength: apiJob?.job_contract_length ?? '',
    workLocation,
    visaType: apiJob?.visa_type ?? '',
    jobLocationState: apiJob?.job_location_state ?? '',
    jobPayRateYearly: apiJob?.job_pay_rate_yearly ? String(apiJob.job_pay_rate_yearly).trim() : '',
    autoDeleteInDays: apiJob?.auto_delete_in_days ?? '',
    createdAt: apiJob?.date_created ?? apiJob?.created_at ?? undefined,
  };
};

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState<DatabaseJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_CONFIG.SINGLE_URL}/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        const normalized = Array.isArray(data) ? data[0] : data;
        setJob(transformJobFromApi(normalized));
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchJob();
  }, [id]);

  const workLocationLabel = useMemo(() => {
    if (!job?.workLocation) return 'Not specified';
    if (job.workLocation.remote) return 'Remote';
    if (job.workLocation.hybrid) return 'Hybrid';
    if (job.workLocation.onsite) return 'Onsite';
    return 'Not specified';
  }, [job]);

  const getWorkLocationIcon = () => {
    if (!job?.workLocation) return <Globe className="w-5 h-5 text-purple-600" />;
    if (job.workLocation.remote) return <Globe className="w-5 h-5 text-purple-600" />;
    if (job.workLocation.hybrid) return <Users className="w-5 h-5 text-purple-600" />;
    if (job.workLocation.onsite) return <Building2 className="w-5 h-5 text-purple-600" />;
    return <Globe className="w-5 h-5 text-purple-600" />;
  };

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header activePage="search" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
              <div className="h-40 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header activePage="search" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Job</h3>
            <p className="text-red-700 mb-4">{error}</p>
            <Link to="/" className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
              Back to Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!job) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activePage="search" />
      
      {/* Enhanced Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center text-blue-200 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to all jobs
            </Link>
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{job.jobHeader}</h1>
                  <p className="text-xl text-blue-200 flex items-center">
                    <Building2 className="w-5 h-5 mr-2" />
                    {job.recruiterCompany}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-blue-200">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {job.jobLocationCity}, {job.jobLocationState}
                </div>
                {job.jobType && (
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-1" />
                    {job.jobType}
                  </div>
                )}
                {job.createdAt && (
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Posted {new Date(job.createdAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleSaveJob}
                className={`p-3 rounded-lg transition-colors ${
                  isSaved 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-white/10 backdrop-blur text-white hover:bg-white/20'
                }`}
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
              </button>
              <button className="p-3 bg-white/10 backdrop-blur text-white rounded-lg hover:bg-white/20 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-blue-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Job Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Hourly Rate</p>
                  <p className="font-bold text-green-700">
                    {job.jobPayRatePerHour && job.jobPayRatePerHour.trim() !== '' ? `$${job.jobPayRatePerHour}/hr` : 'Not provided'}
                  </p>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Contract</p>
                  <p className="font-bold text-blue-700">{job.jobContractLength || 'Not specified'}</p>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    {getWorkLocationIcon()}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Work Style</p>
                  <p className="font-bold text-purple-700">{workLocationLabel}</p>
                </div>
                
                <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-orange-600" />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Visa Status</p>
                  <p className="font-bold text-orange-700">{job.visaType || 'Not specified'}</p>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-blue-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-blue-600" />
                Job Description
              </h2>
              <div className="prose max-w-none text-gray-700">
                <div className="whitespace-pre-wrap leading-relaxed text-gray-700 bg-gray-50 p-4 rounded-lg border">
                  {job.jobDescription || 'No description available'}
                </div>
              </div>
            </div>

            {/* Technologies */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-blue-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Code className="w-6 h-6 mr-3 text-blue-600" />
                Required Technologies
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Primary Technology</h3>
                  <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-medium border border-blue-200">
                    {job.jobPrimaryTechnology || 'Not specified'}
                  </span>
                </div>
                {job.jobSecondaryTechnology && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Secondary Technologies</h3>
                    <span className="inline-block bg-gray-100 text-gray-800 px-4 py-2 rounded-lg font-medium border border-gray-200">
                      {job.jobSecondaryTechnology}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            

            {/* Salary Info */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-blue-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                Compensation Details
              </h3>
              <div className="space-y-3">
                {job.jobPayRatePerHour && job.jobPayRatePerHour.trim() !== '' && (
                  <div className="flex justify-between items-center py-3 px-4 bg-green-50 rounded-lg border border-green-200">
                    <span className="text-gray-700 font-medium">Hourly Rate</span>
                    <span className="font-bold text-green-600">${job.jobPayRatePerHour}/hr</span>
                  </div>
                )}
                {job.jobPayRateYearly && job.jobPayRateYearly.trim() !== '' && (
                  <div className="flex justify-between items-center py-3 px-4 bg-green-50 rounded-lg border border-green-200">
                    <span className="text-gray-700 font-medium">Annual Salary</span>
                    <span className="font-bold text-green-600">${job.jobPayRateYearly}/year</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-3 px-4 bg-blue-50 rounded-lg border border-blue-200">
                  <span className="text-gray-700 font-medium">Job Type</span>
                  <span className="font-bold text-blue-600">{job.jobType || 'Not specified'}</span>
                </div>
              </div>
            </div>

            {/* Recruiter Info */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-blue-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Recruiter Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg border">
                  <span className="text-gray-700 font-medium">Name</span>
                  <span className="font-semibold text-gray-900">{job.recruiterName || 'Not provided'}</span>
                </div>
                <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg border">
                  <span className="text-gray-700 font-medium">Email</span>
                  <span className="font-semibold text-blue-600 truncate max-w-32" title={job.recruiterEmail}>
                    {job.recruiterEmail || 'Not provided'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg border">
                  <span className="text-gray-700 font-medium">Phone</span>
                  <span className="font-semibold text-gray-900">
                    {job.sharePhoneNumber ? (job.recruiterPhone || 'Not provided') : 'Hidden'}
                  </span>
                </div>
              </div>
            </div>

            {/* Job Tags */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-blue-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Job Tags</h3>
              <div className="flex flex-wrap gap-2">
                {job.jobType && (
                  <span className="px-3 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200">
                    {job.jobType}
                  </span>
                )}
                {job.visaType && (
                  <span className="px-3 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium border border-green-200">
                    {job.visaType}
                  </span>
                )}
                <span className="px-3 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium border border-purple-200">
                  {workLocationLabel}
                </span>
                {job.jobContractLength && (
                  <span className="px-3 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium border border-orange-200">
                    {job.jobContractLength}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JobDetails;