import { Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const Step3 = () => {
  return (
    <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}>
      <Text>STEP3</Text>
    </View>
  );
};

export default Step3;
