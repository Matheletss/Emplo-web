import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";

const API_URL = "http://localhost:8000";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
}

const JobDescriptionPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleApply = async () => {
    if (!job || !token) return;
    console.log("Applying for job:", id, "by user:", user.email);
    try {
      const res = await fetch(`${API_URL}/apply/${id}/${user.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Application Failed",
          description: data.detail || "Something went wrong",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Application Successful",
        description: data.message,
      });

      setSubmitted(true);
      navigate(-1); // back to previous page
    } catch (err) {
      console.error("Apply error:", err);
      toast({
        title: "Error",
        description: "Something went wrong while applying.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      console.log("Fetching job with ID:", id);
      try {
        const response = await fetch(`${API_URL}/jobs/${id}`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const job_data = await response.json();
        setJob(job_data);
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    fetchJob();
  }, [id, token]);

  if (!job) return <p>Loading job details...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f3efe7] to-[#fcf7f0] p-8 text-[#5b4636]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Job Description</h1>

        <div className="bg-white shadow-md p-6 rounded-2xl border border-gray-200">
          <h2 className="text-2xl font-semibold mb-2">{job.title}</h2>
          <p className="text-sm text-gray-600 mb-4">
            {job.company} — {job.location}
          </p>

          <div className="text-gray-800 leading-relaxed space-y-4">
            <p>{job.description}</p>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleApply}
              className="px-4 py-2 bg-[#7a614c] text-white rounded-xl hover:bg-[#604c3d]"
              disabled={submitted}
            >
              {submitted ? "Applied" : "Submit Resume"}
            </button>

            <a
              href="/job-postings"
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-xl hover:bg-gray-400"
            >
              Back to Jobs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionPage;
