import React from 'react';
import { Button } from '@/components/ui/button';

export default function JobDescriptionPage() {
  return (
    <div className="bg-[#f9f5ef] text-[#4b3e2d] min-h-screen p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Software Developer – Python (0-2 years)</h1>
        <p className="mb-6">
          Quadeye is a leading algorithmic trading firm with its presence across all global exchanges. Our engineers
          translate their understanding of financial markets into automated trading strategies across multiple asset
          classes & instruments using advanced mathematical techniques.
        </p>
        <p className="mb-6">
          We are talented entrepreneurial individuals with a knack of numbers and genius coders who love to design
          resilient and robust trading systems. Quadeye is a place of deep curiosity, high expectations, no-hierarchy
          and constant collaboration with some of the smartest engineers who are empowered to innovate with the help
          of best resources, mentors and technology.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Key Responsibilities</h2>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>Understanding the problems and issues related to the smooth operations of our processes and software.</li>
          <li>Coming up with good engineering solutions for problems.</li>
          <li>Implementing the code for creating and modifying the software.</li>
          <li>Testing the code written thoroughly.</li>
          <li>Deploying the code in production.</li>
          <li>Overviewing the code in production and resolving the arising issues.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Experience and Qualification</h2>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>Engineering degree in Computer Science (preferred) or any other discipline</li>
          <li>Ability to work in a fast-paced environment managing multiple high-priority projects.</li>
          <li>Working with Python and bash on a regular basis</li>
          <li>Advantageous if the candidate has familiarity with pandas/NumPy.</li>
          <li>Strong Knowledge of Shell and Python scripting</li>
          <li>Working knowledge of Linux</li>
          <li>Excellent problem-solving abilities</li>
          <li>Good written and oral communication skills</li>
          <li>Willingness to learn and work on new technologies.</li>
        </ul>

        <div className="flex justify-center mt-10">
          <Button className="bg-[#5b4a36] hover:bg-[#3e3224] text-white px-6 py-2 rounded-xl text-lg shadow-md">
            Submit Resume
          </Button>
        </div>
      </div>
    </div>
  );
}
