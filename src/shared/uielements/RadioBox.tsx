import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "src/theme/colors";
import { IMap } from "src/utils/types";

interface RadioBoxProps {
  selected: boolean,
  onPress: () => void;
  style?: IMap;
  circleStyle?: IMap;
}

const RadioBox = (props: RadioBoxProps): JSX.Element => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
    >
      <View
        style={{
          ...styles.container,
          ...props.style
        }}
      >
        { props.selected &&
          <View
            style={{
              ...styles.circleView,
              ...props.circleStyle
            }}
          />
        }
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 28,
    height: 28,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.purple,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circleView: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.purple
  }
});

export default RadioBox;
