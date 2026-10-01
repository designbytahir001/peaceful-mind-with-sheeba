import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from './supabase';

interface AuthUser {
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isOfflineMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      // Real Supabase auth listener
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser({ email: session.user.email || '', isAdmin: true });
        } else {
          setUser(null);
        }
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({ email: session.user.email || '', isAdmin: true });
        } else {
          setUser(null);
        }
        setLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      // Fallback Local Storage Mode
      const isAuthed = localStorage.getItem('peaceful_admin_authenticated') === 'true';
      const savedEmail = localStorage.getItem('peaceful_admin_email') || 'admin@peacefulmind.com';
      if (isAuthed) {
        setUser({ email: savedEmail, isAdmin: true });
      } else {
        setUser(null);
      }
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    if (isSupabaseConfigured && supabase) {
      try {
        const { error, data } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data.user) {
          setUser({ email: data.user.email || '', isAdmin: true });
          setLoading(false);
          return { success: true };
        }
        setLoading(false);
        return { success: false, error: "Authentication failed" };
      } catch (err: any) {
        setLoading(false);
        return { success: false, error: err.message || "Invalid credentials" };
      }
    } else {
      // Local check
      // Simple credentials for local testing
      if (email.trim().toLowerCase() === 'admin@peacefulmind.com' && password === 'sheebapeace') {
        localStorage.setItem('peaceful_admin_authenticated', 'true');
        localStorage.setItem('peaceful_admin_email', email);
        setUser({ email, isAdmin: true });
        setLoading(false);
        return { success: true };
      } else {
        setLoading(false);
        return { success: false, error: "Invalid credentials. Use admin@peacefulmind.com and sheebapeace" };
      }
    }
  };

  const logout = async () => {
    setLoading(true);
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem('peaceful_admin_authenticated');
      localStorage.removeItem('peaceful_admin_email');
    }
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isOfflineMode: !isSupabaseConfigured }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
