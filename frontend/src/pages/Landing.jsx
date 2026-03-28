import React, { useEffect, useState } from "react";
import api from "../lib/api";
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  ChevronRight,
  Loader2,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const Landing = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [openSmallWindow, setOpenSmallWindow] = useState(false);
  const [applied, setApplied] = useState(false);

  // fetching data from server using fetch
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await api.get("/jobs");
      const data = response.data;
      // Handle structure variations in API response
      const jobsData = data.jobs || data.message || data || [];
      setJobs(Array.isArray(jobsData) ? jobsData : []);

      if (Array.isArray(jobsData) && jobsData.length > 0) {
        setSelectedJob(jobsData[0]); // Select first job by default
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (jobId, candidateId, recruiterId) => {
    try {
      const response = await api.post(`/applications`, { jobId });
      const data = response.data;
      // socket.emit("jobApplied", {
      //   jobId,
      //   candidateId,
      //   recruiterId,
      // });
      setApplied(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Section */}
      <div
        className={`bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-20 ${openSmallWindow ? "blur-sm" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">
                Find Your Next Job
              </h1>
              <p className="text-muted-foreground mt-1">
                Discover opportunities that match your skills.
              </p>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search by job title, company, or keywords..."
                  className="pl-10 bg-background border-input focus-visible:ring-primary h-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button className="gap-2 bg-secondary hover:bg-secondary/90 text-white shadow-sm">
                  <Briefcase className="h-4 w-4" />
                  All Jobs
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 text-muted-foreground hover:text-foreground"
                >
                  <Filter className="h-4 w-4" /> Filter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Jobs Section */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : jobs.length === 0 ? (
          <Card className="border-dashed border-2">
            <CardContent className="pt-12 pb-12 text-center">
              <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No jobs found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or come back later.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Jobs List */}
            <div
              className={`lg:col-span-2 space-y-4 ${openSmallWindow ? "blur-sm" : ""}`}
            >
              {jobs.map((job) => (
                <Card
                  key={job._id || job.id}
                  className={`cursor-pointer transition-all hover:shadow-lg border-l-4 ${
                    selectedJob?._id === job._id || selectedJob?.id === job.id
                      ? "border-l-primary ring-1 ring-primary/20 bg-primary/5"
                      : "border-l-transparent hover:border-l-primary/50"
                  }`}
                  onClick={() => {
                    setSelectedJob(job);
                    setOpenSmallWindow(!openSmallWindow);
                  }}
                >
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 w-full">
                        <div className="flex gap-4">
                          {job.jobPicture && (
                            <img
                              src={job.jobPicture}
                              alt="Company Logo"
                              className="w-12 h-12 rounded-lg object-cover bg-muted"
                            />
                          )}
                          <div>
                            <h3 className="text-xl font-bold text-foreground">
                              {job.title || "Job Title"}
                            </h3>
                            <p className="text-primary font-medium text-sm">
                              {job.recruiter.user.name || "Company Name"}
                            </p>
                            <p className="text-primary font-medium text-sm">
                              {job.recruiter.user.email || "Company Name"}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-3 mb-3">
                          <div className="flex items-center gap-1 bg-background px-2 py-1 rounded border border-border">
                            <MapPin className="h-3 w-3" />
                            {job.address || "Remote"}
                          </div>
                          <div className="flex items-center gap-1 bg-background px-2 py-1 rounded border border-border">
                            <Clock className="h-3 w-3" />
                            {job.jobType || "Full-time"}
                          </div>
                          {job.salary && (
                            <div className="flex items-center gap-1 bg-background px-2 py-1 rounded border border-border">
                              <DollarSign className="h-3 w-3" />
                              {job.salary}
                            </div>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                          {job.description || "No description provided."}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Job Details Sidebar */}
            {selectedJob ? (
              <div
                className={`lg:col-span-1 border-l border-border pl-0 lg:pl-8 ${openSmallWindow ? "fixed inset-0 z-50 bg-background/50 backdrop-blur-sm p-4 flex items-center justify-center lg:static lg:bg-transparent lg:p-0 lg:block" : "hidden lg:block sticky top-24 h-fit"}`}
                onClick={() => setOpenSmallWindow(false)}
              >
                <Card
                  className={`w-full max-w-lg lg:max-w-none max-h-[85vh] overflow-y-auto shadow-xl lg:shadow-md border-primary/20 bg-card`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <CardHeader className="bg-primary/5 pb-6">
                    <CardTitle className="text-xl font-bold text-foreground">
                      {selectedJob.title}
                    </CardTitle>
                    <CardDescription className="text-primary font-medium">
                      {selectedJob.recruiter.user.name || "Company Name"}
                    </CardDescription>
                    <CardDescription className="text-primary font-medium">
                      {selectedJob.recruiter.user.email || "Company Name"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-6">
                    {/* Key Details */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/30 p-3 rounded-lg">
                        <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                          Location
                        </Label>
                        <p className="mt-1 font-medium text-foreground text-sm flex items-center gap-1">
                          <MapPin className="w-3 h-3" />{" "}
                          {selectedJob.address || "Remote"}
                        </p>
                      </div>
                      <div className="bg-muted/30 p-3 rounded-lg">
                        <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                          Type
                        </Label>
                        <p className="mt-1 font-medium text-foreground text-sm flex items-center gap-1">
                          <Clock className="w-3 h-3" />{" "}
                          {selectedJob.jobType || "Full Time"}
                        </p>
                      </div>
                      <div className="col-span-2 bg-muted/30 p-3 rounded-lg">
                        <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                          Salary
                        </Label>
                        <p className="mt-1 font-medium text-foreground text-sm flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />{" "}
                          {selectedJob.salary || "Not Disclosed"}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    {/* Description */}
                    <div>
                      <Label className="text-foreground text-sm font-bold mb-3 block">
                        Description
                      </Label>
                      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                        {selectedJob.description}
                      </p>
                    </div>

                    {/* Requirements */}
                    {selectedJob.requirements && (
                      <>
                        <Separator />
                        <div>
                          <Label className="text-foreground text-sm font-bold mb-3 block">
                            Requirements
                          </Label>
                          <ul className="text-sm text-muted-foreground space-y-2">
                            {Array.isArray(selectedJob.requirements)
                              ? selectedJob.requirements.map((req, idx) => (
                                  <li
                                    key={`${req}-${idx}`}
                                    className="flex gap-2"
                                  >
                                    <span className="text-primary mt-1">•</span>
                                    {req}
                                  </li>
                                ))
                              : typeof selectedJob.requirements === "string"
                                ? selectedJob.requirements
                                    .split("\n")
                                    .map((req, idx) => (
                                      <li
                                        key={`${req}-${idx}`}
                                        className="flex gap-2"
                                      >
                                        <span className="text-primary mt-1">
                                          •
                                        </span>
                                        {req}
                                      </li>
                                    ))
                                : null}
                          </ul>
                        </div>
                      </>
                    )}
                  </CardContent>

                  <CardFooter className="flex gap-3 pt-2 bg-muted/20 border-t border-border">
                    <Button
                      variant="outline"
                      className="flex-1 bg-background hover:bg-muted"
                      onClick={() => setOpenSmallWindow(false)}
                    >
                      Close
                    </Button>
                    <Button
                      onClick={() =>
                        handleApply(
                          selectedJob.id,
                          localStorage.getItem("profileId"),
                          selectedJob.recruiterId,
                        )
                      }
                      className="flex-1 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
                    >
                      {!applied ? "Apply Now" : "Apllied"}
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ) : (
              <Card className="lg:col-span-1 sticky top-24 h-fit hidden lg:block bg-muted/20 border-dashed">
                <CardContent className="pt-12 pb-12 text-center">
                  <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">
                    Select a job to view details
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;
