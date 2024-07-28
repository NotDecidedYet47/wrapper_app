import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Alert } from "react-native";
import { router } from "expo-router";

interface IAuthContext {
  user: FirebaseAuthTypes.User | null;
  isAuthenticated: boolean | undefined;
  signInWithGoogle: () => void;
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

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.GOOGLE_CLIENT_ID,
      offlineAccess: true,
    });
  }, []);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth()
        .signInWithCredential(googleCredential)
        .then(() => router.replace("profile"));
    } catch (e) {
      //  TODO: Alert Error Message
      if (e.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert("User cancelled the login flow");
      } else if (e.code === statusCodes.IN_PROGRESS) {
        Alert.alert("Sign in is in progress already");
      } else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert("Play services not available or outdated");
      } else {
        Alert.alert("Some other error happened", e.message);
      }
    }
  };

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
    <AuthContext.Provider
      value={{ user, isAuthenticated, signInWithGoogle, logout, register }}
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
