import React, { useEffect, useState } from "react";
import api from "../../lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, Bookmark, Briefcase, Settings } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UpdatePicture from "./UpdatePicture";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [profile, setProfile] = useState({});
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const handleGetProfile = async () => {
    try {
      const response = await api.get("/profile");
      const data = response.data;
      setProfile(data.message);
      // Optional chaining for safety
      setJobs(data.message?.recruter?.jobs || []);
      setApplications(data.message?.jobseeker?.applications || []);
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  };

  useEffect(() => {
    handleGetProfile();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
        {profile.picture == null || profile.picture == "" ? (
          <Link to="/update-picture">
            {" "}
            <Button
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-gray-200"
              variant="secondary"
              size="sm"
            >
              {" "}
              Upload image{" "}
            </Button>{" "}
          </Link>
        ) : (
          <Avatar className="w-32 h-32 md:w-40 md:h-40 border border-gray-200">
            <AvatarImage src={profile.picture} alt="@shadcn" />
            <AvatarFallback>DP</AvatarFallback>
          </Avatar>
        )}

        <div className="flex flex-col gap-4 flex-1 w-full">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <h2 className="text-xl font-medium">{profile.name}</h2>
            <div className="flex gap-2">
              <Link to="/edit-profile">
                <Button variant="secondary" size="sm">
                  Edit profile
                </Button>
              </Link>
              <Button variant="secondary" size="sm">
                View archive
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="flex justify-around md:justify-start gap-8 border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
            <div className="text-center md:text-left">
              <span className="font-bold block md:inline">
                {applications.length}
              </span>{" "}
              applications
            </div>
            <div className="text-center md:text-left">
              <span className="font-bold block md:inline">{jobs.length}</span>{" "}
              jobs
            </div>
            <div className="text-center md:text-left">
              <span className="font-bold block md:inline">185</span> following
            </div>
          </div>

          <div className="hidden md:block">
            <h1 className="font-bold">{profile.name}</h1>
            <p className="text-gray-600">
              Software Engineer | React Enthusiast
            </p>
            <p className="text-blue-900 font-medium">Open to work</p>
          </div>
        </div>
      </div>

      {/* Mobile Bio */}
      <div className="md:hidden mb-8 px-1">
        <h1 className="font-bold">{profile.name}</h1>
        <p className="text-gray-600">Software Engineer | React Enthusiast</p>
        <p className="text-blue-900 font-medium">Open to work</p>
      </div>

      <Separator className="mb-2" />

      {/* Tabs Section */}
      <Tabs defaultValue="applications" className="w-full">
        <TabsList className="w-full justify-center bg-transparent gap-8 h-12">
          <TabsTrigger
            value="applications"
            className="data-[state=active]:border-t-2 data-[state=active]:border-black data-[state=active]:text-black rounded-none h-full px-4 text-xs tracking-widest uppercase text-gray-400 gap-2 font-medium bg-transparent shadow-none"
          >
            <Grid className="w-3 h-3" /> Applications
          </TabsTrigger>
          <TabsTrigger
            value="saved"
            className="data-[state=active]:border-t-2 data-[state=active]:border-black data-[state=active]:text-black rounded-none h-full px-4 text-xs tracking-widest uppercase text-gray-400 gap-2 font-medium bg-transparent shadow-none"
          >
            <Bookmark className="w-3 h-3" /> Jobs
          </TabsTrigger>
          <TabsTrigger
            value="tagged"
            className="data-[state=active]:border-t-2 data-[state=active]:border-black data-[state=active]:text-black rounded-none h-full px-4 text-xs tracking-widest uppercase text-gray-400 gap-2 font-medium bg-transparent shadow-none"
          >
            <Briefcase className="w-3 h-3" /> Interviews
          </TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="mt-4">
          <div className="grid grid-cols-3 gap-1 md:gap-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="aspect-square bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer group relative overflow-hidden"
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-sm">{job.title}</CardTitle>
                    <CardDescription className="text-xs">
                      {job.address}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-gray-600">
                      {job.description.substring(0, 60)}...
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="jobs" className="mt-4">
          <div className="grid grid-cols-3 gap-1 md:gap-4">
            {jobs.map((post) => (
              <div
                key={post._id}
                className="aspect-square bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer border border-blue-100"
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-sm font-bold">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-xs text-gray-500">
                      {post.address}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">
                      {post.description.substring(0, 60)}...
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
