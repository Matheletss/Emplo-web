import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: any | null;
  token: string | null;
  loading: boolean;
  userProfile: any | null;
  signUp: (email: string, password: string, userType: string, firstName: string, lastName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  updateProfile: (data: any) => Promise<void>;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    setUser(null);
    setUserProfile(null);
    setLoading(false);
    return;
  }

  const fetchUserProfile = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error('Failed to fetch profile');
      
      setUserProfile(data);
      setUser(data);
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setUser(null);
      setUserProfile(null);
      localStorage.removeItem('token');
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  fetchUserProfile();
}, []);

  // Sign up
  const signUp = async (email: string,
    password: string,
    userType: string,
    firstName: string,
    lastName: string) => {
    setLoading(true);
    const name = `${firstName} ${lastName}`;
    try {
      const res = await fetch('http://127.0.0.1:8000/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, userType, name }),
      });
      
      if (!res.ok) throw new Error('Sign up failed');
      toast({ title: 'Account created', description: 'You can now log in.' });
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  // Sign in
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));

    // Update state
      setToken(data.access_token);
      setUser(data);

      toast({ title: "Login successful",
         description: "Welcome back!", });
    } catch (err: any) {
      toast({ title: 'Login failed', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const signOut = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    toast({ title: 'Logged out', description: 'You have been logged out.' });
  };

  // Update profile
  const updateProfile = async (data: any) => {
  try {
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) throw new Error("No user logged in");

    const response = await fetch("http://127.0.0.1:8000/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to update profile");
    }

    const updatedProfile = await response.json();

    setUserProfile({
      ...userProfile,
      ...updatedProfile,
    });

    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  } catch (error: any) {
    toast({
      title: "Error updating profile",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  } finally {
    setLoading(false);
  }
};

  return (
    <AuthContext.Provider value={{ user, token, loading, userProfile, signUp, signIn, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;