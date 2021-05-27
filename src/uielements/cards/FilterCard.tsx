import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { FilterType } from "../../utils/types";
import { colors } from "../../theme/colors";

type FilterCardProps = {
	name: string,
	type: FilterType,
	onClick: (type: FilterType) => void,
	active: boolean
}

const styles = StyleSheet.create({
	container: {
		width: 250,
		height: 120,
		marginRight: 10,
		padding: 10,
		paddingHorizontal: 25,
		backgroundColor: colors.lightBrown
	},
	active: {
		backgroundColor: colors.textSuccess
	},
	text: {
		fontSize: 20,
		fontFamily: 'IBMPlexSansSemiBold',
		color: colors.text,
		height: 75
	},
	activeText: {
		color: colors.white
	},
	filterText: {
		textAlign: "right",
		color: colors.text
	},
});

export const FilterCard = (props: FilterCardProps) => {
	return (
		<TouchableWithoutFeedback onPress={() => props.onClick(props.type)}>
			<View style={[styles.container, props.active ? styles.active : {}]}>
				<Text style={[styles.text, props.active ? styles.activeText : {}]}>{props.name}</Text>
				<Text style={[styles.filterText, props.active ? styles.activeText : {}]}>
					{props.active ? 'Remove filter' : 'Apply filter'}
				</Text>
			</View>
		</TouchableWithoutFeedback>
	)
}