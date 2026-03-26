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
import { UpdatePicture } from "./pages/dashboard/UpdatePicture";
import EditProfile from "./pages/dashboard/EditProfile";
import Jobs from "./pages/jobs/Jobs";
import ManageJob from "./pages/ManageJob";
import { socket } from "./socket";
import { Alert } from "./components/Alert";

function App({ userId }) {
  const [socketId, setSocketId] = React.useState("");
  const [alert, setAlert] = React.useState(null);

  React.useEffect(() => {
    socket.emit("registerUser", userId);
    socket.on("applicationUpdate", (data) => {
      alert(`Your application was ${data.status}`);
    });

    return () => socket.off("applicationUpdate");
  }, [userId]);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background font-sans text-text">
          <Navbar />

          <Routes>
            <Route path="/update-picture" element={<UpdatePicture />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/recruiter" element={<RecruiterDashboard />} /> */}
            <Route
              path="/manage-job/:jobId"
              element={<ManageJob socketId={socketId} />}
            />
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
