import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useEffect, useRef, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import MultiSelect from "@/components/Common/MultiSelect";
import { job_items } from "@/constants/Jobs";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const profile = () => {
  const multiSelctRef = useRef(null);
  const [name, setName] = useState("");
  const [selectedJobItems, setSelectedJobItems] = useState<number[]>([]);
  const canNextStep = name && selectedJobItems.length > 0;
  const router = useRouter();

  const jobList = job_items.flatMap((item) => item.children);

  useEffect(() => {
    const user = auth().currentUser;
    const userDoc = firestore().collection("users").doc(user.uid);

    if (userDoc) {
      router.replace("home");
    }
  }, []);

  const saveUserInfo = async () => {
    const user = auth().currentUser;

    const userDoc = firestore().collection("users").doc(user.uid);

    const selectedJobNames = selectedJobItems
      .map((id) => {
        const job = jobList.find((job) => job.id === id);
        return job ? job.name : "";
      })
      .filter((name) => name !== "");

    try {
      await userDoc.set({
        name,
        job: selectedJobNames,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      console.log("User info saved successfully");
      router.replace("home");
    } catch (error) {
      console.error("Error saving user info:", error);
    }
  };

  const onSelectedJobsChange = (item) => {
    if (selectedJobItems.includes(item)) {
      return Alert.alert("중복된 직무입니다.");
    }

    if (selectedJobItems.length > 5) {
      return Alert.alert("최대 5개까지 선택가능 합니다.");
    }

    if (selectedJobItems.length < 5) {
      setSelectedJobItems([...selectedJobItems, item].flat());
    }
  };

  const onDeleteJob = (id: number) =>
    setSelectedJobItems((prev) => prev.filter((prevId) => prevId !== id));

  return (
    <View style={{ paddingTop: hp(8) }} className="h-full">
      <View style={{ paddingHorizontal: wp(3) }}>
        <Text className="font-bold text-2xl">반갑습니다, 회원님!</Text>
        <Text className="font-bold text-2xl">이름과 직무를 알려주세요</Text>
      </View>
      <View style={{ paddingHorizontal: wp(5) }} className="flex-col gap-4 ">
        <View className="flex-col pt-6">
          <View className="flex-row gap-2">
            <Text className="text-xs font-semibold text-gray-700">이름</Text>
            <Text className="text-red-500 font-bold">*</Text>
          </View>
          <TextInput
            className="py-2 border-b-2 border-gray-600 focus:border-blue-500"
            style={{ width: wp(88) }}
            placeholder="예)홍길동"
            value={name}
            onChangeText={(val) => setName(val)}
          />
        </View>
        <View className="flex-col pt-6">
          <View className="flex-row justify-between">
            <View className="flex-row gap-2">
              <Text className="text-xs font-semibold text-gray-700">직무</Text>
              <Text className="text-red-500 font-bold">*</Text>
            </View>
            <Text className="text-orange-500 text-xs">최대 5개 선택 가능</Text>
          </View>
          <MultiSelect
            ref={multiSelctRef}
            items={job_items}
            selectText={
              jobList.find((job) => job.id === selectedJobItems[0])?.name ||
              "해당하시는 직무를 선택하세요."
            }
            searchPlaceholderText="키워드로 직무를 검색하세요."
            onSelectedItemsChange={onSelectedJobsChange}
          />
          {selectedJobItems.length > 0 && (
            <View className="pt-2">
              {selectedJobItems.slice(1).map((id) => (
                <View
                  key={id}
                  className="flex-row justify-between items-center"
                >
                  <TextInput
                    className="py-2 border-b-2 border-gray-600 focus:border-blue-500"
                    style={{ width: wp(80) }}
                    placeholder={jobList.find((job) => job.id === id)?.name}
                  />
                  <TouchableOpacity
                    className="mt-2"
                    onPress={() => onDeleteJob(id)}
                  >
                    <AntDesign name="minuscircleo" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity
                className={`flex-row justify-center items-center h-14 rounded-lg bg-orange-500`}
                style={{ marginTop: hp(2) }}
                onPress={() => multiSelctRef.current._toggleSelector()}
              >
                <Text className="font-semibold text-white">직무 추가</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: hp(2),
          paddingHorizontal: wp(2),
        }}
        className="w-full"
      >
        <TouchableOpacity
          className={`w-full flex-row justify-center items-center bg-${
            canNextStep ? "blue-500" : "gray-400"
          } h-14 rounded-lg`}
          onPress={saveUserInfo}
        >
          <Text className="font-semibold text-white">다음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default profile;
