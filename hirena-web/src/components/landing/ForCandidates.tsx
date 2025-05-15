
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Upload } from "lucide-react";

const ForCandidates = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="bg-hirena-beige shadow-lg rounded-xl overflow-hidden border border-hirena-light-brown/20">
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-semibold mb-4">Upload Your Resume</h3>
                <p className="text-sm text-foreground/70 mb-6">
                  Our AI will analyze your resume to match you with relevant opportunities.
                </p>
                
                <div className="border-2 border-dashed border-input rounded-lg p-8 text-center mb-6">
                  <Upload className="mx-auto h-10 w-10 text-foreground/50 mb-2" />
                  <p className="text-sm text-foreground/70">
                    Drag & drop your resume here or
                    <button className="text-hirena-brown font-medium mx-1">browse</button>
                    to upload
                  </p>
                  <p className="text-xs text-foreground/50 mt-2">
                    Supported formats: PDF, DOCX, TXT (Max 5MB)
                  </p>
                </div>
                
                <Button className="w-full">Upload Resume</Button>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-hirena-dark-brown">Upload Your Resume to Get Wisely Recruited</h2>
            <p className="text-lg mb-6 text-foreground/80">
              Let our AI match you with the right roles and auto-create your profile — in seconds.
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-hirena-brown/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-hirena-brown text-sm">✓</span>
                </div>
                <span>Create your profile by simply uploading your resume</span>
              </li>
              <li className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-hirena-brown/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-hirena-brown text-sm">✓</span>
                </div>
                <span>Apply to jobs with a single click</span>
              </li>
              <li className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-hirena-brown/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-hirena-brown text-sm">✓</span>
                </div>
                <span>Take skills assessments to verify your expertise</span>
              </li>
              <li className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-hirena-brown/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-hirena-brown text-sm">✓</span>
                </div>
                <span>Complete AI interviews on your own schedule</span>
              </li>
            </ul>
            
            <Button asChild className="group">
              <Link to="/for-candidates">
                Learn More <ArrowRight size={16} className="ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForCandidates;
