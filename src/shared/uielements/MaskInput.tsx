import React, { RefObject } from "react";
import {
  TextInput,
  StyleSheet,
  ReturnKeyTypeOptions,
  KeyboardTypeOptions,
  Keyboard,
} from "react-native";
import { colors } from "src/theme/colors";
import MaskedInput, { Mask } from "react-native-mask-input";

type MaskInputProps = {
  onChange: any;
  name?: string;
  placeholder?: string;
  placeholderTextColor?: any;
  value: string | undefined;
  mask: Mask | undefined;
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

class MaskInput extends React.Component<MaskInputProps> {
  render() {
    return (
      <MaskedInput
        ref={this.props.inputRef}
        style={{
          ...styles.container,
          ...this.props.style,
        }}
        secureTextEntry={this.props.secureTextEntry || false}
        placeholderTextColor={this.props.placeholderTextColor || colors.grey1}
        keyboardType={this.props.keyboardType || "default"}
        placeholder={this.props.placeholder}
        onChangeText={(masked, unmasked, obfuscated) => {
          this.props.onChange(this.props.name, unmasked); // you can use the masked value as well
        }}
        value={this.props.value ?? ""}
        mask={this.props.mask}
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

export default MaskInput;
