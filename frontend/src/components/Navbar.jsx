import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Handshake, User, Settings, LogOut, LayoutDashboard, Briefcase, FileText, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "../context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import logo from "/logo.png";

const Navbar = () => {
  const location = useLocation();
  const { user, token, logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary transition-colors";
  };

  return (
    <nav className="bg-background shadow-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-colors">
                <img src={logo} alt="logo" className="h-9 w-9" />
              </div>
              <span className="text-xl font-bold text-foreground tracking-tight">
                Micromitra
              </span>
            </Link>
          </div>

          {/* Middle: Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/dashboard" className={`text-sm font-medium flex items-center gap-1 ${isActive('/dashboard')}`}>
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Link>
            {/* <Link to="/jobs" className={`text-sm font-medium flex items-center gap-1 ${isActive('/jobs')}`}>
              <Briefcase className="w-4 h-4" /> Jobs
            </Link> */}
            {/* <Link to="/my-jobs" className={`text-sm font-medium flex items-center gap-1 ${isActive('/my-jobs')}`}>
              <FileText className="w-4 h-4" /> My Jobs
            </Link> */}
            {/* <Link to="/recruiters" className={`text-sm font-medium flex items-center gap-1 ${isActive('/recruiters')}`}>
              <Users className="w-4 h-4" /> Recruiters
            </Link> */}
            {/* <Link to="/applications" className={`text-sm font-medium flex items-center gap-1 ${isActive('/applications')}`}>
              <FileText className="w-4 h-4" /> Applications
            </Link> */}
          </div>

          {/* Right: Profile & Actions */}
          <div className="flex items-center gap-4">
            {!token ? (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="ghost" className="text-muted-foreground hover:text-primary">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Sign up</Button>
                </Link>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-primary/20 hover:border-primary transition-colors">
                      <AvatarImage src={user?.avatar || localStorage.getItem("profile")} alt={user?.name} className="object-cover" />
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        {user?.message?.name || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.message?.name || "User"}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.message?.email || "user@example.com"}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/edit-profile" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
