import React, { ReactElement } from 'react';
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-elements";
import { colors } from "src/theme/colors";

type BottomSheetProps = {
	visible: boolean,
	children: ReactElement,
	onClose?: () => void,
	text?: string
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		opacity: 0.8,
		backgroundColor: colors.text,
		width: '100%',
		zIndex: 100,
	},
	content: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		width: '100%',
		backgroundColor: colors.lightBg,
		zIndex: 100,
		elevation: 100,
		flex: 1,
	},
	text: {
		justifyContent: "center",
		textAlign: 'center',
		padding: 10,
		marginVertical: 20,
		fontSize: 20,
		fontFamily: 'IBMPlexSansSemiBold',
	}
})

const BottomSheet = (props: BottomSheetProps) => {
	return (
		<Modal transparent={true} visible={props.visible}>
			<TouchableWithoutFeedback onPress={() => props.onClose && props.onClose()}>
				<View style={styles.container}/>
			</TouchableWithoutFeedback>
			<View style={styles.content}>
				{props.text && (<Text style={styles.text}>{props.text}</Text>)}
				{props.children}
			</View>
		</Modal>
	)
}

export default BottomSheet;