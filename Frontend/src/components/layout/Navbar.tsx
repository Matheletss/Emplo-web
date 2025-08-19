import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  // Get user initials for avatar
  const getInitials = () => {
    if (!userProfile) return "U";
    
    const firstName = userProfile.first_name || "";
    const lastName = userProfile.last_name || "";
    
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  };

  return (
    <nav className="bg-hirena-cream/80 backdrop-blur-sm sticky top-0 z-50 w-full border-b border-hirena-light-brown/20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/Epsilon_png.png" 
            alt="Emplo AI Logo" 
            className="h-16 w-16"
          />
          <span className="text-2xl font-bold text-hirena-dark-brown -ml-2">Emplo AI</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            <Link to="/how-it-works" className="text-foreground/80 hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link to="/for-employers" className="text-foreground/80 hover:text-foreground transition-colors">
              For Employers
            </Link>
            <Link to="/for-candidates" className="text-foreground/80 hover:text-foreground transition-colors">
              For Candidates
            </Link>
            <Link to="/for-recruiters" className="text-foreground/80 hover:text-foreground transition-colors">
              Talent Hub
            </Link>
            <Link to="/job-postings" className="text-foreground/80 hover:text-foreground transition-colors">
              Job Postings
            </Link>
            <Link to="/EmployerDashboard" className="text-foreground/80 hover:text-foreground transition-colors">
              Employer Dashboard
            </Link>
          </div>
          
          <div className="flex gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>{getInitials()}</AvatarFallback>
                    </Avatar>
                    <span>Account</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="flex items-center gap-2" onClick={() => navigate("/profile")}>
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 text-destructive" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="outline">
                  <Link to="/auth">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/auth?signup=true">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link 
              to="/how-it-works" 
              className="py-2 text-foreground/80 hover:text-foreground transition-colors"
              onClick={toggleMenu}
            >
              How It Works
            </Link>
            <Link 
              to="/for-employers" 
              className="py-2 text-foreground/80 hover:text-foreground transition-colors"
              onClick={toggleMenu}
            >
              For Employers
            </Link>
            <Link 
              to="/for-candidates" 
              className="py-2 text-foreground/80 hover:text-foreground transition-colors"
              onClick={toggleMenu}
            >
              For Candidates
            </Link>
            <Link 
              to="/for-recruiters" 
              className="py-2 text-foreground/80 hover:text-foreground transition-colors"
              onClick={toggleMenu}
            >
              Talent Hub
            </Link>
            <Link 
              to="/job-postings" 
              className="py-2 text-foreground/80 hover:text-foreground transition-colors"
              onClick={toggleMenu}
            >
              Job Postings
            </Link>

            <div className="flex flex-col gap-2 pt-2">
              {user ? (
                <>
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => {
                      navigate("/profile");
                      toggleMenu();
                    }}
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => {
                      handleSignOut();
                      toggleMenu();
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline" className="w-full" onClick={toggleMenu}>
                    <Link to="/auth">Login</Link>
                  </Button>
                  <Button asChild className="w-full" onClick={toggleMenu}>
                    <Link to="/auth?signup=true">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
