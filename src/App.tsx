import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './styles/App.css';
import JobPortal from './components/symantrix365';
import JobDetails from './components/JobDetails';
import PostJobPage from './components/jobPost';
import CompanyPage from './components/companyPage';
import ContactPage from './components/conatctPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<JobPortal />} />
      <Route path="/post-job" element={<PostJobPage />} />
      <Route path="/company" element={<CompanyPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;