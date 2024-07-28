import { View, Text, TouchableOpacity } from "react-native";
import auth from "@react-native-firebase/auth";
import { useAuth } from "@/contexts/AuthContext";

function home() {
  const { logout } = useAuth();

  return (
    <View>
      <TouchableOpacity onPress={logout} className="p-4 bg-red-500">
        <Text>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
}

export default home;
