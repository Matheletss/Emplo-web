import React , { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

export default function JobDescriptionPage() {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSubmit = (): void => {
    toast({
      title: "Resume Submitted",
      description: "You have submitted your existing resume."
    });
    setSubmitted(true);
  };
  
  return (
    <div className="bg-[#f9f5ef] text-[#4b3e2d] min-h-screen p-8 font-sans">
  <div className="max-w-4xl mx-auto">
    <h1 className="text-4xl font-bold mb-4">Full Stack Web Developer (0–2 years)</h1>
    <p className="mb-6">
      CodeNova Technologies is a fast-growing tech startup based in Bangalore, building smart, scalable, and user-centric solutions across the fintech and edtech sectors. Our team thrives on clean code, intuitive design, and a deep culture of continuous learning.
    </p>
    <p className="mb-6">
      At CodeNova, we believe that great software is built by curious minds, collaborative problem-solvers, and people who care deeply about product quality. With a flat hierarchy and a learning-first environment, we empower our developers to work across the stack and contribute to impactful projects from day one.
    </p>
    <p className="mb-6">
      This is an exciting opportunity to be part of a dynamic product team and work on end-to-end development of scalable, production-ready systems using modern technologies. If you're passionate about building real-world solutions and eager to grow in a collaborative, startup environment, we’d love to hear from you.
    </p>

    <h2 className="text-2xl font-semibold mt-8 mb-4">Key Responsibilities</h2>
    <ul className="list-disc list-inside space-y-2 mb-6">
      <li>Build and maintain user-facing features using modern frontend frameworks such as React or Vue.</li>
      <li>Design and implement backend APIs and services using Node.js, Python, or similar technologies.</li>
      <li>Work with databases like PostgreSQL and MongoDB to structure, query, and optimize data.</li>
      <li>Collaborate with designers, developers, and product managers to ship high-quality software.</li>
      <li>Write testable, maintainable code and assist in debugging and deployment.</li>
      <li>Learn from senior developers and actively contribute to team discussions and code reviews.</li>
    </ul>

    <h2 className="text-2xl font-semibold mt-8 mb-4">Experience and Qualifications</h2>
    <ul className="list-disc list-inside space-y-2 mb-6">
      <li>0–2 years of professional experience in web development.</li>
      <li>Strong foundation in HTML, CSS, and JavaScript.</li>
      <li>Familiarity with frontend frameworks (React, Vue, Angular, etc.).</li>
      <li>Exposure to at least one backend language (Node.js, Python, etc.).</li>
      <li>Basic understanding of REST APIs, version control systems like Git, and modern development workflows.</li>
      <li>Willingness to learn, adapt quickly, and contribute in a fast-paced environment.</li>
      <li>B.E./B.Tech in Computer Science or related discipline (preferred).</li>
    </ul>

    <div className="flex justify-center mt-10">
      <Button
        onClick={handleSubmit}
        disabled={submitted}
        className={`${
          submitted ? "bg-gray-400 cursor-not-allowed" : "bg-[#5b4a36] hover:bg-[#3e3224]"
        } text-white px-6 py-2 rounded-xl text-lg shadow-md`}
      >
        Submit Resume
      </Button>
    </div>
  </div>
</div>

  );
}
