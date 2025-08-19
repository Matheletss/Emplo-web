import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import axios from 'axios'; 
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from "@/components/layout/Layout";
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Award, GraduationCap, Briefcase, ExternalLink } from 'lucide-react';

interface JobSeeker {
  _id: string;
  name: string;
  role: string;
  location: string;
  skills: string[];
  education: string[];
  experience: string[];
  certifications: string[];
  resumeUrl: string;
}

const TalentHubPage = () => {
  const [jobSeekers, setJobSeekers] = useState<JobSeeker[]>([]);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/profiles')  // 🔁 Use your actual backend URL here
      .then(res => {setJobSeekers(res.data)})
      .catch(err => console.error("Failed to fetch profiles", err));
  }, []);

 const toggleRow = (seekerId: string) => {
  setExpandedRows(prev =>
    prev.includes(seekerId) ? prev.filter(id => id !== seekerId) : [...prev, seekerId]
  );
};

  const filteredData = jobSeekers.filter(seeker => {
    const searchLower = searchTerm.toLowerCase();
    return (
      seeker.name?.toLowerCase().includes(searchLower) ||
      seeker.role?.toLowerCase().includes(searchLower) ||
      seeker.location?.toLowerCase().includes(searchLower) ||
      (Array.isArray(seeker.skills) &&
    seeker.skills.some(skill => skill.toLowerCase().includes(searchLower)))
    );
  });

  return (
    <Layout>
    <div className="min-h-screen px-6 py-10 bg-gradient-to-b from-[#f7f3ed] to-[#fdfaf5]">
      <h1 className="text-4xl font-bold text-center text-[#5f4b3b] mb-10">Talent Hub</h1>
      <div className="max-w-xl mx-auto mb-8">
        <Input
          placeholder="Search (e.g., React developer Bangalore)"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="rounded-lg border border-[#cbb89e] focus:ring-[#5f4b3b]"
        />
      </div>

      <div className="space-y-6 max-w-4xl mx-auto">
        {filteredData.map(seeker => (
          <Card key={seeker._id} className="bg-white shadow rounded-xl">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-[#5f4b3b]">{seeker.name}</h2>
                  <p className="text-sm text-gray-700">{seeker.role} - {seeker.location}</p>
                  <p className="text-sm text-gray-600">Skills: {seeker.skills}</p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => {toggleRow(seeker._id);
                  }}
                  className="text-[#5f4b3b] hover:bg-[#ece2d9]"
                >
                  {expandedRows.includes(seeker._id) ? <ChevronUp /> : <ChevronDown />}
                </Button>
              </div>

              {expandedRows.includes(seeker._id) && (
                <div className="mt-4 border-t pt-4 space-y-2 text-sm text-gray-700">
                  <p><strong>Education:</strong> {seeker.education}</p>
                  <p><strong>Experience:</strong> {seeker.experience}</p>
                  <p><strong>Certifications:</strong> {seeker.certifications}</p>
                  <a
                    href={seeker.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-[#5f4b3b] underline hover:text-[#3f2f23]"
                  >
                    View Resume
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </Layout>
  );
};

export default TalentHubPage;
