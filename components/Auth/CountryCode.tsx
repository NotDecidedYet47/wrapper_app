import { Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { CountryPicker, CountryItem } from "react-native-country-codes-picker";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  countryCode: string;
  show: boolean;
  setShow: (show: boolean) => void;
  handleCountryCode: (code: string) => void;
}

const CountryCode = ({
  countryCode,
  show,
  setShow,
  handleCountryCode,
}: Props) => {
  return (
    <View>
      <TouchableOpacity
        className="flex-row gap-2 items-center py-2 border-b-2 border-gray-600"
        onPress={() => setShow(true)}
      >
        <Text>{countryCode}</Text>
        <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
      </TouchableOpacity>
      <CountryPicker
        style={{ modal: { height: hp(40) } }}
        inputPlaceholder="어느 나라에 살고계신가요?"
        show={show}
        lang="en"
        pickerButtonOnPress={(item) => {
          handleCountryCode(item.dial_code);
          setShow(false);
        }}
        popularCountries={["kr", "en"]}
      />
    </View>
  );
};

export default CountryCode;
