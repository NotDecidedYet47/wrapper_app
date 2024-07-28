import { useState } from "react";
import { View } from "react-native";
import Step1 from "@/components/Auth/SignUp/Step1";
import Step2 from "@/components/Auth/SignUp/Step2";
import Step3 from "@/components/Auth/SignUp/Step3";

export default function signUp() {
  const [step, setStep] = useState(1);

  const handleNext = () => setStep((prevStep) => prevStep + 1);

  return (
    <View className="flex-1">
      {step === 1 && <Step1 onNext={handleNext} />}
      {step === 2 && <Step2 onNext={handleNext} />}
      {step === 3 && <Step3 onNext={handleNext} />}
    </View>
  );
}
