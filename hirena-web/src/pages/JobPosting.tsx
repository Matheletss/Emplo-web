import { useEffect, useState, ChangeEvent } from "react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";

// TypeScript Interfaces
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
}

interface NewJob {
  title: string;
  company: string;
  location: string;
  description: string;
}

// API base URL
const API_URL = "http://localhost:8000"; // update this as needed

const JobPostingsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [newJob, setNewJob] = useState<NewJob>({
    title: "",
    company: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`${API_URL}/jobs`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const handlePostJob = async () => {
    const { title, company, location, description } = newJob;
    if (!title || !company || !location || !description) return;

    try {
      const response = await fetch(`${API_URL}/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob),
      });

      if (response.ok) {
        const data: Job = await response.json();
        setJobs([...jobs, data]);
        setNewJob({ title: "", company: "", location: "", description: "" });
      }
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  const handleDeleteJob = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/jobs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setJobs(jobs.filter((job) => job.id !== id));
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-[#f3efe7] to-[#fcf7f0] p-8 text-[#5b4636]">
        <h1 className="text-4xl font-bold mb-6 text-center">Job Postings</h1>

        <div className="bg-white shadow-xl rounded-2xl p-6 mb-10 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Post a New Job</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="p-2 border rounded-xl"
              placeholder="Job Title"
              name="title"
              value={newJob.title}
              onChange={handleChange}
            />
            <input
              className="p-2 border rounded-xl"
              placeholder="Company Name"
              name="company"
              value={newJob.company}
              onChange={handleChange}
            />
            <input
              className="p-2 border rounded-xl"
              placeholder="Location"
              name="location"
              value={newJob.location}
              onChange={handleChange}
            />
            <input
              className="p-2 border rounded-xl col-span-full"
              placeholder="Short Description"
              name="description"
              value={newJob.description}
              onChange={handleChange}
            />
          </div>
          <button
            onClick={handlePostJob}
            className="mt-4 px-4 py-2 bg-[#7a614c] text-white rounded-xl hover:bg-[#604c3d]"
          >
            Post Job
          </button>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow-md p-5 rounded-2xl border border-gray-200"
            >
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="text-sm text-gray-600">
                {job.company} — {job.location}
              </p>
              <p className="mt-2 text-gray-800">{job.description}</p>

              <div className="flex gap-4 mt-3">
                <Link
                  to="/apply"
                  className="px-3 py-1 bg-[#7a614c] text-white rounded-xl hover:bg-[#604c3d]"
                >
                  Apply
                </Link>
                <button
                  onClick={() => handleDeleteJob(job.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-xl hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default JobPostingsPage;



