// API Configuration
export const API_CONFIG = {
  // Base WordPress REST API URL
  BASE_URL: 'https://pncreators.com/wp-json',

  // Public Job Endpoints
  JOBS: {
    CREATE: 'https://pncreators.com/wp-json/jobs/v1/create',
    LIST: 'https://pncreators.com/wp-json/jobs/v1/list',
    // Use as `${API_CONFIG.JOBS.SINGLE}/${jobId}`
    SINGLE: 'https://pncreators.com/wp-json/jobs/v1',
  },

  // Admin Endpoints
  ADMIN: {
    // Authentication
      LOGIN: 'https://trendyhomevibe.com/wp-json/admin/v1/login',
    
    // Dashboard
    DASHBOARD: 'https://trendyhomevibe.com/wp-json/admin/v1/dashboard',
    
    // Job Management
    JOBS: {
      // Get all jobs (admin view with expired jobs)
      LIST: 'https://trendyhomevibe.com/wp-json/admin/v1/jobs',
      
      // Update specific job - use as `${API_CONFIG.ADMIN.JOBS.UPDATE}/${jobId}`
      UPDATE: 'https://trendyhomevibe.com/wp-json/admin/v1/jobs',
      
      // Delete specific job - use as `${API_CONFIG.ADMIN.JOBS.DELETE}/${jobId}`
      DELETE: 'https://trendyhomevibe.com/wp-json/admin/v1/jobs',
      
      // Pin/Unpin job - use as `${API_CONFIG.ADMIN.JOBS.PIN}/${jobId}/pin`
      PIN: 'https://trendyhomevibe.com/wp-json/admin/v1/jobs',
      
      // Bulk actions
      BULK: 'https://trendyhomevibe.com/wp-json/admin/v1/jobs/bulk',
    }
  },

  // Legacy endpoints for backward compatibility
  CREATE_URL: 'https://trendyhomevibe.com/wp-json/jobs/v1/create',
  LIST_URL: 'https://trendyhomevibe.com/wp-json/jobs/v1/list',
  SINGLE_URL: 'https://trendyhomevibe.com/wp-json/jobs/v1',
} as const;

// Helper function to get auth headers
export const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};