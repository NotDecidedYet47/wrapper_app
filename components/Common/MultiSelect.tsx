import { Text, View } from "react-native";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import Icon from "@expo/vector-icons/MaterialIcons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { forwardRef } from "react";

interface Props {
  items?: unknown[];
  selectedItems?: unknown[];
  onSelectedItemsChange?: (selectedItems: unknown[]) => void;
  selectText?: string;
  searchPlaceholderText?: string;
}

const MultiSelect = forwardRef(
  (
    {
      items = [],
      selectedItems = [],
      onSelectedItemsChange = () => {},
      selectText = "해당하시는 부분을 선택하세요.",
      searchPlaceholderText = "검색어를 입력하세요.",
    }: Props,
    ref
  ) => {
    return (
      <View className="">
        <SectionedMultiSelect
          ref={ref as any}
          items={items}
          IconRenderer={Icon as unknown as React.ReactNode}
          uniqueKey="id"
          subKey="children"
          selectText={selectText}
          searchPlaceholderText={searchPlaceholderText}
          showDropDowns={true}
          onSelectedItemObjectsChange={() => {}}
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedItems}
          readOnlyHeadings
          hideConfirm
          highlightChildren
          single
          selectedText={""}
          styles={{
            selectToggle: {
              paddingHorizontal: wp(2),
              paddingVertical: hp(1.5),
              borderBottomWidth: 2,
              borderColor: "#4b5563",
            },
            cancelButton: {
              borderWidth: 1,
            },
            item: {
              paddingVertical: hp(2),
            },
            itemText: {
              fontSize: 14,
              color: "#4b5563",
              fontWeight: 400,
            },
            subItem: {
              paddingHorizontal: wp(1),
              paddingVertical: hp(2),
              borderTopWidth: 0.5,
            },
            subItemText: {
              color: "#4b5563",
              fontWeight: 600,
            },
          }}
        />
      </View>
    );
  }
);

export default MultiSelect;
