import React, { useRef } from "react";
import {
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  KeyboardTypeOptions,
} from "react-native";
import { Text } from "react-native-elements";
import { colors } from "src/theme/colors";

type BorderedInputProps = {
  onChange: any;
  label: string;
  prefix?: string;
  name?: string;
  placeholder?: string;
  placeholderTextColor?: any;
  value: any;
  style?: any;
  textStyle?: any;
  keyboardType?: KeyboardTypeOptions;
  onKeyPress?: any;
  maxLength?: number;
  borderColor?: boolean;
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    paddingHorizontal: 15,
  },
  iconView: {
    alignItems: "center",
  },
  prefixText: {
    textAlignVertical: "center",
    fontSize: 20,
    height: 60,
    lineHeight: 60,
    textAlign: "left",
  },
  inputText: {
    textAlign: "left",
    fontSize: 20,
    paddingLeft: 15,
    borderWidth: 0,
    color: colors.text,
    flex: 1,
  },
});
const BorderedInput = (props: BorderedInputProps) => {
  const inputRef = useRef<TextInput | null>(null);

  return (
    <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
      <View
        style={[
          styles.container,
          props.style,
          {
            borderWidth: props.borderColor ? 1 : 0,
            borderColor: props.borderColor,
          },
        ]}
      >
        {props.prefix && (
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                ...styles.prefixText,
                ...props.textStyle,
              }}
            >
              {props.prefix}
            </Text>
          </View>
        )}
        <TextInput
          ref={inputRef}
          style={{
            ...styles.inputText,
            ...props.style,
          }}
          placeholderTextColor={
            props.placeholderTextColor
              ? props.placeholderTextColor
              : colors.lightGreen
          }
          keyboardType={props.keyboardType || "default"}
          placeholder={props.placeholder ? props.placeholder : ""}
          onChangeText={(newValue) => props.onChange(props.name, newValue)}
          value={props.value}
          onKeyPress={props.onKeyPress}
          maxLength={props.maxLength}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default BorderedInput;
