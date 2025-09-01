// API Configuration
export const API_CONFIG = {
  // API Endpoints
  ENDPOINTS: {
    JOBS: '/api/jobs',
    STATS: '/api/stats',
    HEALTH: '/api/health',
  },
  
  // Use relative URLs to avoid CORS issues
  get JOBS_URL() {
    return this.ENDPOINTS.JOBS;
  },
  
  get STATS_URL() {
    return this.ENDPOINTS.STATS;
  },
  
  get HEALTH_URL() {
    return this.ENDPOINTS.HEALTH;
  },
} as const;
