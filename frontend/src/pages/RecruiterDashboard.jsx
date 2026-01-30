import React from 'react';
import { Users, Briefcase, PlusCircle, Settings, UserCheck } from 'lucide-react';

const RecruiterDashboard = () => {
    const candidates = [
        { id: 1, name: "Alice Johnson", role: "Frontend Developer", status: "Interviewing", applied: "2 days ago" },
        { id: 2, name: "Bob Smith", role: "Backend Engineer", status: "New", applied: "5 hours ago" },
        { id: 3, name: "Charlie Brown", role: "Product Designer", status: "Rejected", applied: "1 week ago" },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Recruiter Dashboard</h1>
                    <p className="text-gray-500 mt-1">Manage your job postings and candidates</p>
                </div>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Post New Job
                </button>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                {/* Stats Cards */}
                {[
                    { label: "Active Jobs", value: "12", icon: Briefcase, color: "text-blue-600 bg-blue-100" },
                    { label: "Total Candidates", value: "48", icon: Users, color: "text-indigo-600 bg-indigo-100" },
                    { label: "Interviews", value: "5", icon: UserCheck, color: "text-green-600 bg-green-100" }, // UserCheck not imported, fixed below
                    { label: "Settings", value: "Config", icon: Settings, color: "text-gray-600 bg-gray-100" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className={`rounded-md p-3 ${stat.color}`}>
                                        <stat.icon className="h-6 w-6" />
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">{stat.label}</dt>
                                        <dd className="text-lg font-bold text-gray-900">{stat.value}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Candidates</h3>
                </div>
                <ul className="divide-y divide-gray-200">
                    {candidates.map((candidate) => (
                        <li key={candidate.id} className="hover:bg-gray-50 transition-colors">
                            <div className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-primary font-bold">
                                            {candidate.name.charAt(0)}
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-primary truncate">{candidate.name}</p>
                                            <p className="text-sm text-gray-500">{candidate.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${candidate.status === 'New' ? 'bg-green-100 text-green-800' :
                                                candidate.status === 'Interviewing' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'}`}>
                                            {candidate.status}
                                        </span>
                                        <p className="mt-1 text-xs text-gray-500">{candidate.applied}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="bg-gray-50 px-4 py-4 sm:px-6 border-t border-gray-200">
                    <button className="text-sm font-medium text-primary hover:text-indigo-900">View all candidates &rarr;</button>
                </div>
            </div>
        </div>
    );
};



export default RecruiterDashboard;
