import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";
import Layout from "@/components/layout/Layout";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const { user } = useAuth();

  // Redirect if already authenticated
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <div className="container max-w-md mx-auto py-12">
        <div className="bg-white rounded-lg shadow-md p-8 border border-hirena-light-brown/10">
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-hirena-dark-brown">
                {mode === "login" ? "Welcome Back" : "Create Your Account"}
              </h1>
              <p className="text-muted-foreground mt-2">
                {mode === "login"
                  ? "Enter your credentials to access your account"
                  : "Sign up to start using Hirena"}
              </p>
            </div>

            {mode === "login" ? (
              <Login switchToSignup={() => setMode("signup")} />
            ) : (
              <Signup switchToLogin={() => setMode("login")} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
