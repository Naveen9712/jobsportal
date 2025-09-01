# API Configuration

This directory contains configuration files for the application.

## api.ts

The `api.ts` file contains API endpoint configurations for the Symantrix365 Job Portal API.

### Usage

```typescript
import { API_CONFIG } from '../config/api';

// Use the API configuration
const jobsUrl = API_CONFIG.JOBS_URL;
const statsUrl = API_CONFIG.STATS_URL;
const healthUrl = API_CONFIG.HEALTH_URL;
```

### Configuration Structure

- **BASE_URL**: The base URL for the API (`https://joblistings-tk6u.onrender.com`)
- **ENDPOINTS**: Object containing all API endpoint paths
- **URL Getters**: Convenient getter methods for full API URLs

### Available Endpoints

Based on the [Symantrix365 Job Portal API](https://joblistings-tk6u.onrender.com), the following endpoints are available:

- **Jobs**: `/api/jobs` - Main jobs endpoint
- **Stats**: `/api/stats` - Statistics endpoint  
- **Health**: `/api/health` - Health check endpoint

### Adding New Endpoints

To add new API endpoints:

1. Add the endpoint path to `ENDPOINTS` object
2. Add a getter method to the configuration object
3. Use the new endpoint in your components
