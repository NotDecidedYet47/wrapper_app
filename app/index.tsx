import { View, ActivityIndicator } from "react-native";

export default function index() {
  return (
    <View className="flex-1">
      <ActivityIndicator size="large" color="gray" />
    </View>
  );
}
