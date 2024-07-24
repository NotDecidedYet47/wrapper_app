import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { AuthContextProvider } from "@/contexts/AuthContext";

const MainLayout = () => {
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
