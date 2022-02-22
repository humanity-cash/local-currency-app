import React, { RefObject } from "react";
import {
  TextInput,
  StyleSheet,
  ReturnKeyTypeOptions,
  KeyboardTypeOptions,
  Keyboard,
} from "react-native";
import { colors } from "src/theme/colors";

type BlockInputProps = {
  onChange: any;
  name?: string;
  placeholder?: string;
  placeholderTextColor?: any;
  value: any;
  style?: any;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  onKeyPress?: any;
  maxLength?: number;
  inputRef?: RefObject<TextInput>;
  returnKeyType?: ReturnKeyTypeOptions;
  onSubmitEditing?: () => void;
};

const styles = StyleSheet.create({
  container: {
    height: 55,
    fontSize: 16,
    backgroundColor: colors.inputBg,
    borderRadius: 3,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginVertical: 8,
    borderWidth: 0,
    color: colors.text,
  },
});

class BlockInput extends React.Component<BlockInputProps> {
  render() {
    return (
      <TextInput
        ref={this.props.inputRef}
        style={{
          ...styles.container,
          ...this.props.style,
        }}
        secureTextEntry={this.props.secureTextEntry || false}
        placeholderTextColor={this.props.placeholderTextColor || colors.grey1}
        keyboardType={this.props.keyboardType || "default"}
        placeholder={this.props.placeholder ? this.props.placeholder : ""}
        onChangeText={(newValue) =>
          this.props.onChange(this.props.name, newValue)
        }
        value={this.props.value}
        onKeyPress={this.props.onKeyPress}
        maxLength={this.props.maxLength}
        autoCapitalize="none"
        autoCorrect={false}
        blurOnSubmit={false}
        returnKeyType={this.props.returnKeyType || "done"}
        onSubmitEditing={this.props.onSubmitEditing || Keyboard.dismiss}
      />
    );
  }
}

export default BlockInput;
