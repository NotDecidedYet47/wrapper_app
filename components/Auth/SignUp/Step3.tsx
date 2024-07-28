import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const Step3 = ({ onNext }) => {
  const router = useRouter();

  return (
    <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}>
      <TouchableOpacity className="w-6 h-6" onPress={() => router.back()}>
        <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <View style={{ paddingTop: hp(2), paddingHorizontal: wp(2) }}>
        <Text className="font-bold text-2xl">사용할 이메일을 입력하고</Text>
        <Text className="font-bold text-2xl">비밀번호를 설정하세요</Text>
      </View>

      <View
        className="flex-col gap-4"
        style={{ paddingTop: hp(4), paddingHorizontal: wp(2) }}
      >
        <TextInput
          textContentType="telephoneNumber"
          className="py-2 border-b-2 border-gray-600 focus:border-blue-500"
          style={{ width: wp(80) }}
          placeholder="이메일을 입력하세요."
        />
        <TextInput
          textContentType="telephoneNumber"
          className="py-2 border-b-2 border-gray-600 focus:border-blue-500"
          style={{ width: wp(80) }}
          placeholder="사용하실 비밀번호를 입력하세요."
        />
      </View>
    </View>
  );
};

export default Step3;
