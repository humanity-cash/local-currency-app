import { AntDesign } from "@expo/vector-icons";
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-elements";
import { colors } from "src/theme/colors";
import { FontFamily } from "src/theme/elements";

interface ClientDetailsCardProps {
	onPress?: () => void,
	name: string,
	value: string,
	disabled?: boolean
}

const styles = StyleSheet.create({
	view: {
		marginTop: 3,
		backgroundColor: colors.white,
		padding: 0,
		flexDirection: 'row',
		paddingHorizontal: 10,
		paddingVertical: 10
	},
	text: {
		fontSize: 20,
		lineHeight: 30,
		flex: 1,
		fontFamily: FontFamily.bold,
	},
	arrow: {
		marginVertical: 20
	}
})

const ClientDetailsCard = (props: ClientDetailsCardProps) => {
	return (
		<TouchableWithoutFeedback onPress={props.onPress}>
			<View style={{ ...styles.view, opacity: props.disabled ? 0.7 : 1 }}>
				<View style={{ flex: 1, marginVertical: 10 }}>
					<Text h3>{props.name}</Text>
					<Text style={styles.text}>{props.value}</Text>
				</View>
				{!props.disabled && (
					<AntDesign
						style={styles.arrow}
						name="arrowright"
						size={20}
						color={colors.text}
					/>
				)}
			</View>
		</TouchableWithoutFeedback>
	)
}

export default ClientDetailsCard;