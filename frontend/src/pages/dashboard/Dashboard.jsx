import React, { useEffect, useState } from "react";
import api from "../../lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, Bookmark, Briefcase, Settings, MapPin, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [profile, setProfile] = useState({});
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleGetProfile = async () => {
    try {
      const response = await api.get("/users/profile");
      const data = response.data;
      setProfile(data.message || {});
      setJobs(data.message?.recruter?.jobs?.reverse() || []);
      setApplications(data.message?.jobseeker?.applications || []);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch profile", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetProfile();
  }, []);

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary h-48 md:h-64 relative mb-16">
        <div className="absolute -bottom-12 md:-bottom-16 left-4 right-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end">
          {/* Greeting Card - Welcome Back */}
          <Card className="w-full bg-card/95 backdrop-blur shadow-lg border-primary/20 p-6 flex flex-col md:flex-row items-center md:items-start gap-6 rounded-xl">
            <div className="relative">
              {profile.picture ? (
                <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-background shadow-md">
                  <AvatarImage src={profile.picture} alt={profile.name} className="object-cover" />
                  <AvatarFallback className="text-2xl">{profile.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              ) : (
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-3xl font-bold border-4 border-background shadow-md">
                  {profile.name?.charAt(0) || "U"}
                </div>
              )}
            </div>

            <div className="flex-1 text-center md:text-left pt-2">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Welcome Back, {profile.name || "User"}!
              </h1>
              <p className="text-muted-foreground mt-1">
                {profile.role === "RECRUITER" ? "Manage your job parsings and candidates" : "Software Engineer | React Enthusiast"}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                <Link to="/edit-profile">
                  <Button variant="outline" size="sm" className="border-secondary/20 hover:bg-secondary/5 text-secondary">
                    Edit Profile
                  </Button>
                </Link>
                <Link to="/update-picture">
                  <Button variant="ghost" size="sm">Update Photo</Button>
                </Link>
              </div>
            </div>

            {/* Stats Cards (Inline for now or below) */}
            <div className="flex gap-4 md:gap-8 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-8 mt-4 md:mt-0 justify-center w-full md:w-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{profile.role === "RECRUITER" ? jobs.length : applications.length}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  {profile.role === "RECRUITER" ? "Jobs Posted" : "Applications"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">
                  {profile.role === "RECRUITER" ? applications.length : "12"} {/* Mock 'active' or use real data */}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  {profile.role === "RECRUITER" ? "Candidates" : "Active"}
                </div>
              </div>
              {/* <div className="text-center">
                <div className="text-2xl font-bold text-accent">5</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Matches</div>
              </div> */}
            </div>
          </Card>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 md:mt-32">
        {/* Main Content Tabs */}
        <Tabs defaultValue="applications" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-muted/50 p-1 rounded-lg h-auto">
              <TabsTrigger value="applications" className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2 rounded-md transition-all">
                {profile.role === "RECRUITER" ? "Your Jobs" : "Applications"}
              </TabsTrigger>
              <TabsTrigger value="saved" className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2 rounded-md transition-all">
                Saved Jobs
              </TabsTrigger>
            </TabsList>
            {profile.role === "RECRUITER" && (
              <Link to="/post-job">
                <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  <Briefcase className="w-4 h-4 mr-2" /> Post New Job
                </Button>
              </Link>
            )}
          </div>

          <TabsContent value="applications" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(profile.role === "RECRUITER" ? jobs : jobs).length > 0 ? (
                (profile.role === "RECRUITER" ? jobs : jobs).map((job) => ( /* Note: Logic might need fix if jobseeker has no 'jobs' but 'applications' */
                  <Card key={job.id || job._id} className="group hover:shadow-lg transition-all duration-300 border-border/60 hover:border-primary/50 overflow-hidden bg-white">
                    <CardHeader className="bg-muted/30 pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg font-bold text-foreground line-clamp-1">{job.title}</CardTitle>
                          <CardDescription className="flex items-center mt-1 text-xs">
                            <MapPin className="w-3 h-3 mr-1" /> {job.address || "Remote"}
                          </CardDescription>
                        </div>
                        <div className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded">
                          {job.jobType || "Full Time"}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {job.description}
                      </p>
                      <div className="flex items-center mt-4 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" /> Posted {new Date().toLocaleDateString()} {/* Mock date if missing */}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2 pb-4">
                      <Button className="w-full bg-secondary hover:bg-secondary/90 text-white group-hover:translate-y-[-2px] transition-transform">
                        {profile.role === "RECRUITER" ? "Manage Job" : "View Details"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-muted-foreground">
                  <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>No {profile.role === "RECRUITER" ? "jobs posted" : "applications found"}.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="saved">
            <div className="col-span-full py-12 text-center text-muted-foreground">
              <p>No saved jobs yet.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
