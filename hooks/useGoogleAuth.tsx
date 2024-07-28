import { useEffect } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import auth from "@react-native-firebase/auth";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

const useGoogleAuth = () => {
  const router = useRouter();

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

  return { signInWithGoogle };
};

export default useGoogleAuth;
