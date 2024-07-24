import { useRouter } from "expo-router";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

interface IAuthContext {
  user: null;
  isAuthenticated: boolean | undefined;
  login: () => void;
  logout: () => void;
  register: (
    email: string,
    password: string,
    username: string,
    profileUrl: string
  ) => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );
  const router = useRouter();

  useEffect(() => {
    // TODO: Check Current User & Rediect
    router.push("signIn");
  }, []);

  const login = async () => {
    try {
    } catch (e) {}
  };

  const logout = async () => {};

  const register = async (
    email: string,
    password: string,
    username: string,
    profileUrl: string
  ) => {
    try {
    } catch (e) {}
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be wrapped inside AuthContextProvider");
  }

  return value;
};
