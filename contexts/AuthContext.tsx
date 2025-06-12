import React, { createContext, useContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import { api } from "@/services";

interface User {
  id: number;
  name: string;
  token: string;
}

interface ApiResponse {
  error: boolean;
  user: User;
}

interface AuthContextData {
  user: Omit<User, "token"> | null;
  token: string | null;
  loading: boolean;
  login: (user: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface LoginParams {
  user: string;
  password: string;
}

const STORAGE_KEY = "@carmodelsapp:auth";

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<Omit<User, "token"> | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed: { user: Omit<User, "token">; token: string } =
            JSON.parse(stored);
          setUser(parsed.user);
          setToken(parsed.token);
        }
      } catch (e) {
        console.error("Error loading auth data", e);
      } finally {
        setLoading(false);
      }
    }
    loadStorageData();
  }, []);

  const mutation = useMutation<ApiResponse, Error, LoginParams>({
    mutationFn: async ({ user, password }: LoginParams) => {
      const response = await api.post<ApiResponse>("/signIn", {
        user,
        password,
      });
      return response.data;
    },
    onSuccess: async (data) => {
      if (!data.error) {
        const { token, ...userWithoutToken } = data.user;
        setUser(userWithoutToken);
        setToken(token);
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ user: userWithoutToken, token })
        );
        Toast.show({
          type: "success",
          text1: "Logado com sucesso",
          text2: `Bem-vindo, ${userWithoutToken.name}!`,
        });
      } else {
        throw new Error("Login error");
      }
    },
    onError: (error) => {
      throw error;
    },
  });

  async function login(user: string, password: string) {
    await mutation.mutateAsync({ user, password });
  }

  async function logout() {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth error ");
  return context;
}
