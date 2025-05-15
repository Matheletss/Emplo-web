import Layout from "@/components/layout/Layout";
import ResumeUpload from "@/components/ResumeUpload";
import ProfileForm from "@/components/ProfileForm";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const Profile = () => {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <Layout>
        <div className="bg-gradient-to-b from-hirena-beige to-hirena-cream py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-hirena-dark-brown">Your Profile</h1>
              <p className="text-lg text-foreground/80">
                Manage your profile information and upload your resume to get matched with relevant opportunities.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-hirena-light-brown/20">
                <div className="p-8">
                  <ResumeUpload />
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-hirena-light-brown/20">
                <div className="p-8">
                  <h3 className="text-xl font-semibold mb-4">Edit Your Profile</h3>
                  <p className="text-sm text-foreground/70 mb-6">
                    Update your profile information to improve your job matches.
                  </p>
                  <ProfileForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default Profile;
