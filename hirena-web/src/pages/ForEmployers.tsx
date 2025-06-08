import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import EmployerQuestionnaire from "@/components/employer/EmployerQuestionnaire";

const ForEmployers = () => {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  if (showQuestionnaire) {
    return <EmployerQuestionnaire />;
  }

  return (
    <Layout>
      <div className="bg-gradient-to-b from-hirena-beige to-hirena-cream py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-hirena-dark-brown">For Employers</h1>
            <p className="text-lg text-foreground/80">
              Streamline your hiring process with our AI-powered platform designed specifically for modern employers.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-hirena-light-brown/20">
            <div className="p-8 md:p-10">
              <h2 className="text-2xl font-semibold mb-6 text-center">Why Choose Emplo AI?</h2>
              
              <ul className="space-y-4 mb-8 max-w-xl mx-auto">
                <li className="flex gap-3">
                  <CheckCircle size={20} className="text-hirena-brown flex-shrink-0" />
                  <span>Save up to 70% of your recruitment time</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle size={20} className="text-hirena-brown flex-shrink-0" />
                  <span>Eliminate resume screening with AI matching</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle size={20} className="text-hirena-brown flex-shrink-0" />
                  <span>Conduct five AI-guided interviews</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle size={20} className="text-hirena-brown flex-shrink-0" />
                  <span>Obtain evaluations for five candidates</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle size={20} className="text-hirena-brown flex-shrink-0" />
                  <span>Generate interview transcripts</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle size={20} className="text-hirena-brown flex-shrink-0" />
                  <span>Access five candidate profiles and resumes</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle size={20} className="text-hirena-brown flex-shrink-0" />
                  <span>List five jobs or allocate interviews to one job</span>
                </li>
              </ul>
              
              <div className="text-center">
                <Button 
                  size="lg" 
                  className="w-full md:w-auto px-8"
                  onClick={() => setShowQuestionnaire(true)}
                >
                  Create Employer Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-foreground/70">
              Everything you need to know about using Emplo AI as an employer.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">How does the AI matching work?</h3>
              <p className="text-foreground/70">
                Our AI analyzes candidate resumes against your job requirements, considering skills, experience, education, and more to generate a match score.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Can I customize the assessments?</h3>
              <p className="text-foreground/70">
                Yes, Pro plan users can create custom assessments tailored to their specific job requirements and company needs.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">How accurate are the AI interviews?</h3>
              <p className="text-foreground/70">
                Our AI interviews evaluate candidates based on their responses to job-specific questions and provide insights that complement your own judgment.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Can I integrate with existing ATS?</h3>
              <p className="text-foreground/70">
                We offer integrations with popular ATS platforms. Contact our sales team for specific integration information.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Is there a free trial available?</h3>
              <p className="text-foreground/70">
                Yes, we offer a 7-day free trial so you can experience the full capabilities of Emplo AI.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">How secure is candidate data?</h3>
              <p className="text-foreground/70">
                We implement industry-standard security measures to protect all data on our platform, with compliance for major privacy regulations.
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <p className="mb-4 text-foreground/70">Still have questions?</p>
            <Button variant="outline">
              Contact Our Team
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForEmployers;
