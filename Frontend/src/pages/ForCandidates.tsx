import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Upload, Search, ClipboardCheck, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const ForCandidates = () => {
  const { user } = useAuth();

  if (user) {
    return (
      <Layout>
        <div className="bg-gradient-to-b from-hirena-beige to-hirena-cream py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-hirena-dark-brown">Welcome Back!</h1>
              <p className="text-lg text-foreground/80">
                Continue your journey to find the perfect job match.
              </p>
            </div>
            
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-hirena-light-brown/20 mb-16">
              <div className="p-8">
                <h3 className="text-xl font-semibold mb-4">Manage Your Profile</h3>
                <p className="text-sm text-foreground/70 mb-6">
                  Update your profile information and resume to get better job matches.
                </p>
                <Button asChild className="w-full">
                  <Link to="/profile">Go to Profile</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gradient-to-b from-hirena-beige to-hirena-cream py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-hirena-dark-brown">Upload Your Resume to Get Wisely Recruited</h1>
            <p className="text-lg text-foreground/80">
              Let our AI match you with the right roles and auto-create your profile — in seconds.
            </p>
          </div>
          
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-hirena-light-brown/20 mb-16">
            <div className="p-8">
              <h3 className="text-xl font-semibold mb-4">Sign Up to Get Started</h3>
              <p className="text-sm text-foreground/70 mb-6">
                Create an account to upload your resume and get matched with relevant opportunities.
              </p>
              <Button asChild className="w-full">
                <Link to="/auth?role=candidate">Sign Up</Link>
              </Button>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-8 text-center">The Candidate Journey</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-hirena-light-brown/20 text-center">
                <div className="h-14 w-14 rounded-full bg-hirena-beige flex items-center justify-center mx-auto mb-4">
                  <Upload size={24} className="text-hirena-brown" />
                </div>
                <h3 className="font-semibold mb-2">Resume Upload</h3>
                <p className="text-sm text-foreground/70">
                  Upload your resume to create your profile automatically.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-hirena-light-brown/20 text-center">
                <div className="h-14 w-14 rounded-full bg-hirena-beige flex items-center justify-center mx-auto mb-4">
                  <Search size={24} className="text-hirena-brown" />
                </div>
                <h3 className="font-semibold mb-2">Job Matching</h3>
                <p className="text-sm text-foreground/70">
                  Get matched to opportunities that fit your skills.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-hirena-light-brown/20 text-center">
                <div className="h-14 w-14 rounded-full bg-hirena-beige flex items-center justify-center mx-auto mb-4">
                  <ClipboardCheck size={24} className="text-hirena-brown" />
                </div>
                <h3 className="font-semibold mb-2">Skills Assessment</h3>
                <p className="text-sm text-foreground/70">
                  Verify your expertise through online assessments.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-hirena-light-brown/20 text-center">
                <div className="h-14 w-14 rounded-full bg-hirena-beige flex items-center justify-center mx-auto mb-4">
                  <MessageSquare size={24} className="text-hirena-brown" />
                </div>
                <h3 className="font-semibold mb-2">AI Interview</h3>
                <p className="text-sm text-foreground/70">
                  Complete an AI interview to showcase your experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForCandidates;
