import { useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Alert } from "react-native";

const useMultiFactorAuth = (onNext?: () => void) => {
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [code, setCode] = useState("");

  const signUpWithPhoneNumber = async (phoneNum: string) => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNum);
      setVerificationId(confirmation.verificationId);
      Alert.alert("Verification code sent!");
    } catch (error) {
      console.error("Error sending code:", error);
      Alert.alert("Error sending verification code");
    }
  };

  const confirmCode = async () => {
    if (!verificationId) {
      Alert.alert("No verification ID available");
      return;
    }

    try {
      const credential = auth.PhoneAuthProvider.credential(
        verificationId,
        code
      );
      await auth().signInWithCredential(credential);
      onNext();
    } catch (error) {
      console.error("Invalid code:", error);
      Alert.alert("Invalid verification code");
    }
  };

  return {
    verificationId,
    phoneNumber,
    setPhoneNumber,
    signUpWithPhoneNumber,
    confirmCode,
    setCode,
  };
};

export default useMultiFactorAuth;
