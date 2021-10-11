import React, { ReactElement } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from 'react-native-elements';

export const MODAL_HEADER_HEIGHT = Dimensions.get("window").height * 0.08;

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		height: MODAL_HEADER_HEIGHT,
		paddingVertical: 5
	},
	leftContainer: {
		textAlignVertical: "center",
		flex: 1,
		alignContent: "flex-start"
	},
	leftText: {
		lineHeight: MODAL_HEADER_HEIGHT,
		textAlign: "left"
	},
	rightContainer: {
		textAlign: "right",
		height: MODAL_HEADER_HEIGHT,
		textAlignVertical: "center",
		flex: 1,
		paddingHorizontal: 15
	},
	rightText: {
		lineHeight: MODAL_HEADER_HEIGHT,
		textAlign: "right"
	}
});

type ModalHeaderProps = {
	onRightComponentPress?: () => void;
	onLeftComponentPress?: () => void;
	leftComponent?: string | ReactElement,
	rightComponent?: string | ReactElement,
}

const ModalHeader = (props: ModalHeaderProps) => {
	return (
		<View style={styles.header}>
			{props.leftComponent && (
				<View style={styles.leftContainer}>
					{typeof props.leftComponent === 'string' && (
						<TouchableOpacity onPress={props.onLeftComponentPress}>
							<Text h2 style={styles.leftText}>{props.leftComponent}</Text>
						</TouchableOpacity>
					)}
					{typeof props.leftComponent !== 'string' && props.leftComponent}
				</View>
			)}
			{props.rightComponent && (
				<View style={styles.rightContainer}>
					{typeof props.rightComponent === 'string' && (
						<TouchableOpacity onPress={props.onRightComponentPress}>
							<Text h2 style={styles.rightText}>{props.rightComponent}</Text>
						</TouchableOpacity>
					)}
					{typeof props.rightComponent !== 'string' && (
						<View>{props.rightComponent}</View>
					)}
				</View>
			)}
		</View>
	);
}

export default ModalHeader;