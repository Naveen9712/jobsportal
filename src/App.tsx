import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './styles/App.css';
import JobPortal from './components/symantrix365';
import PostJobPage from './components/jobPost';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<JobPortal />} />
      <Route path="/post-job" element={<PostJobPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;