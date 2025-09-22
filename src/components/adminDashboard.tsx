import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, Clock, Pin, PinOff, Edit, Trash2, 
  LogOut, Search, ChevronLeft, ChevronRight,
  AlertCircle, TrendingUp, Calendar
} from 'lucide-react';
import { API_CONFIG, getAuthHeaders } from '../config/api';
import Header from './Header';
import Footer from './Footer';

interface Job {
  id: number;
  recruiter_name: string;
  recruiter_email: string;
  recruiter_phone: string;
  recruiter_company: string;
  job_header: string;
  job_description: string;
  job_role_name: string;
  job_primary_technology: string;
  job_secondary_technology: string;
  job_location_city: string;
  job_location_state: string;
  job_type: string;
  job_pay_rate_per_hour: number;
  job_pay_rate_yearly: number;
  job_contract_length: string;
  work_location: string[];
  visa_type: string;
  auto_delete_in_days: string;
  date_created: string;
  date_modified: string;
  status: string;
  pinned: boolean;
}

interface DashboardStats {
  total_jobs: number;
  active_jobs: number;
  expired_jobs: number;
  pinned_jobs: number;
  recent_jobs: number;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedJobs, setSelectedJobs] = useState<number[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchDashboardData();
    fetchJobs();
  }, [currentPage, searchTerm, statusFilter]);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    const expiry = localStorage.getItem('adminTokenExpiry');
    
    if (!token || !expiry || Date.now() > parseInt(expiry)) {
      handleLogout();
      return false;
    }
    return true;
  };


  const fetchDashboardData = async () => {
    try {
      console.log('Fetching dashboard from:', API_CONFIG.ADMIN.DASHBOARD);
      const response = await fetch(API_CONFIG.ADMIN.DASHBOARD, {
        headers: getAuthHeaders()
      });
      
      console.log('Dashboard response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Dashboard API response:', data);
        setStats(data.stats);
      } else {
        console.error('Dashboard API Error:', response.status);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const fetchJobs = async () => {
    setIsLoading(true);
    setError(''); // Clear any previous errors
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        per_page: '10',
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter && { status: statusFilter })
      });

      const url = `${API_CONFIG.ADMIN.JOBS.LIST}?${params}`;
      console.log('Fetching jobs from:', url);
      console.log('Auth headers:', getAuthHeaders());

      const response = await fetch(url, {
        headers: getAuthHeaders()
      });
      
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Jobs API response:', data);
        
        // Handle different possible response structures
        const jobs = data.jobs || data.data || data || [];
        const totalPages = data.pagination?.total_pages || data.total_pages || data.pages || 1;
        
        console.log('Extracted jobs:', jobs);
        console.log('Total pages:', totalPages);
        
        setJobs(Array.isArray(jobs) ? jobs : []);
        setTotalPages(totalPages);
      } else if (response.status === 401) {
        console.log('Unauthorized - redirecting to login');
        handleLogout();
      } else {
        const errorData = await response.text();
        console.error('API Error:', response.status, errorData);
        setError(`Failed to fetch jobs: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Failed to fetch jobs');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminTokenExpiry');
    navigate('/admin/login', { replace: true });
  };

  const togglePin = async (jobId: number, currentPinned: boolean) => {
    try {
      const response = await fetch(`${API_CONFIG.ADMIN.JOBS.PIN}/${jobId}/pin`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ pinned: !currentPinned })
      });
      
      if (response.ok) {
        fetchJobs();
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Error toggling pin:', error);
    }
  };

  const deleteJob = async (jobId: number) => {
    if (!confirm('Are you sure you want to delete this job?')) return;
    
    try {
      const response = await fetch(`${API_CONFIG.ADMIN.JOBS.DELETE}/${jobId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        fetchJobs();
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedJobs.length === 0) return;
    
    if (!confirm(`Are you sure you want to ${action} ${selectedJobs.length} job(s)?`)) return;
    
    try {
      const response = await fetch(API_CONFIG.ADMIN.JOBS.BULK, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          action,
          job_ids: selectedJobs
        })
      });
      
      if (response.ok) {
        setSelectedJobs([]);
        setShowBulkActions(false);
        fetchJobs();
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Error with bulk action:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatSalary = (hourly: number, yearly: number) => {
    if (yearly > 0) return `$${yearly.toLocaleString()}/year`;
    if (hourly > 0) return `$${hourly}/hour`;
    return 'Not specified';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activePage="admin" />
      
      {/* Dashboard Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage job postings and view analytics</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={fetchJobs}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Refresh Jobs
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {stats && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total_jobs}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.active_jobs}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Clock className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Expired Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.expired_jobs}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Pin className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pinned Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pinned_jobs}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Recent (7d)</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.recent_jobs}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Jobs Management Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Filters and Search */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-1 items-center space-x-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
              
              {selectedJobs.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{selectedJobs.length} selected</span>
                  <div className="relative">
                    <button
                      onClick={() => setShowBulkActions(!showBulkActions)}
                      className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                    >
                      Bulk Actions
                    </button>
                    {showBulkActions && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                        <button
                          onClick={() => handleBulkAction('delete')}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                        >
                          Delete Selected
                        </button>
                        <button
                          onClick={() => handleBulkAction('activate')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Activate Selected
                        </button>
                        <button
                          onClick={() => handleBulkAction('expire')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Expire Selected
                        </button>
                        <button
                          onClick={() => handleBulkAction('pin')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Pin Selected
                        </button>
                        <button
                          onClick={() => handleBulkAction('unpin')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Unpin Selected
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Jobs Table */}
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 mt-2">Loading jobs...</p>
              </div>
            ) : error ? (
              <div className="p-8 text-center">
                <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="text-red-600">{error}</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="p-8 text-center">
                <Briefcase className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">No jobs found</p>
                <div className="mt-4 text-sm text-gray-500">
                  <p>Debug Info:</p>
                  <p>Jobs array length: {jobs.length}</p>
                  <p>Current page: {currentPage}</p>
                  <p>Search term: "{searchTerm}"</p>
                  <p>Status filter: "{statusFilter}"</p>
                  <p>Total pages: {totalPages}</p>
                </div>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedJobs.length === jobs.length}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedJobs(jobs.map(job => job.id));
                          } else {
                            setSelectedJobs([]);
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Technology</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {jobs.map((job) => (
                    <tr key={job.id} className={job.pinned ? 'bg-yellow-50' : ''}>
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedJobs.includes(job.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedJobs([...selectedJobs, job.id]);
                            } else {
                              setSelectedJobs(selectedJobs.filter(id => id !== job.id));
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {job.pinned && <Pin className="w-4 h-4 text-yellow-500 mr-2" />}
                          <div>
                            <div className="text-sm font-medium text-gray-900">{job.job_header}</div>
                            <div className="text-sm text-gray-500">{job.job_role_name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{job.recruiter_company}</div>
                        <div className="text-sm text-gray-500">{job.recruiter_name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{job.job_primary_technology}</div>
                        {job.job_secondary_technology && (
                          <div className="text-sm text-gray-500">{job.job_secondary_technology}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {formatSalary(job.job_pay_rate_per_hour, job.job_pay_rate_yearly)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          job.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {formatDate(job.date_created)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => togglePin(job.id, job.pinned)}
                            className={`p-1 rounded hover:bg-gray-100 ${job.pinned ? 'text-yellow-600' : 'text-gray-400'}`}
                            title={job.pinned ? 'Unpin' : 'Pin'}
                          >
                            {job.pinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => {/* TODO: Implement edit functionality */}}
                            className="p-1 rounded hover:bg-gray-100 text-blue-600"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteJob(job.id)}
                            className="p-1 rounded hover:bg-gray-100 text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;