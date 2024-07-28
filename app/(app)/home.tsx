import { View } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { WebView } from "react-native-webview";

function home() {
  const { user } = useAuth();

  return (
    <View className="flex-1 dark:bg-gray-900">
      <WebView
        source={{ uri: "http://10.0.2.2:3000" }}
        allowsBackForwardNavigationGestures={true}
        pullToRefreshEnabled={true}
        automaticallyAdjustContentInsets={false}
        allowsFullscreenVideo={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
}

export default home;
