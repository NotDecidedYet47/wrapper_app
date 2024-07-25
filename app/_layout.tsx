import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Slot, useRouter, useSegments } from "expo-router";
import { AuthContextProvider, useAuth } from "@/contexts/AuthContext";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === undefined) return;
    const inApp = segments[0] === "app";
    if (isAuthenticated && !inApp) {
      router.replace("home");
    } else if (isAuthenticated === false) {
      router.replace("signIn");
    }
  }, [isAuthenticated]);

  return <Slot />;
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Pretendard: require("../assets/fonts/PretendardVariable.ttf"),
  });

  if (!fontsLoaded) return null;
  return (
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
  );
}
