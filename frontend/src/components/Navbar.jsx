import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const isLanding = location.pathname === '/';

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <Briefcase className="h-8 w-8 text-primary" />
                            <span className="text-xl font-bold text-gray-900 tracking-tight">Micromitra</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        {!isLanding && (
                            <Link to="/" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                Switch Role
                            </Link>
                        )}
                        <Link to="/login" className="text-gray-500 hover:text-primary font-medium text-sm">Log in</Link>
                        <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
