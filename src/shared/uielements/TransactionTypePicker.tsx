import React, { useState, useEffect } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "src/theme/colors";
import { CheckBox } from "react-native-elements";

type TransactionTypePickerProps = {
  items: string[];
  selected?: boolean[];
  setSelected?: (selected: boolean[]) => void;
  style?: any;
};

const styles = StyleSheet.create({
  container: {
    marginTop: 7,
    backgroundColor: colors.white,
    borderRadius: 3,
    padding: 20,
    borderWidth: 1
  },
  checkboxContainer: {
    borderWidth: 0,
    backgroundColor: "transparent"
  },
  itemView: {
    flexDirection: "row",
    alignItems: "center"
  },
  selectedText: {
    flex: 1,
    fontSize: 16,
    color: colors.purple
  }
});

const TransactionTypePicker = ({
  items,
  selected,
  setSelected,
  style
}: TransactionTypePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [typeText, setTypeText] = useState("");

  useEffect(() => {
    if (selected) {
      let txt = "";
      if (selected[0]) {
        setTypeText("All");
        return;
      }

      for (let i = 0; i < selected.length; i++) {
        if (selected[i]) {
          if (txt.length > 0) {
            txt += ", ";
          }
          txt += items[i];
        }
      }

      setTypeText(txt);
    }
  }, selected);

  const renderTypeItem = (index: number, item: string): any => {
    const setAllCheck = (isCheck: boolean) => {
      const checks: boolean[] = [];
      for (let i = 0; i < selected!.length; i++) {
        checks.push(isCheck);
      }

      setSelected!(checks);
    };

    const checkAllCheck = (checks: boolean[]) => {
      let isAllCheck = true;
      let isAllUncheck = true;

      for (let i = 1; i < checks.length; i++) {
        if (checks[i]) {
          isAllUncheck = false;
        } else {
          isAllCheck = false;
        }
      }

      if (isAllCheck) {
        setAllCheck(true);
      } else if (isAllUncheck) {
        setAllCheck(false);
      } else {
        checks[0] = false;
        setSelected!(checks);
      }
    };

    const updateSelectCheck = (checks: boolean[]) => {
      if (index === 0) {
        setAllCheck(checks[0]);
      } else {
        checkAllCheck(checks);
      }
    };

    const onPressCheck = () => {
      if (selected && setSelected) {
        const checks = [...selected];
        checks[index] = !checks[index];
        updateSelectCheck(checks);
      }
    };

    return (
      <View key={index} style={styles.itemView}>
        <CheckBox
          checked={selected ? selected[index] : false}
          title={item}
          containerStyle={styles.checkboxContainer}
          checkedColor={colors.darkGreen}
          onPress={onPressCheck}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        ...styles.container,
        ...style,
        borderColor: isOpen ? colors.purple : "transparent"
      }}
    >
      <TouchableOpacity
        onPress={() => {
          setIsOpen(!isOpen);
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={[
              styles.selectedText,
              { opacity: typeText.length > 0 ? 1 : 0.4 }
            ]}
            numberOfLines={1}
          >
            {typeText.length > 0 ? typeText : "Select"}
          </Text>
          <EvilIcons
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={32}
            color={colors.darkGreen}
          />
        </View>
      </TouchableOpacity>
      {isOpen &&
        items?.map((item, index) => {
          return renderTypeItem(index, item);
        })}
    </View>
  );
};

export default TransactionTypePicker;
