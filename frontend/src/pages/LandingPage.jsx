import React from 'react';
import { Link } from 'react-router-dom';
import { UserCheck, Search } from 'lucide-react';


const LandingPage = () => {
    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                    Welcome to <span className="text-primary">Micromitra</span>
                </h1>
                <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                    Connecting talent with opportunity. Choose your role to get started.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-16 w-full max-w-4xl">
                {/* Recruiter Card */}
                <Link to="/recruiter" className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 block ring-1 ring-gray-200 hover:ring-primary/50">
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors"></div>
                    <div className="p-8 flex flex-col items-center text-center h-full">
                        <div className="p-4 bg-indigo-50 rounded-full mb-6 group-hover:bg-indigo-100 transition-colors">
                            <UserCheck className="h-12 w-12 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">I am a Recruiter</h3>
                        <p className="text-gray-500">Post jobs, manage candidates, and find the perfect match for your team.</p>
                        <div className="mt-auto pt-8 w-full">
                            <span className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-indigo-700 transition-colors shadow-sm">
                                Enter Dashboard
                            </span>
                        </div>
                    </div>
                </Link>

                {/* Job Seeker Card */}
                <Link to="/jobseeker" className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 block ring-1 ring-gray-200 hover:ring-secondary/50">
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-secondary/10 group-hover:bg-secondary/20 transition-colors"></div>
                    <div className="p-8 flex flex-col items-center text-center h-full">
                        <div className="p-4 bg-emerald-50 rounded-full mb-6 group-hover:bg-emerald-100 transition-colors">
                            <Search className="h-12 w-12 text-secondary" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">I am a Job Seeker</h3>
                        <p className="text-gray-500">Explore opportunities, apply to jobs, and advance your career path.</p>
                        <div className="mt-auto pt-8 w-full">
                            <span className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-secondary hover:bg-emerald-600 transition-colors shadow-sm">
                                Find Jobs
                            </span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;
