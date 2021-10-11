import { AntDesign } from "@expo/vector-icons";
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-elements";
import { colors } from "src/theme/colors";

interface PersonalDetailsCardProps {
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
		fontFamily: 'IBMPlexSansSemiBold',
	},
	arrow: {
		marginVertical: 20
	}
})

const PersonalDetailsCard = (props: PersonalDetailsCardProps) => {
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

export default PersonalDetailsCard;