
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import HowItWorks from "./pages/HowItWorks";
import ForEmployers from "./pages/ForEmployers";
import ForCandidates from "./pages/ForCandidates";
import TalentHub from "./pages/TalentHub";
import JobPostingsPage from "./pages/JobPosting";
import JobDescriptionPage from "./pages/Apply";
import Apply from "./pages/Apply";
import Auth from "./pages/Auth";
import EmployerDashboard from "./pages/EmployerDashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Interview from "./pages/Interview";
import EmployerMessages_One from "./pages/Applicants_one";
import EmployerMessages_Two from "./pages/Applicants_two";
import EmployerMessages_Three from "./pages/Applicants_three";
import ApplicantsPage from "./pages/Applicants";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/for-employers" element={<ForEmployers />} />
            <Route path="/for-candidates" element={<ForCandidates />} />
            <Route path="/for-recruiters" element={<TalentHub />} />
            <Route path="/job-postings" element={<JobPostingsPage />} />
            <Route path="/apply/:id" element={<JobDescriptionPage />} />
            <Route path="/EmployerDashboard" element={<EmployerDashboard />} />
            <Route path="/EmployerDashboard/applicants/:id" element={<ApplicantsPage />} />
            {/* <Route path="/EmployerDashboard/applicants_one" element={<EmployerMessages_One />} />
            <Route path="/EmployerDashboard/applicants_two" element={<EmployerMessages_Two />} />
            <Route path="/EmployerDashboard/applicants_three" element={<EmployerMessages_Three />} /> */}

            <Route path="/auth" element={<Auth />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
