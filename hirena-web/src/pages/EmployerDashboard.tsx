import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EmployerDashboard = () => {
  const [jobs] = useState([
    {
      id: 1,
      title: "HR Intern",
      company: "Ketto",
      location: "Mumbai",
      description: "At Ketto, we don’t just work; we create impact! As Asia's largest tech-enabled crowdfunding platform, we’re on a mission to make Healthcare for All a reality. With a valuation exceeding $100 million and over ₹1,100 crores raised from 60+ lakh donors, we’ve changed the lives of 2+ lakh campaigners. We’re scaling new heights, and this is your chance to be part of a thriving organization where your work contributes to making the world a better place.",
      applicants: 1,
    },
    {
      id: 2,
      title: "Data Analyst",
      company: "Ketto",
      location: "Mumbai",
      description: "At Ketto, we don’t just work; we create impact! As Asia's largest tech-enabled crowdfunding platform, we’re on a mission to make Healthcare for All a reality. With a valuation exceeding $100 million and over ₹1,100 crores raised from 60+ lakh donors, we’ve changed the lives of 2+ lakh campaigners. We’re scaling new heights, and this is your chance to be part of a thriving organization where your work contributes to making the world a better place.",
      applicants: 3,
    },
    {
      id: 3,
      title: "Senior Executive- Mobile Development",
      company: "Ketto",
      location: "Andheri, Mumbai",
      description: "At Ketto, we don’t just work; we create impact! As Asia's largest tech-enabled crowdfunding platform, we’re on a mission to make Healthcare for All a reality. With a valuation exceeding $100 million and over ₹1,100 crores raised from 60+ lakh donors, we’ve changed the lives of 2+ lakh campaigners. We’re scaling new heights, and this is your chance to be part of a thriving organization where your work contributes to making the world a better place.",
      applicants: 3,
    }
  ]);

  const navigate = useNavigate();

  const handleViewApplicants = (jobId: number) => {
    if (jobId === 1) {
      navigate(`applicants_one`);
    }
    else if (jobId === 2) {
      navigate(`/EmployerDashboard/applicants_two`);
    }
    else if (jobId === 3) {
      navigate(`/EmployerDashboard/applicants_three`);
    }
  };

  // const totalApplicants = jobs.reduce((acc, job) => acc + job.applicants, 0);

//  if (location.pathname === "/EmployerDashboard/applicants") {
//     return (
//       <Layout>
//         <Outlet />
//       </Layout>
//     );
//   }

  return (
    <Layout>
      {/* Main dashboard content */}
      <div className="min-h-screen bg-[#f9f5ef] text-[#4b3d30] p-8 font-sans">
        <header className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Welcome, Employer</h1>
          <p className="text-[#6e6257]">Here’s a quick look at your hiring activity.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-[#e6ddd3] rounded-xl p-6 shadow-sm text-center">
            <p className="text-xl font-semibold text-[#4b3d30]">{jobs.length}</p>
            <p className="text-[#6e6257] mt-1">Job Posts</p>
          </div>
          <div className="bg-white border border-[#e6ddd3] rounded-xl p-6 shadow-sm text-center">
            <p className="text-xl font-semibold text-[#4b3d30]">26</p>
            <p className="text-[#6e6257] mt-1">Total Applicants</p>
          </div>
          <div className="bg-white border border-[#e6ddd3] rounded-xl p-6 shadow-sm text-center">
            <p className="text-xl font-semibold text-[#4b3d30]">Active</p>
            <p className="text-[#6e6257] mt-1">Account Status</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Your Job Posts</h2>
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl p-6 mb-6 border border-[#e6ddd3] shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-[#4b3d30]">{job.title}</h3>
                  <p className="text-[#9c8569]">{job.company} • {job.location}</p>
                  <p className="mt-2 text-[#6e6257]">{job.description}</p>
                </div>
                <button
                  onClick={() => handleViewApplicants(job.id)}
                  className="bg-[#7d6651] text-white px-4 py-2 rounded-md hover:bg-[#634f3f] transition mt-2"
                >
                  Applicants
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Render nested routes like applicants_one, applicants_two here */}
      <div className="p-8 bg-white border-t border-gray-300">
        <Outlet />
      </div>
    </Layout>
    
  );
};

export default EmployerDashboard;
