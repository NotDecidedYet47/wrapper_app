import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";


import { router } from "expo-router";

interface IAuthContext {
  user: FirebaseAuthTypes.User | null;
  isAuthenticated: boolean | undefined;
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
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      setIsAuthenticated(true);
      setUser(currentUser);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  const logout = async () => {
    try {
      await auth().signOut();
      router.replace("signIn");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

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
    <AuthContext.Provider value={{ user, isAuthenticated, logout, register }}>
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
