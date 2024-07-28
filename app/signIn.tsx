import { useRef } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { ActionSheetRef } from "react-native-actions-sheet";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import SignInSheet from "@/components/Auth/SignInSheet";

export default function signIn() {
  const signInSheetRef = useRef<ActionSheetRef>(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View className="flex-1 dark:bg-black">
      <View
        style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}
        className="flex-1"
      >
        {/* SignIn Image */}
        <View className="items-center">
          <Image
            style={{ width: wp(85), height: hp(50) }}
            resizeMode="contain"
            source={
              isDark
                ? require("../assets/images/Job_hunt_dark.png")
                : require("../assets/images/Job_hunt.png")
            }
          />
        </View>
        <View className="items-center">
          <Text className="text-gray-400  text-sm">잡헌터</Text>
        </View>
        <View className="items-center mt-4">
          <Text className="font-bold text-lg dark:text-white">
            모든 구직자 여러분을 응원합니다!
          </Text>
          <Text className="font-bold text-lg dark:text-white">
            꿈을 향한 여정을 함께해요.
          </Text>
        </View>
        <View className="flex-row gap-2 mt-12">
          <TouchableOpacity
            style={{ height: hp(5.5) }}
            className="flex-1 justify-center items-center border rounded-lg dark:bg-gray-500"
            onPress={() => signInSheetRef.current?.show()}
          >
            <Text className="font-semibold dark:text-white">로그인</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={{ height: hp(5.5) }}
            className="flex-1 justify-center items-center border rounded-lg bg-black dark:bg-white"
            onPress={() => router.push("signUp")}
          >
            <Text className="text-white font-semibold dark:text-black">
              회원가입
            </Text>
          </TouchableOpacity> */}
        </View>
        <View
          style={{ marginTop: hp(1) }}
          className="flex-row justify-center items-center gap-2"
        >
          <Text className="text-gray-500">계정이 기억나지 않나요?</Text>
          <Text className="underline text-gray-500 font-semibold">
            계정찾기
          </Text>
        </View>
      </View>
      <SignInSheet ref={signInSheetRef} />
    </View>
  );
}
