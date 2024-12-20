import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(
          new URL("/v1/auth/me", import.meta.env.VITE_API_BASE_URL).toString(),
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Authentication check failed");
        }
        setIsAuthenticated(true);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch(
      new URL("/v1/auth/login", import.meta.env.VITE_API_BASE_URL).toString(),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
        credentials: "include",
      },
    );

    if (!response.ok) {
      throw new Error("Login failed");
    }

    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};