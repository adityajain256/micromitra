import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import RecruiterDashboard from './pages/RecruiterDashboard';
import JobSeekerDashboard from './pages/JobSeekerDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { PostJob } from './pages/PostJob';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background font-sans text-text">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/recruiter" element={<RecruiterDashboard />} />
          <Route path="/jobseeker" element={<JobSeekerDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post-job" element={<PostJob />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
