import { useState } from "react";
import Layout from "@/components/layout/Layout";

const JobPostingsPage = () => {
  const [jobs, setJobs] = useState([
    {
      title: "Frontend Developer",
      company: "PixelCraft Inc.",
      location: "Remote",
      description:
        "Looking for a React.js developer with experience in Tailwind CSS and TypeScript.",
    },
    {
      title: "Backend Engineer",
      company: "DataNest",
      location: "Bangalore, India",
      description:
        "Node.js and MongoDB experience required. Familiarity with RESTful APIs is a plus.",
    },
    {
      title: "UI/UX Designer",
      company: "CreativeCloud",
      location: "Mumbai, India",
      description:
        "Seeking a designer to create intuitive user interfaces using Figma and Adobe XD.",
    },
  ]);

  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
  });

  const handleChange = (e:any) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const handlePostJob = () => {
    if (newJob.title && newJob.company && newJob.location && newJob.description) {
      setJobs([...jobs, newJob]);
      setNewJob({ title: "", company: "", location: "", description: "" });
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
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white shadow-md p-5 rounded-2xl border border-gray-200"
          >
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.company} — {job.location}</p>
            <p className="mt-2 text-gray-800">{job.description}</p>
            <button className="mt-3 px-3 py-1 bg-[#7a614c] text-white rounded-xl hover:bg-[#604c3d]">
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
    </Layout>
  );
};

export default JobPostingsPage;
