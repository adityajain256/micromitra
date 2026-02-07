import React from "react";
import api from "../lib/api";
import {
  Users,
  Briefcase,
  PlusCircle,
  Settings,
  UserCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RecruiterDashboard = () => {
  const [jobs, setJobs] = React.useState([]);

  React.useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/jobs/myJobs");
        setJobs(response.data.message || []);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Recruiter Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your job postings and candidates
            </p>
          </div>
          <Link to="/post-job">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 shadow-md">
              <PlusCircle className="h-5 w-5" />
              Post Job
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Stats Cards */}
          {[
            {
              label: "Active Jobs",
              value: jobs.length.toString(),
              icon: Briefcase,
              color: "text-primary bg-primary/10",
            },
            {
              label: "Total Candidates",
              value: "0", // Placeholder until applications endpoint is clear for recruiter
              icon: Users,
              color: "text-secondary bg-secondary/10",
            },
            {
              label: "Interviews",
              value: "0",
              icon: UserCheck,
              color: "text-primary bg-primary/10",
            },
            {
              label: "Settings",
              value: "Config",
              icon: Settings,
              color: "text-muted-foreground bg-muted",
            },
          ].map((stat, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow border-primary/10">
              <CardContent className="p-5">
                <div className="flex items-center">
                  <div className={`rounded-md p-3 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-muted-foreground truncate">
                        {stat.label}
                      </dt>
                      <dd className="text-2xl font-bold text-foreground mt-1">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-md border-border">
          <CardHeader className="border-b border-border bg-muted/20">
            <CardTitle className="text-lg font-medium text-foreground">
              Posted Jobs
            </CardTitle>
          </CardHeader>
          <div className="divide-y divide-border">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <div
                  key={job._id || job.id}
                  className="hover:bg-accent/5 transition-colors p-4 sm:px-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Briefcase className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground truncate">
                          {job.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{job.jobType}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${job.jobStatus === "OPEN"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                          }`}
                      >
                        {job.jobStatus}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {job.salary}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground">No jobs posted yet.</div>
            )}
          </div>
          <div className="bg-muted/20 px-4 py-4 sm:px-6 border-t border-border">
            <Button variant="link" className="text-primary p-0 h-auto font-medium">
              View all jobs &rarr;
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
