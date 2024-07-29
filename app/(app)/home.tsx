import { View } from "react-native";
import { WebView } from "react-native-webview";

function home() {
  return (
    <View className="flex-1">
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
