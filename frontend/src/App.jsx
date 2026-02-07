import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { PostJob } from "./pages/PostJob";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import UpdatePicture from "./pages/dashboard/UpdatePicture";
import EditProfile from "./pages/dashboard/EditProfile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background font-sans text-text">
          <Navbar />
          <Routes>
            <Route path="/update-picture" element={<UpdatePicture />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/recruiter" element={<RecruiterDashboard />} />
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post-job" element={<PostJob />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
