import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-elements";
import { colors } from "src/theme/colors";
import { FilterType } from "src/utils/types";

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

const FilterCard = (props: FilterCardProps) => {
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

export default FilterCard;