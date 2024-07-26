import { useEffect } from "react";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

const Step2 = ({ onNext }) => {
  const router = useRouter();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.GOOGLE_CLIENT_ID,
      offlineAccess: true,
    });

    // Check if the configuration is applied
    const checkConfiguration = async () => {
      try {
        const currentUser = await GoogleSignin.getCurrentUser();
        console.log("Current User:", currentUser);
      } catch (error) {
        console.error("Error getting current user:", error);
      }
    };

    checkConfiguration();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const { idToken } = await GoogleSignin.signIn();
      console.log(idToken);
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log(googleCredential);
      return auth()
        .signInWithCredential(googleCredential)
        .then(() => router.replace("profile"));
    } catch (e) {
      //  TODO: Alert Error Message
      if (e.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled the login flow");
      } else if (e.code === statusCodes.IN_PROGRESS) {
        console.log("Sign in is in progress already");
      } else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Play services not available or outdated");
      } else {
        console.log("Some other error happened", e.message);
      }
    }
  };

  return (
    <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}>
      <TouchableOpacity className="w-6 h-6" onPress={() => router.back()}>
        <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <View style={{ paddingTop: hp(2), paddingHorizontal: wp(2) }}>
        <Text className="font-bold text-2xl">소셜 계정으로 빠르고</Text>
        <Text className="font-bold text-2xl">쉽게 로그인하세요!</Text>
      </View>

      <View
        className="flex-col gap-4"
        style={{ paddingTop: hp(4), paddingHorizontal: wp(2) }}
      >
        <TouchableOpacity
          className="flex-row justify-center items-center border border-gray-500 h-14 rounded-lg"
          onPress={signInWithGoogle}
        >
          <Image
            className="absolute left-3"
            source={require("../../../assets/images/google.png")}
          />
          <Text className="font-semibold text-gray-800">구글로 계속하기</Text>
        </TouchableOpacity>
        <View className="flex-row items-center gap-2">
          <View
            className="border-b border-gray-500"
            style={{ width: wp(35) }}
          />
          <Text className="text-gray-500">또는</Text>
          <View
            className="border-b border-gray-500"
            style={{ width: wp(35) }}
          />
        </View>
        <TouchableOpacity className="flex-row justify-center items-center border border-gray-500 h-14 rounded-lg">
          <AntDesign
            style={{ position: "absolute", left: wp(6) }}
            name="mail"
            size={24}
            color="gray"
          />
          <Text className="font-semibold text-gray-800" onPress={onNext}>
            이메일로 계속하기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Step2;
