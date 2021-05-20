import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../theme/colors";

interface SettingsListItemProps {
	onPress: () => void,
	name: string,
	hideArrow?: boolean
	textStyle?: any
}

const styles = StyleSheet.create({
	view: {
		marginTop: 3,
		backgroundColor: colors.white,
		padding: 0,
		flexDirection: 'row',
		paddingHorizontal: 10
	},
	text: {
		fontSize: 20,
		lineHeight: 60,
		paddingLeft: 10,
		flex: 1,
		fontFamily: 'IBMPlexSansSemiBold',
	},
	arrow: {
		marginVertical: 20
	}
})

export const SettingsListItem = (props: SettingsListItemProps) => {
	return (
		<TouchableWithoutFeedback onPress={props.onPress}>
			<View style={styles.view}>
				<Text style={{ ...styles.text, ...props.textStyle}}>{props.name}</Text>
				{!props.hideArrow && (
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