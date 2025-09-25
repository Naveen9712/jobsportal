import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './styles/App.css';
import JobPortal from './components/job/symantrix365';
import JobDetails from './components/job/JobDetails';
import PostJobPage from './components/job/jobPost';
import CompanyPage from './components/pages/companyPage';
import ContactPage from './components/pages/conatctPage';
import AdminLogin from './components/admin/adminLogin';
import AdminDashboard from './components/admin/adminDashboard';
import ProtectedRoute from './components/auth/protectedRoute';
import AdminJobUpdate from './components/admin/adminJobUpdate';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<JobPortal />} />
      <Route path="/post-job" element={<PostJobPage />} />
      <Route path="/company" element={<CompanyPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/jobs/:id/edit" 
        element={
          <ProtectedRoute>
            <AdminJobUpdate />
          </ProtectedRoute>
        } 
      />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;