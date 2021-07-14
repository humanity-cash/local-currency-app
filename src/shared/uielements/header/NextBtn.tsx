import React, { ReactElement } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { TouchableOpacity } from "react-native";


type NextBtnProps = {
	onClick: () => void,
	render?: ReactElement,
	text?: string
}

const styles = StyleSheet.create({
	container: {
		alignSelf: 'flex-end',
		padding: 10,
		flexDirection: 'row'
	},
	arrow: {
		paddingLeft: 10
	},
	text: {
		paddingLeft: 10
	}
})

const NextBtn = (props: NextBtnProps) => {
	return (
		<TouchableOpacity
			onPress={props.onClick}
			style={styles.container}
		>
			{props?.render}
			{!props.render && (<Text style={styles.text}>{props.text}</Text>)}
		</TouchableOpacity>
	);
};

export default NextBtn;