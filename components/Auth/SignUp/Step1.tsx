import { useState } from "react";
import { useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import CountryCode from "../CountryCode";

interface Props {
  onNext: () => void;
}

const Step1 = ({ onNext }: Props) => {
  const router = useRouter();
  const [countryCode, setCountryCode] = useState("+82");
  const [showCountry, setShowContry] = useState(false);

  return (
    <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}>
      <TouchableOpacity className="w-6 h-6" onPress={() => router.back()}>
        <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <View style={{ paddingTop: hp(2), paddingHorizontal: wp(2) }}>
        <Text className="font-bold text-2xl">본인 확인을 위해</Text>
        <Text className="font-bold text-2xl">전화번호를 입력해주세요</Text>
      </View>

      <View
        className="relative flex-col gap-2"
        style={{ paddingTop: hp(4), paddingHorizontal: wp(2) }}
      >
        <View className="flex-row gap-2 items-end">
          <CountryCode
            countryCode={countryCode}
            show={showCountry}
            setShow={setShowContry}
            handleCountryCode={setCountryCode}
          />
          <TextInput
            className="py-2 border-b-2 border-gray-600 focus:border-blue-500"
            style={{ width: wp(65) }}
            placeholder="핸드폰 번호를 입력하세요."
            // onChangeText={(val) => phoneNumRef.current === val}
            keyboardType="phone-pad"
          />
          <TouchableOpacity
            className="absolute border border-blue-500 rounded-lg px-2 py-1"
            style={{ bottom: hp(1), right: hp(2) }}
          >
            <Text className="text-xs font-semibold text-blue-500">
              인증하기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Step1;
