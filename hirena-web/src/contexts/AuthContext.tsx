// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { Session, User } from '@supabase/supabase-js';
// import { supabase } from '@/integrations/supabase/client';
// import { useToast } from '@/hooks/use-toast';

// interface AuthContextType {
//   session: Session | null;
//   user: User | null;
//   userProfile: any | null;
//   loading: boolean;
//   signUp: (email: string, password: string, userType: string, firstName: string, lastName: string) => Promise<void>;
//   signIn: (email: string, password: string) => Promise<void>;
//   signOut: () => Promise<void>;
//   updateProfile: (data: any) => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [session, setSession] = useState<Session | null>(null);
//   const [user, setUser] = useState<User | null>(null);
//   const [userProfile, setUserProfile] = useState<any | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const { toast } = useToast();

//   useEffect(() => {
//     // Set up auth state listener FIRST
//     const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
//       setSession(currentSession);
//       setUser(currentSession?.user ?? null);
      
//       if (currentSession?.user) {
//         // Use setTimeout to avoid potential deadlocks with Supabase client
//         setTimeout(() => {
//           fetchUserProfile(currentSession.user.id);
//         }, 0);
//       } else {
//         setUserProfile(null);
//       }
//     });

//     // THEN check for existing session
//     supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
//       setSession(currentSession);
//       setUser(currentSession?.user ?? null);
      
//       if (currentSession?.user) {
//         fetchUserProfile(currentSession.user.id);
//       }
//       setLoading(false);
//     });

//     return () => {
//       subscription?.unsubscribe();
//     };
//   }, []);

//   const fetchUserProfile = async (userId: string) => {
//     try {
//       const { data, error } = await supabase
//         .from('profiles')
//         .select('*')
//         .eq('id', userId)
//         .maybeSingle();

//       if (error) {
//         throw error;
//       }

//       setUserProfile(data);
//     } catch (error: any) {
//       console.error('Error fetching user profile:', error.message);
//     }
//   };

//   const signUp = async (email: string, password: string, userType: string, firstName: string, lastName: string) => {
//     try {
//       setLoading(true);
//       const { data, error } = await supabase.auth.signUp({ 
//         email, 
//         password,
//         options: {
//           data: {
//             first_name: firstName,
//             last_name: lastName,
//             user_type: userType
//           }
//         }
//       });

//       if (error) throw error;
      
//       // The trigger will handle creating the profile
//       toast({
//         title: "Account created successfully",
//         description: "Please verify your email to complete registration.",
//       });
      
//     } catch (error: any) {
//       toast({
//         title: "Error creating account",
//         description: error.message,
//         variant: "destructive",
//       });
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signIn = async (email: string, password: string) => {
//     try {
//       setLoading(true);
//       const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
//       if (error) throw error;

//       toast({
//         title: "Login successful",
//         description: "Welcome back!",
//       });
      
//     } catch (error: any) {
//       toast({
//         title: "Login failed",
//         description: error.message,
//         variant: "destructive",
//       });
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signOut = async () => {
//     try {
//       setLoading(true);
//       const { error } = await supabase.auth.signOut();
      
//       if (error) throw error;
      
//       toast({
//         title: "Logged out",
//         description: "You have been successfully logged out.",
//       });
      
//     } catch (error: any) {
//       toast({
//         title: "Error logging out",
//         description: error.message,
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateProfile = async (data: any) => {
//     try {
//       setLoading(true);
      
//       if (!user) throw new Error("No user logged in");
      
//       const { error } = await supabase
//         .from('profiles')
//         .update(data)
//         .eq('id', user.id);
        
//       if (error) throw error;
      
//       setUserProfile({
//         ...userProfile,
//         ...data
//       });
      
//       toast({
//         title: "Profile updated",
//         description: "Your profile has been successfully updated.",
//       });
      
//     } catch (error: any) {
//       toast({
//         title: "Error updating profile",
//         description: error.message,
//         variant: "destructive",
//       });
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const value = {
//     session,
//     user,
//     userProfile,
//     loading,
//     signUp,
//     signIn,
//     signOut,
//     updateProfile,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

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
  const storedUser = localStorage.getItem('user');
  if (!token) {
    setUser(null);
    setUserProfile(null);
    setLoading(false);
    return;
  }

  if (storedUser) {
    try {
      setUser(JSON.parse(storedUser));
    } catch (err) {
      console.error("Failed to parse stored user", err);
    }
  }

  const fetchUserProfile = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to fetch profile');
      const data = await res.json();
      //console.log('User data:', data);
      setUserProfile(data);
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setUser(null);
      setUserProfile(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
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
      setUser(data.user);

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