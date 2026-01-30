import React from 'react';
import { Search, MapPin, Clock, DollarSign, Filter, Briefcase as BriefcaseIcon } from 'lucide-react';

const JobSeekerDashboard = () => {
    const jobs = [
        { id: 1, title: "Senior React Developer", company: "TechCorp Inc.", location: "Remote", type: "Full-time", salary: "$120k - $150k", posted: "2 days ago" },
        { id: 2, title: "Node.js Backend Engineer", company: "StartUp Z", location: "New York, NY", type: "Contract", salary: "$80k - $100k", posted: "1 day ago" },
        { id: 3, title: "UI/UX Designer", company: "Creative Studio", location: "San Francisco, CA", type: "Full-time", salary: "$110k - $140k", posted: "3 days ago" },
        { id: 4, title: "DevOps Specialist", company: "CloudSystems", location: "Remote", type: "Full-time", salary: "$130k - $160k", posted: "Just now" },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="md:flex md:items-center md:justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Find Your Dream Job</h1>
                    <p className="text-gray-500 mt-1">Browse thousands of job openings</p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm mb-8 border border-gray-200">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-grow relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-secondary focus:border-secondary sm:text-sm transition-colors"
                            placeholder="Job title, keywords, or company"
                        />
                    </div>
                    <div className="flex-grow relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-secondary focus:border-secondary sm:text-sm transition-colors"
                            placeholder="City, state, or zip"
                        />
                    </div>
                    <button className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-secondary hover:bg-emerald-600 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary">
                        Search Jobs
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Filters Sidebar (Hidden on mobile for brevity) */}
                <div className="hidden lg:block w-64 flex-shrink-0">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Filter className="h-5 w-5 text-gray-500" />
                            <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Job Type</h4>
                                <div className="space-y-2">
                                    {['Full-time', 'Part-time', 'Contract', 'Internship'].map((type) => (
                                        <div key={type} className="flex items-center">
                                            <input id={`filter-${type}`} type="checkbox" className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded" />
                                            <label htmlFor={`filter-${type}`} className="ml-2 text-sm text-gray-600">{type}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Job List */}
                <div className="flex-1 space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Latest Opportunities</h2>
                    {jobs.map((job) => (
                        <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow group relative">
                            <div className="flex justify-between items-start">
                                <div className="flex gap-4">
                                    <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center text-secondary font-bold text-lg">
                                        {job.company.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-secondary transition-colors">{job.title}</h3>
                                        <p className="text-sm text-gray-600 font-medium">{job.company}</p>

                                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" />
                                                {job.location}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <BriefcaseIcon className="h-4 w-4" /> {/* BriefcaseIcon not imported, fixed below */}
                                                {job.type}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <DollarSign className="h-4 w-4" />
                                                {job.salary}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                        {job.posted}
                                    </span>
                                    <button className="mt-2 inline-flex items-center px-4 py-2 border border-secondary text-sm font-medium rounded-md text-secondary bg-white hover:bg-emerald-50 focus:outline-none transition-colors">
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};



export default JobSeekerDashboard;
