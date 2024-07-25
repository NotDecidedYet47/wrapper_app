import React, { forwardRef } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { AntDesign } from "@expo/vector-icons";

const SignInSheet = forwardRef<ActionSheetRef, {}>((props, ref) => {
  return (
    <ActionSheet ref={ref}>
      <View className="flex-grow pt-3" />
      <Text className="text-center text-gray-600 font-semibold">
        로그인 방법 선택
      </Text>

      {/* OAuth Login Section */}
      {/* <View className="pt-3 flex-row justify-around">
        <TouchableOpacity className="w-10 h-10 justify-center items-center border border-gray-500 rounded-full">
          <Image source={require("../../assets/images/google.png")} />
        </TouchableOpacity>
        <TouchableOpacity className="w-10 h-10 justify-center items-center border border-gray-500 rounded-full">
          <AntDesign name="github" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="w-10 h-10 justify-center items-center border border-blue-500 rounded-full bg-blue-500">
          <FontAwesome name="facebook-f" size={24} color="white" />
        </TouchableOpacity>
      </View> */}

      <View className="pt-3 px-10">
        <TouchableOpacity className="h-12 flex-row justify-center items-center border border-gray-400 rounded-lg bg-white">
          <AntDesign name="mail" size={24} color="gray" />
          <Text className="text-gray-500 font-semibold ml-8">
            이메일로 로그인
          </Text>
        </TouchableOpacity>
      </View>
      <View className="mt-1 flex-row justify-center items-center gap-2">
        <Text className="text-gray-500">계정이 기억나지 않나요?</Text>
        <Text className="underline text-gray-500 font-semibold">계정찾기</Text>
      </View>
      <View className="flex-grow pb-3" />
    </ActionSheet>
  );
});

export default SignInSheet;
