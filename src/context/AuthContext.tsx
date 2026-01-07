import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import authClient, { getAccessToken, setAccessToken } from '@/lib/api/authClient.ts';
import { getApiErrorMessage } from '@/lib/api/errors.ts';

type AuthUser = {
  id: string;
  email: string;
  name?: string;
} | null;

type AuthContextValue = {
  user: AuthUser;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSession = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authClient.get('/api/auth/me');
      if (res.data?.accessToken) {
        setAccessToken(res.data.accessToken);
      }
      setUser(res.data?.user ?? null);
    } catch (err) {
      setUser(null);
      setError(getApiErrorMessage(err, 'Session konnte nicht geladen werden'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchSession();
  }, [fetchSession]);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authClient.post('/api/auth/login', {
        email,
        password,
      });
      if (res.data?.accessToken) {
        setAccessToken(res.data.accessToken);
      }
      setUser(res.data?.user ?? null);
    } catch (err) {
      setUser(null);
      setAccessToken(null);
      setError(getApiErrorMessage(err, 'Login fehlgeschlagen'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await authClient.post('/api/auth/logout');
    } catch {
      // ignore logout errors
    } finally {
      setAccessToken(null);
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  const refreshSession = useCallback(async () => {
    await fetchSession();
  }, [fetchSession]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user) && Boolean(getAccessToken()),
        isLoading,
        error,
        login,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
