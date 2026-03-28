import React, { useEffect, useState } from "react";
import api from "../../lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Clock, Briefcase, Filter } from "lucide-react";
import { Loader2 } from "lucide-react";

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("ALL"); // ALL, FULL_TIME, PART_TIME, CONTRACT

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const response = await api.get("/jobs");
            // Assuming response.data is array or response.data.message is array
            const data = response.data.message || response.data || [];
            setJobs(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch jobs", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter((job) => {
        const matchesSearch = job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.address?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === "ALL" || job.jobType === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header & Search */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Find Your Dream Job</h1>
                        <p className="text-muted-foreground mt-1">Browse open positions and apply today.</p>
                    </div>

                    <div className="flex w-full md:w-auto gap-2">
                        <div className="relative w-full md:w-80">
                            <Input
                                placeholder="Search jobs, skills, or location..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-white border-primary/20 focus-visible:ring-primary"
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        </div>
                        {/* Simple Filter Dropdown Mockup */}
                        <Button variant="outline" className="border-primary/20 text-secondary hidden sm:flex gap-2">
                            <Filter className="w-4 h-4" /> Filter
                        </Button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job) => (
                                <Card
                                    key={job._id || job.id}
                                    className="group overflow-hidden border border-primary/20 bg-[#FBF9F1] hover:shadow-[0_0_20px_rgba(47,166,160,0.15)] hover:-translate-y-1 transition-all duration-300 rounded-xl flex flex-col"
                                >
                                    {/* Image / Header Area */}
                                    <div className="h-48 bg-secondary/5 relative flex items-center justify-center overflow-hidden">
                                        {job.jobPicture ? (
                                            <img src={job.jobPicture} alt={job.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        ) : (
                                            <Briefcase className="w-16 h-16 text-primary/20" />
                                        )}
                                        <Badge className="absolute top-4 right-4 bg-white/90 text-primary hover:bg-white border-none shadow-sm backdrop-blur-sm">
                                            {job.jobType || "Full Time"}
                                        </Badge>
                                    </div>

                                    <CardContent className="pt-6 flex-grow">
                                        <h3 className="text-xl font-bold text-secondary mb-2 line-clamp-1">{job.title}</h3>
                                        <div className="flex items-center text-xs text-muted-foreground mb-4 gap-4">
                                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.address || "Remote"}</span>
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 2 days ago</span>
                                        </div>
                                        <p className="text-sm text-foreground/80 line-clamp-3 leading-relaxed">
                                            {job.description}
                                        </p>
                                    </CardContent>

                                    <CardFooter className="pb-6 pt-2">
                                        <Button className="w-full bg-secondary hover:bg-secondary/90 text-white shadow-md hover:shadow-lg transition-all rounded-lg font-medium tracking-wide">
                                            Apply Now
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20">
                                <p className="text-lg text-muted-foreground">No jobs found matching your criteria.</p>
                                <Button variant="link" onClick={() => { setSearchTerm(""); setFilter("ALL") }} className="text-primary mt-2">
                                    Clear filters
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Jobs;
