import React, { useEffect, useState } from 'react';
import { Search, MapPin, Clock, DollarSign, Filter, Briefcase as BriefcaseIcon } from 'lucide-react';

const JobSeekerDashboard = () => {
    const [jobs, setJobs] = useState([]);


    // fetching data from server using fetch
    const fetchJobs = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No authentication token found");
            return;
        }

        try {
            const response = await fetch("http://localhost:5001/api/jobs", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    // "Cookie": "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzY5OTIzOTIxLCJleHAiOjE3NzA1Mjg3MjF9.foVTMB4bTh63N6-7vScwy6Sp853osecZqddWhH0Z15w"
                }
            });
            const data = await response.json();
            if (!data || data.length === 0) {
                alert("No jobs found");
            }
            setJobs(data.jobs || []);
            console.log(data.jobs);
        } catch (error) {
            console.error(error);
            alert("Failed to fetch jobs");
        }
    };
    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <>
            <h1>Job Seeker Dashboard</h1>
            <table className="border border-gray-300">
                <tr className="border border-gray-300">
                    <th className="border border-gray-300 p-2">Title</th>
                    <th className="border border-gray-300 p-2">Description</th>
                    <th className="border border-gray-300 p-2">Salary</th>
                    <th className="border border-gray-300 p-2">Job Status</th>
                    <th className="border border-gray-300 p-2">Job Type</th>
                    <th className="border border-gray-300 p-2">Address</th>
                </tr>
                // function for mapping all the data we get from the API
                {jobs.map(job => {
                    return (
                        <tr key={job.id} className="border border-gray-300">
                            <td className="border border-gray-300 p-2">{job.title}</td>
                            <td className="border border-gray-300 p-2">{job.description}</td>
                            <td className="border border-gray-300 p-2">{job.salary}</td>
                            <td className="border border-gray-300 p-2">{job.jobStatus}</td>
                            <td className="border border-gray-300 p-2">{job.jobType}</td>
                            <td className="border border-gray-300 p-2">{job.address}</td>
                        </tr>
                    );
                })}
            </table>
        </>
    );
};

export default JobSeekerDashboard;
