
import { Button } from "@/components/ui/button";
import { ChevronRight, BarChart2, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-hirena-beige to-hirena-cream pb-16 pt-20 md:pb-24 md:pt-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-hirena-dark-brown mb-6 leading-tight">
            The <span className="text-hirena-brown">Wise</span> Way to Hire
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Streamline your recruitment process with our AI-powered platform. From resume parsing to automated interviews, we're redefining hiring efficiency.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="font-medium">
              <Link to="/signup">Get Started <ChevronRight size={16} className="ml-1" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-medium">
              <Link to="/how-it-works">Learn More</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-hirena-light-brown/20">
            <div className="h-12 w-12 rounded-full bg-hirena-beige flex items-center justify-center mb-4">
              <BarChart2 size={24} className="text-hirena-brown" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI-Powered Matching</h3>
            <p className="text-foreground/70">Resume parsing and scoring based on your specific job requirements.</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-hirena-light-brown/20">
            <div className="h-12 w-12 rounded-full bg-hirena-beige flex items-center justify-center mb-4">
              <Clock size={24} className="text-hirena-brown" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Reduce Time-to-Hire</h3>
            <p className="text-foreground/70">Automate repetitive tasks and focus on what truly matters.</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-hirena-light-brown/20">
            <div className="h-12 w-12 rounded-full bg-hirena-beige flex items-center justify-center mb-4">
              <Award size={24} className="text-hirena-brown" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Smarter Assessments</h3>
            <p className="text-foreground/70">Online tests and AI interviews evaluate candidates holistically.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
