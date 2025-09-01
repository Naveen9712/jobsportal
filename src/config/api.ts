// API Configuration
export const API_CONFIG = {
  // Base URL for the API
  BASE_URL: 'https://joblistings-tk6u.onrender.com',
  
  // API Endpoints
  ENDPOINTS: {
    JOBS: '/api/jobs',
    STATS: '/api/stats',
    HEALTH: '/api/health',
  },
  
  // Full API URLs
  get JOBS_URL() {
    return `${this.BASE_URL}${this.ENDPOINTS.JOBS}`;
  },
  
  get STATS_URL() {
    return `${this.BASE_URL}${this.ENDPOINTS.STATS}`;
  },
  
  get HEALTH_URL() {
    return `${this.BASE_URL}${this.ENDPOINTS.HEALTH}`;
  },
} as const;
