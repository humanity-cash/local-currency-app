import React from 'react';
import { View, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

type DotsProps = {
	selected: number,
	length: number,
}

const styles = StyleSheet.create({
	box: {
		width: 15,
		marginTop: 5,
		marginHorizontal: 2,
	},
	circle: {
		width: 8,
		height: 8,
		borderWidth: 2,
		backgroundColor: colors.white,
		borderColor: colors.white,
		opacity: 0.5,
		borderRadius: 15
	},
	circleFilled: {
		backgroundColor: colors.white,
		borderColor: colors.white,
		opacity: 1
	}
})

export const Dots = (props: DotsProps) => {

	const renderDots = () => {
		let elements = [];
		for (let i = 0; i < props.length; i += 1) {
			elements.push(
				<View style={styles.box} key={i}>
					<View style={[styles.circle, props.selected === i ? styles.circleFilled : {}]}/>
				</View>
			);
		}
		return elements;
	}

	return (
		<View style={{ flexDirection: 'row' }}>{renderDots()}</View>
	)
}