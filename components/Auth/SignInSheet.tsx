import React, { forwardRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  useColorScheme,
} from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import useGoogleAuth from "@/hooks/useGoogleAuth";

const SignInSheet = forwardRef<ActionSheetRef, {}>((_, ref) => {
  const { signInWithGoogle } = useGoogleAuth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <ActionSheet
      ref={ref}
      containerStyle={{
        backgroundColor: isDark ? "#111827" : "#fff",
      }}
    >
      <View className="flex-grow pt-3" />
      <Text className="text-center text-gray-900 font-semibold dark:text-gray-200">
        로그인 방법 선택
      </Text>

      {/* OAuth Login Section */}
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
            source={
              isDark
                ? require("../../assets/images/google_dark.png")
                : require("../../assets/images/google.png")
            }
          />
          <Text className="font-semibold text-gray-800 dark:text-gray-100">
            구글로 로그인
          </Text>
        </TouchableOpacity>
        {/* TODO: 이메일 로그인 지원 */}
        {/* <TouchableOpacity className="flex-row justify-center items-center border border-gray-500 h-14 rounded-lg">
          <AntDesign
            style={{ position: "absolute", left: wp(5) }}
            name="mail"
            size={24}
            color="gray"
          />
          <Text className="font-semibold text-gray-800">이메일로 로그인</Text>
        </TouchableOpacity> */}
      </View>

      <View
        className="mt-1 flex-row justify-center items-center gap-2"
        style={{ paddingVertical: hp(4) }}
      >
        <Text className="text-gray-500 dark:text-gray-300">
          계정이 기억나지 않나요?
        </Text>
        <Text className="underline text-gray-500 dark:text-gray-300 font-semibold">
          계정찾기
        </Text>
      </View>
      <View className="flex-grow pb-3" />
    </ActionSheet>
  );
});

export default SignInSheet;
