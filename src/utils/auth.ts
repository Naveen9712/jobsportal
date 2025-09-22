// Authentication utility functions for admin access

export const AuthUtils = {
    // Check if admin is authenticated
    isAuthenticated(): boolean {
      const token = localStorage.getItem('adminToken');
      const expiry = localStorage.getItem('adminTokenExpiry');
      
      if (!token || !expiry) {
        return false;
      }
      
      // Check if token is expired
      if (Date.now() > parseInt(expiry)) {
        this.logout();
        return false;
      }
      
      return true;
    },
  
    // Get admin token
    getToken(): string | null {
      return localStorage.getItem('adminToken');
    },
  
    // Get auth headers for API requests
    getAuthHeaders(): Record<string, string> {
      const token = this.getToken();
      return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      };
    },
  
    // Store authentication data
    setAuth(token: string, expiresIn: number): void {
      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminTokenExpiry', (Date.now() + expiresIn * 1000).toString());
    },
  
    // Clear authentication data
    logout(): void {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminTokenExpiry');
    },
  
    // Get token expiry time
    getTokenExpiry(): Date | null {
      const expiry = localStorage.getItem('adminTokenExpiry');
      if (!expiry) return null;
      return new Date(parseInt(expiry));
    },
  
    // Check if token expires soon (within 5 minutes)
    isTokenExpiringSoon(): boolean {
      const expiry = this.getTokenExpiry();
      if (!expiry) return true;
      
      const fiveMinutesFromNow = Date.now() + (5 * 60 * 1000);
      return expiry.getTime() < fiveMinutesFromNow;
    }
  };