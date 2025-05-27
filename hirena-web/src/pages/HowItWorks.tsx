
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Upload, FileSearch, CheckCircle, MessageSquare, ListChecks } from "lucide-react";

const HowItWorks = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-b from-hirena-beige to-hirena-cream py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-hirena-dark-brown">How Hirena Works</h1>
            <p className="text-lg text-foreground/80">
              Our AI-powered platform streamlines the entire recruitment process, from job posting to candidate selection.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Connect steps with line */}
              <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-hirena-light-brown/30 hidden md:block"></div>
              
              <div className="grid grid-cols-1 gap-12">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0 flex items-start">
                    <div className="h-16 w-16 rounded-full bg-white shadow-md border border-hirena-light-brown/20 flex items-center justify-center">
                      <Upload size={28} className="text-hirena-brown" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Resume Upload & Parsing</h3>
                    <p className="text-foreground/70 mb-4">
                      Candidates upload their resumes, and our AI automatically extracts key information to create structured profiles. Employers post jobs with specific requirements.
                    </p>
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-hirena-light-brown/20 p-4">
                      <p className="text-sm italic text-foreground/80">
                        "Hirena quickly parsed my resume and created my profile in seconds. I didn't need to manually enter any information." — Alex S., Software Developer
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0 flex items-start">
                    <div className="h-16 w-16 rounded-full bg-white shadow-md border border-hirena-light-brown/20 flex items-center justify-center">
                      <FileSearch size={28} className="text-hirena-brown" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">AI Matching & Scoring</h3>
                    <p className="text-foreground/70 mb-4">
                      When candidates apply for jobs, our AI automatically scores their resumes based on how well they match the job requirements. Employers receive a ranked list of candidates.
                    </p>
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-hirena-light-brown/20 p-4">
                      <p className="text-sm italic text-foreground/80">
                        "The AI matching saved us countless hours reviewing resumes. We immediately focused on the most qualified candidates." — Maria J., HR Manager
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0 flex items-start">
                    <div className="h-16 w-16 rounded-full bg-white shadow-md border border-hirena-light-brown/20 flex items-center justify-center">
                      <CheckCircle size={28} className="text-hirena-brown" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Online Assessments</h3>
                    <p className="text-foreground/70 mb-4">
                      Candidates complete role-specific assessments to validate their skills and experience. Results are automatically scored and added to their profiles.
                    </p>
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-hirena-light-brown/20 p-4">
                      <p className="text-sm italic text-foreground/80">
                        "The assessments were relevant to the job and gave me a chance to demonstrate my skills beyond just my resume." — Taylor R., Data Analyst
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0 flex items-start">
                    <div className="h-16 w-16 rounded-full bg-white shadow-md border border-hirena-light-brown/20 flex items-center justify-center">
                      <MessageSquare size={28} className="text-hirena-brown" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">AI Interview</h3>
                    <p className="text-foreground/70 mb-4">
                      Qualified candidates participate in an AI-driven interview that evaluates their responses to job-specific questions. This creates a comprehensive candidate profile.
                    </p>
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-hirena-light-brown/20 p-4">
                      <p className="text-sm italic text-foreground/80">
                        "The AI interview was surprisingly conversational and allowed me to explain my experience in detail." — Jordan M., Marketing Specialist
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0 flex items-start">
                    <div className="h-16 w-16 rounded-full bg-white shadow-md border border-hirena-light-brown/20 flex items-center justify-center">
                      <ListChecks size={28} className="text-hirena-brown" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Selection & Decision</h3>
                    <p className="text-foreground/70 mb-4">
                      Employers review comprehensive candidate profiles, including resume scores, assessment results, and AI interview feedback, to make informed hiring decisions.
                    </p>
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-hirena-light-brown/20 p-4">
                      <p className="text-sm italic text-foreground/80">
                        "Hirena provided us with all the information we needed to confidently select the right candidates for in-person interviews." — Chris L., CTO
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <Button asChild size="lg" className="font-medium">
                <Link to="/auth">Get Started <ChevronRight size={16} className="ml-1" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HowItWorks;
