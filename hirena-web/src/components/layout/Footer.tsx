
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-hirena-cream border-t border-hirena-light-brown/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-hirena-dark-brown">Emplo AI</h3>
            <p className="text-sm text-foreground/80">
              The wise way to hire. AI-powered recruitment to streamline your hiring process.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/how-it-works" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/for-employers" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
                  For Employers
                </Link>
              </li>
              <li>
                <Link to="/for-candidates" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
                  For Candidates
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-hirena-light-brown/20 flex flex-col md:flex-row gap-4 justify-between items-center">
          <p className="text-sm text-foreground/60">
            &copy; {currentYear} Emplo AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
              Twitter
            </a>
            <a href="https://www.linkedin.com/company/emplo-ai/posts/?feedView=all" className="text-foreground/60 hover:text-foreground transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
