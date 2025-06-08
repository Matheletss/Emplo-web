
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ForEmployers = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-hirena-beige to-hirena-cream">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-hirena-dark-brown">For Employers</h2>
            <p className="text-lg mb-6 text-foreground/80">
              Hiring doesn't have to be complicated. Emplo AI streamlines your recruitment process so you can focus on finding the right talent for your team.
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-hirena-brown/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-hirena-brown text-sm">✓</span>
                </div>
                <span>Conduct five AI-guided interviews</span>
              </li>
              <li className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-hirena-brown/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-hirena-brown text-sm">✓</span>
                </div>
                <span>Obtain evaluations for five candidates</span>
              </li>
              <li className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-hirena-brown/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-hirena-brown text-sm">✓</span>
                </div>
                <span>List five jobs or allocate interviews to one job</span>
              </li>
              <li className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-hirena-brown/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-hirena-brown text-sm">✓</span>
                </div>
                <span>Access five candidate profiles and resumes</span>
              </li>
            </ul>
            
            <Button asChild className="group">
              <Link to="/for-employers">
                Learn More <ArrowRight size={16} className="ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
          </div>
          
          <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-hirena-light-brown/20">
            <div className="p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-4">Post a Job</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Job Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Frontend Developer"
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Company</label>
                  <input
                    type="text"
                    placeholder="Your company name"
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Required Skills</label>
                  <input
                    type="text"
                    placeholder="e.g. React, TypeScript, CSS"
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
                <Button className="w-full">Continue</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForEmployers;
