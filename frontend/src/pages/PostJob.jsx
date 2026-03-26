import React, { useState } from "react";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Briefcase, MapPin, DollarSign, FileText } from "lucide-react";

export const PostJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    salary: "",
    address: "",
    jobPicture: "",
    jobStatus: "OPEN",
    jobType: "",
  });
  const [loading, setLoading] = useState(false);

  const handlePostJob = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Swagger says POST / for creating a job
      const response = await api.post("/jobs/", formData);
      const data = response.data;
      if (!data) {
        alert("No data returned");
      }
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <Card className="w-full max-w-3xl shadow-lg border-border/60">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent border-b border-border/40 pb-6">
          <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Briefcase className="text-primary h-6 w-6" /> Post a New Job
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Create a new job listing to find the perfect candidate.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8">
          <form onSubmit={handlePostJob} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-secondary font-medium">
                  Job Title
                </Label>
                <div className="relative">
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g. Senior React Developer"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="pl-10 focus-visible:ring-primary"
                  />
                  <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobType" className="text-secondary font-medium">
                  Job Type
                </Label>
                <Input
                  id="jobType"
                  name="jobType"
                  placeholder="FULL_TIME, PART_TIME, CONTRACT"
                  value={formData.jobType}
                  onChange={handleChange}
                  required
                  className="focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-2 col-span-1 md:col-span-2">
                <Label
                  htmlFor="description"
                  className="text-secondary font-medium"
                >
                  Description
                </Label>
                <div className="relative">
                  <Input
                    as="textarea"
                    id="description"
                    name="description"
                    placeholder="Describe the role responsibilities and requirements..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="min-h-[120px] py-3 pl-3 focus-visible:ring-primary"
                    style={{ height: "auto" }} // Hack if Input component allows textarea styling or use native textarea
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary" className="text-secondary font-medium">
                  Salary
                </Label>
                <div className="relative">
                  <Input
                    id="salary"
                    name="salary"
                    placeholder="e.g. $120k - $150k"
                    value={formData.salary}
                    onChange={handleChange}
                    className="pl-10 focus-visible:ring-primary"
                  />
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-secondary font-medium">
                  Location
                </Label>
                <div className="relative">
                  <Input
                    id="address"
                    name="address"
                    placeholder="e.g. San Francisco, CA"
                    value={formData.address}
                    onChange={handleChange}
                    className="pl-10 focus-visible:ring-primary"
                  />
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="jobPicture"
                  className="text-secondary font-medium"
                >
                  Job Image URL
                </Label>
                <Input
                  id="jobPicture"
                  type="text" // Using text for URL as per original, can be file input if changed but API expects string?
                  name="jobPicture"
                  placeholder="https://..."
                  value={formData.jobPicture}
                  onChange={handleChange}
                  className="focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="jobStatus"
                  className="text-secondary font-medium"
                >
                  Status
                </Label>
                <Input
                  id="jobStatus"
                  name="jobStatus"
                  placeholder="OPEN or CLOSED"
                  value={formData.jobStatus}
                  onChange={handleChange}
                  className="focus-visible:ring-primary"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full h-12 text-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-all shadow-md hover:shadow-lg"
                disabled={loading}
              >
                {loading ? "Posting..." : "Create Job Listing"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
