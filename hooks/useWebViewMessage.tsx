import { useCallback } from "react";
import { WebViewMessageEvent } from "react-native-webview";

export interface PostBridgeParams {}

interface WebviewOnMessage {
  message: keyof PostBridgeParams;
  params: PostBridgeParams[keyof PostBridgeParams];
}

export const useWebViewMessages = (handlers: {}) => {
  const onWebViewMessage = useCallback(
    (event: WebViewMessageEvent) => {
      const data = JSON.parse(event.nativeEvent.data) as WebviewOnMessage;

      switch (data.message) {
        default:
          break;
      }
    },
    [handlers]
  );

  return onWebViewMessage;
};
