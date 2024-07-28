import { useState } from "react";
import { useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { MaterialIcons } from "@expo/vector-icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import CountryCode from "../CountryCode";
import useMultiFactorAuth from "@/hooks/useMultiFactorAuth";

interface Props {
  onNext: () => void;
}

const TEST_PHONE_NUMBER = "+1 555-123-4567";
const TEST_CODE = "450976";

const Step1 = ({ onNext }: Props) => {
  const router = useRouter();
  // Default : Republic of Korea (+82)
  const [showCountry, setShowContry] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");
  const {
    verificationId,
    phoneNumber,
    setPhoneNumber,
    signUpWithPhoneNumber,
    confirmCode,
    setCode,
  } = useMultiFactorAuth(onNext);

  const onPressToAuthenticate = () => {
    const fullPhoneNum = `${countryCode} ${phoneNumber}`;
    signUpWithPhoneNumber(fullPhoneNum);
  };

  const handleCodeInputChange = (val: string) => {
    setCode(val);
  };

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
            textContentType="telephoneNumber"
            className="py-2 border-b-2 border-gray-600 focus:border-blue-500"
            style={{ width: wp(65) }}
            placeholder="핸드폰 번호를 입력하세요."
            onChangeText={(val) => setPhoneNumber(val)}
            keyboardType="phone-pad"
          />
          <TouchableOpacity
            className="absolute border border-blue-500 rounded-lg px-2 py-1"
            style={{ bottom: hp(1), right: hp(2) }}
            onPress={onPressToAuthenticate}
          >
            <Text className="text-xs font-semibold text-blue-500">
              인증하기
            </Text>
          </TouchableOpacity>
        </View>
        {verificationId && (
          <View className="flex-col pt-4">
            <Text className="text-sm">인증 번호</Text>
            <TextInput
              className="py-2 border-b-2 border-gray-600 focus:border-blue-500"
              style={{ width: wp(80) }}
              placeholder="6자리 숫자 입력"
              maxLength={6}
              onChangeText={handleCodeInputChange}
              keyboardType="phone-pad"
            />
            <TouchableOpacity
              className="absolute border border-blue-500 rounded-lg px-2 py-1"
              style={{ bottom: hp(1), right: hp(2) }}
              onPress={confirmCode}
            >
              <Text className="text-xs font-semibold text-blue-500">확인</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default Step1;
