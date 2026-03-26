import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../lib/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { Alert } from "@/components/Alert";
import { socket } from "../socket";

const ManageJob = ({ socketId }) => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);
  const [alert, setAlert] = useState(null);

  console.log(job);
  useEffect(() => {
    fetchJobAndApplications();
  }, [jobId]);

  const fetchJobAndApplications = async () => {
    try {
      setLoading(true);
      setError(null);

      const jobsResponse = await api.get(`/jobs/job/${jobId}`);
      const jobs = jobsResponse.data?.job || [];
      setApplications(jobs.applications);
      setJob(jobs);
    } catch (err) {
      console.error("Error fetching job data:", err);
      setError(err.response?.data?.message || "Failed to load job details");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateApplicationStatus = async (applicationId, status) => {
    try {
      setActionLoading(applicationId);
      await api.patch(`/applications/${applicationId}/status`, { status });
      // Update local state
      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId || app.id === applicationId
            ? { ...app, status }
            : app,
        ),
      );

      setAlert({
        ok: true,
        message: `Application ${status.toLowerCase()} successfully`,
      });
      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      console.error("Error updating application status:", err);
      setAlert({
        ok: false,
        message: err.response?.data?.message || "Failed to update application",
      });
      setTimeout(() => setAlert(null), 3000);
    } finally {
      setActionLoading(null);
    }
  };

  const handleCloseJob = async () => {
    if (
      !window.confirm(
        "Are you sure you want to close this job? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      setActionLoading("close-job");
      await api.patch(`/jobs/job/${jobId}/close`, { status: "CLOSED" });

      setJob((prev) => ({ ...prev, jobStatus: "CLOSED" }));
      setAlert({ ok: true, message: "Job closed successfully" });
      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      console.error("Error closing job:", err);
      setAlert({
        ok: false,
        message: err.response?.data?.message || "Failed to close job",
      });
      setTimeout(() => setAlert(null), 3000);
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDING: {
        variant: "default",
        className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
        icon: Clock,
      },
      ACCEPTED: {
        variant: "default",
        className: "bg-green-100 text-green-800 hover:bg-green-100",
        icon: CheckCircle,
      },
      REJECTED: {
        variant: "default",
        className: "bg-red-100 text-red-800 hover:bg-red-100",
        icon: XCircle,
      },
    };

    const config = statusConfig[status] || statusConfig.PENDING;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className={`${config.className} gap-1`}>
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  const filterApplicationsByStatus = (status) => {
    return applications.filter((app) => app.status === status);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">
                Loading job details...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Card className="border-destructive">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-destructive">
                <AlertCircle className="h-6 w-6" />
                <div>
                  <h3 className="font-semibold">Error</h3>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
              <Button onClick={() => navigate("/dashboard")} className="mt-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const pendingApps = filterApplicationsByStatus("PENDING");
  const acceptedApps = filterApplicationsByStatus("ACCEPTED");
  const rejectedApps = filterApplicationsByStatus("REJECTED");

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link to="/dashboard">
            <Button variant="ghost" className="gap-2 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Manage Job</h1>
          <p className="text-muted-foreground mt-1">
            Review and manage applications for this position
          </p>
        </div>

        {/* Alert */}
        {alert && (
          <div className="mb-6">
            <Alert ok={alert.ok} message={alert.message} />
          </div>
        )}

        {/* Job Details Card */}
        <Card className="mb-8 shadow-md border-border">
          <CardHeader className="border-b border-border bg-gradient-to-r from-primary/10 to-transparent">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Briefcase className="h-6 w-6 text-primary" />
                  {job?.title}
                </CardTitle>
                <CardDescription className="mt-2 text-base">
                  {job?.description}
                </CardDescription>
              </div>
              <div className="ml-4">{getStatusBadge(job?.jobStatus)}</div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <DollarSign className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs font-medium">Salary</p>
                  <p className="text-sm font-semibold text-foreground">
                    {job?.salary || "Not specified"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs font-medium">Location</p>
                  <p className="text-sm font-semibold text-foreground">
                    {job?.address || "Not specified"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs font-medium">Applications</p>
                  <p className="text-sm font-semibold text-foreground">
                    {applications.length}
                  </p>
                </div>
              </div>
            </div>
            {job?.jobStatus === "OPEN" && (
              <div className="mt-6 pt-6 border-t border-border">
                <Button
                  variant="destructive"
                  onClick={handleCloseJob}
                  disabled={actionLoading === "close-job"}
                  className="gap-2"
                >
                  {actionLoading === "close-job" ? "Closing..." : "Close Job"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Applications Section */}
        <Card className="shadow-md border-border">
          <CardHeader className="border-b border-border bg-muted/20">
            <CardTitle className="text-lg font-medium text-foreground flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Applications ({applications.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {applications.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No applications yet</p>
                <p className="text-sm">
                  Applications will appear here once candidates apply
                </p>
              </div>
            ) : (
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="all">
                    All ({applications.length})
                  </TabsTrigger>
                  <TabsTrigger value="pending">
                    Pending ({pendingApps.length})
                  </TabsTrigger>
                  <TabsTrigger value="accepted">
                    Accepted ({acceptedApps.length})
                  </TabsTrigger>
                  <TabsTrigger value="rejected">
                    Rejected ({rejectedApps.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  <ApplicationList
                    applications={applications}
                    onUpdateStatus={handleUpdateApplicationStatus}
                    actionLoading={actionLoading}
                    getStatusBadge={getStatusBadge}
                  />
                </TabsContent>

                <TabsContent value="pending">
                  <ApplicationList
                    applications={pendingApps}
                    onUpdateStatus={handleUpdateApplicationStatus}
                    actionLoading={actionLoading}
                    getStatusBadge={getStatusBadge}
                  />
                </TabsContent>

                <TabsContent value="accepted">
                  <ApplicationList
                    applications={acceptedApps}
                    onUpdateStatus={handleUpdateApplicationStatus}
                    actionLoading={actionLoading}
                    getStatusBadge={getStatusBadge}
                  />
                </TabsContent>

                <TabsContent value="rejected">
                  <ApplicationList
                    applications={rejectedApps}
                    onUpdateStatus={handleUpdateApplicationStatus}
                    actionLoading={actionLoading}
                    getStatusBadge={getStatusBadge}
                  />
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Application List Component
const ApplicationList = ({
  applications,
  onUpdateStatus,
  actionLoading,
  getStatusBadge,
}) => {
  if (applications.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No applications in this category</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => {
        const appId = application.id;
        const applicant = application.jobSeeker.user || {};

        return (
          <Card
            key={appId}
            className="hover:shadow-md transition-shadow border-border/60"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {(applicant.name || "U").charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {applicant.name || "Unknown Applicant"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {applicant.email || "No email provided"}
                      </p>
                    </div>
                  </div>
                  {applicant.phone && (
                    <p className="text-sm text-muted-foreground ml-13">
                      Phone: {applicant.phone}
                    </p>
                  )}
                  {applicant.city && (
                    <p className="text-sm text-muted-foreground ml-13">
                      Location: {applicant.city}
                    </p>
                  )}
                  {application.createdAt && (
                    <p className="text-xs text-muted-foreground ml-13 mt-1">
                      Applied:{" "}
                      {new Date(application.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-3">
                  {getStatusBadge(application.status)}
                  {application.status === "PENDING" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="default"
                        className="bg-green-600 hover:bg-green-700 text-white gap-1"
                        onClick={() => onUpdateStatus(appId, "ACCEPTED")}
                        disabled={actionLoading === appId}
                      >
                        <CheckCircle className="h-4 w-4" />
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="gap-1"
                        onClick={() => onUpdateStatus(appId, "REJECTED")}
                        disabled={actionLoading === appId}
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ManageJob;
