import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Briefcase } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const { user, token, logout } = useAuth(); // Use context

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="Micromitra Logo" className="h-8 w-8" />
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                Micromitra
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {!isLanding && (
              <Link
                to="/"
                className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Switch Role
              </Link>
            )}
            {!token ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-500 hover:text-primary font-medium text-sm"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-500 hover:text-primary font-medium text-sm"
                >
                  <Avatar>
                    <AvatarImage
                      src={user?.avatar || localStorage.getItem("userPic")} // Fallback or user prop
                      alt="@shadcn"
                      className="grayscale"
                    />
                    <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Link>
                <button
                  onClick={logout}
                  className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Log out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
