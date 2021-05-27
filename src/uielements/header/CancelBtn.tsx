import React from "react";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../theme/colors";
import { Text } from "react-native-elements";
import { TouchableOpacity } from "react-native";


type CancelBtnProps = {
	onClick: () => void,
	color?: string,
	text?: string
}

const styles = StyleSheet.create({
	container: {
		alignSelf: 'flex-end',
		paddingVertical: 10,
		flexDirection: 'row',
		textAlign: "right"
	},
	cross: {
		paddingLeft: 5,
		textAlign: "right"
	},
	text: {
		paddingLeft: 5,
		textAlign: "right"
	}
})

export const CancelBtn = (props: CancelBtnProps) => {
	return (
		<TouchableOpacity
			onPress={props.onClick}
			style={styles.container}
		>
			<Text style={{ ...styles.text, color: props?.color || colors.text}}>{props.text || 'Cancel'}</Text>
			<AntDesign
				style={styles.cross}
				name="close"
				size={26}
				color={props?.color || colors.text}
			/>
		</TouchableOpacity>
	);
};