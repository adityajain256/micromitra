import React, { useState } from "react";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";

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
  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
      // Swagger says POST / for creating a job
      const response = await api.post("/", formData);
      const data = response.data;
      if (!data) {
        alert("No data returned");
      }
      navigate("/recruiter");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to post job");
    }
  };

  return (
    <>
      <h1>Job Posting Page</h1>
      <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10 border border-gray-100">
        <form onSubmit={handlePostJob} className="flex flex-col gap-5">
          <input
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all outline-none"
            type="text"
            placeholder="Job Title"
            name="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <input
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all outline-none"
            type="text"
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <input
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all outline-none"
            type="text"
            placeholder="Salary"
            name="salary"
            value={formData.salary}
            onChange={(e) =>
              setFormData({ ...formData, salary: e.target.value })
            }
          />

          <input
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all outline-none"
            type="text"
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />

          <input
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all outline-none"
            type="file"
            placeholder="Job Picture"
            name="jobPicture"
            value={formData.jobPicture}
            onChange={(e) =>
              setFormData({ ...formData, jobPicture: e.target.value })
            }
          />

          <input
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all outline-none"
            type="text"
            placeholder="Job Status"
            name="jobStatus"
            value={formData.jobStatus}
            onChange={(e) =>
              setFormData({ ...formData, jobStatus: e.target.value })
            }
          />

          <input
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all outline-none"
            type="text"
            placeholder="PART_TIME or FULL_TIME or CONTRACT"
            name="jobType"
            value={formData.jobType}
            onChange={(e) =>
              setFormData({ ...formData, jobType: e.target.value })
            }
          />

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Post Job
          </button>
        </form>
      </div>
    </>
  );
};
