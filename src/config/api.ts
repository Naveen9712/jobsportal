// API Configuration
export const API_CONFIG = {
  // Replace with your actual WordPress domain
  BASE_URL: 'https://pncreators.com/wp-json/jobs/v1',

  // Full endpoints
  CREATE_URL: 'https://pncreators.com/wp-json/jobs/v1/create',
  LIST_URL: 'https://pncreators.com/wp-json/jobs/v1/list',
  // Use as `${API_CONFIG.SINGLE_URL}/${jobId}`
  SINGLE_URL: 'https://pncreators.com/wp-json/jobs/v1',
} as const;
