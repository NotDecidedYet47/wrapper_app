import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

interface IAuthContext {
  user: FirebaseAuthTypes.User | null;
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
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    const currentUser = auth().currentUser;
    console.log(`현재 로그인한 유저, ${currentUser.uid}`);
    if (currentUser) {
      setIsAuthenticated(true);
      setUser(currentUser);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
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
