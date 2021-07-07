import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { colors } from "src/theme/colors";

type BackBtnProps = {
	onClick?: () => void,
	color?: string
	text?: string
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		flexDirection: 'row',
		alignItems: "center"
	},
	arrow: {
		paddingLeft: 10
	},
	text: {
		paddingLeft: 10,

		textAlignVertical: "center"
	}
})

const BackBtn = (props: BackBtnProps) => {
	const navigation = useNavigation();
	return (
		<TouchableOpacity
			onPress={props.onClick || (() => navigation.goBack())}
			style={styles.container}
		>
			<AntDesign
				style={styles.arrow}
				name="arrowleft"
				size={20}
				color={props.color || colors.text}
			/>
			<Text style={{...styles.text, color: props.color || colors.text }}>{props.text || 'Back'}</Text>
		</TouchableOpacity>
	);
};

export default BackBtn;