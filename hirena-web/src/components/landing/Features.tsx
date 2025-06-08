
import { CheckCircle2, FileText, ScrollText, ClipboardCheck, MessagesSquare, LayoutDashboard } from "lucide-react";

const Features = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simplify Your Hiring Process</h2>
          <p className="text-lg text-foreground/70">
            Emplo AI provides a comprehensive solution to streamline every step of your recruitment journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          <div className="flex gap-4">
            <div className="flex-shrink-0 mt-1">
              <FileText size={24} className="text-hirena-brown" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Resume Parsing</h3>
              <p className="text-foreground/70">
                Our AI automatically extracts key information from resumes to create structured candidate profiles.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-shrink-0 mt-1">
              <ScrollText size={24} className="text-hirena-brown" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Job Posting</h3>
              <p className="text-foreground/70">
                Create detailed job listings with specific requirements that guide our AI-matching system.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-shrink-0 mt-1">
              <CheckCircle2 size={24} className="text-hirena-brown" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">AI Matching</h3>
              <p className="text-foreground/70">
                Automatically score and rank candidates based on how well they match your job requirements.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-shrink-0 mt-1">
              <ClipboardCheck size={24} className="text-hirena-brown" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Online Assessments</h3>
              <p className="text-foreground/70">
                Evaluate candidates with role-specific assessments to validate their skills and experience.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-shrink-0 mt-1">
              <MessagesSquare size={24} className="text-hirena-brown" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">AI Interviews</h3>
              <p className="text-foreground/70">
                Conduct preliminary interviews powered by AI to screen candidates efficiently.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-shrink-0 mt-1">
              <LayoutDashboard size={24} className="text-hirena-brown" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Application Tracking</h3>
              <p className="text-foreground/70">
                Monitor application status and candidate progress through intuitive dashboards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
