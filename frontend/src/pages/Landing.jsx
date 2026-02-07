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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const Landing = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  //   const [filterType, setFilterType] = useState("all");
  const [openSmallWindow, setOpenSmallWindow] = useState(false);

  // fetching data from server using fetch
  const fetchJobs = async () => {
    // Landing page might need to be accessible without token?
    // Swagger says /jobs has Authorization param in header? Yes.
    // So user MUST be logged in to see jobs? 
    // If Landing is public, maybe /jobs key allows public access?
    // Swagger says parameters: name: Authorization, in: header.
    // So better keep token logic.
    const token = localStorage.getItem("token");

    // if (!token) {
    //   // If landing is public, we might skip this. But if API requires it...
    //   // Let's assume public access for now as it is "Landing", but if API fails 401, we handle it.
    //   // Actually original code required token.
    //   console.error("No authentication token found");
    //   setLoading(false);
    //   return;
    // }

    try {
      setLoading(true);
      // Use api utility which handles token automatically if present.
      // But if user is NOT logged in, token is null.
      // If endpoint requires token, it will fail.
      const response = await api.get("/jobs");
      const data = response.data;
      if (data.jobs && data.jobs.length > 0) {
        setJobs(data.jobs);
      }
      console.log(data.jobs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  //   const filteredJobs = jobs
  //     .filter(
  //       (job) =>
  //         job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         job.company?.toLowerCase().includes(searchTerm.toLowerCase()),
  //     )
  //     .filter((job) => {
  //       if (filterType === "saved") return false;
  //       return true;
  //     });

  return (
    <div className={`min-h-screen bg-linear-to-br from-gray-50 to-gray-100 `}>
      {/* Header Section */}
      <div
        className={`bg-white border-b border-gray-200 sticky top-0 z-10 ${openSmallWindow ? "blur-sm" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Find Your Next Job
              </h1>
              <p className="text-gray-600 mt-1">
                Discover opportunities that match your skills
              </p>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search by job title or company..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={"default"}
                  onClick={() => { }}
                  className="gap-2"
                >
                  <Briefcase className="h-4 w-4" />
                  All Jobs
                </Button>
                {/* <Button
                  variant={filterType === "saved" ? "default" : "outline"}
                  onClick={() => setFilterType("saved")}
                  className="gap-2"
                >
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Jobs Section */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : jobs.length === 0 ? (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                No jobs found
              </h3>
              <p className="text-gray-500">
                {"Try adjusting your search criteria"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8`}>
            {/* Jobs List */}
            <div
              className={`lg:col-span-2 space-y-4 ${openSmallWindow ? "blur-sm" : ""}`}
            >
              {jobs.map((job) => (
                <Card
                  key={job._id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${selectedJob?._id === job._id ? "ring-2 ring-blue-500" : ""
                    }`}
                  onClick={() => {
                    setSelectedJob(job);
                    openSmallWindow == true
                      ? setOpenSmallWindow(false)
                      : setOpenSmallWindow(true);
                  }}
                >
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 max-sm:w-screen max-sm:h-auto">
                        {!job.picture || job.picture === "" ? (
                          <div> </div>
                        ) : (
                          // <div className="w-fit aspect-square">
                          //   <img
                          //     src={
                          //       "https://img.lb.wbmdstatic.com/vim/live/webmd/consumer_assets/site_images/articles/health_tools/healing_foods_slideshow/1800ss_getty_rf_apples.jpg?resize=750px:*&output-quality=75"
                          //     }
                          //     alt={job.title}
                          //     className="h-full w-full object-cover"
                          //   />
                          // </div>
                          <div className="w-fit aspect-square">
                            <img
                              src={job.picture}
                              alt={job.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {job.title || "Job Title"}
                          </h3>
                          {job.featured && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">{job.company}</p>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.address || "Location"}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {job.type || "Full-time"}
                          </div>
                          {job.salary && (
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              {job.salary}
                            </div>
                          )}
                        </div>

                        <p className="text-sm text-gray-600 line-clamp-2">
                          {job.description || "Job description..."}
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveJob(job._id);
                        }}
                        className="shrink-0"
                      >
                        {/* <Heart
                          className={`h-6 w-6 transition-colors ${
                            savedJobs.includes(job._id)
                              ? "fill-red-500 text-red-500"
                              : "text-gray-300 hover:text-red-500"
                          }`}
                        /> */}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Job Details Sidebar */}
            {selectedJob ? (
              <div
                className={`lg:col-span-1 max-sm:flex max-sm:justify-center max-sm:items-center `}
              >
                <Card
                  className={`sticky top-24 max-h-[calc(100vh-120px)]  overflow-y-auto max-sm:top-70   ${openSmallWindow ? "max-sm:fixed" : "max-sm:hidden"}`}
                >
                  <CardHeader>
                    <CardTitle>{selectedJob.title}</CardTitle>
                    <CardDescription>{selectedJob.company}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Key Details */}
                    <div className="space-y-4">
                      <div>
                        <Label className="text-gray-600 text-xs uppercase tracking-wider">
                          Location
                        </Label>
                        <p className="mt-1 font-medium">
                          {selectedJob.address}
                        </p>
                      </div>
                      <div>
                        <Label className="text-gray-600 text-xs uppercase tracking-wider">
                          Job Type
                        </Label>
                        <p className="mt-1 font-medium">
                          {selectedJob.jobType}
                        </p>
                      </div>
                      {selectedJob.salary && (
                        <div>
                          <Label className="text-gray-600 text-xs uppercase tracking-wider">
                            Salary
                          </Label>
                          <p className="mt-1 font-medium">
                            {selectedJob.salary}
                          </p>
                        </div>
                      )}
                    </div>

                    <Separator />

                    {/* Description */}
                    <div>
                      <Label className="text-gray-600 text-xs uppercase tracking-wider mb-3 block">
                        Description
                      </Label>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {selectedJob.description}
                      </p>
                    </div>

                    {/* Requirements */}
                    {selectedJob.requirements && (
                      <>
                        <Separator />
                        <div>
                          <Label className="text-gray-600 text-xs uppercase tracking-wider mb-3 block">
                            Requirements
                          </Label>
                          <ul className="text-sm text-gray-600 space-y-2">
                            {Array.isArray(selectedJob.requirements)
                              ? selectedJob.requirements.map((req, idx) => (
                                <li
                                  key={`${req}-${idx}`}
                                  className="flex gap-2"
                                >
                                  <span className="text-blue-500 mt-1">
                                    •
                                  </span>
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
                                      <span className="text-blue-500 mt-1">
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

                  <CardFooter className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      Apply Later
                    </Button>
                    <Button className="flex-1 gap-2">
                      Apply Now
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ) : (
              <Card className="lg:col-span-1 sticky top-24 h-fit">
                <CardContent className="pt-12 pb-12 text-center">
                  <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Select a job to view details</p>
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
