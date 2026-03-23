import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  User 
} from 'firebase/auth';
import { auth } from '../firebase.config';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  googleSignIn: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Register with email and password
  const register = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Account created successfully!');
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || 'Failed to register');
      throw error;
    }
  };

  // Login with email and password
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Welcome back!');
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || 'Failed to login');
      throw error;
    }
  };

  // Google Sign-in
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success('Signed in with Google!');
    } catch (error: any) {
      console.error("Google Sign-in error:", error);
      toast.error(error.message || 'Google sign-in failed');
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
    } catch (error: any) {
      console.error("Logout error:", error);
      toast.error('Failed to logout');
      throw error;
    }
  };

  // Persist user state on reload
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      // Basic admin check - in a real app, you'd check custom claims or a Firestore document
      // For now, we'll use a specific email as an example admin
      const adminEmail = 'kinchapui@gmail.com'; // User's email from runtime context
      setIsAdmin(currentUser?.email === adminEmail);
      
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    user,
    loading,
    isAdmin,
    login,
    register,
    googleSignIn,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
