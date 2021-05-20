import React from "react";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../theme/colors";
import { Text } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

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

export const BackBtn = (props: BackBtnProps) => {
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