import React, { ReactElement } from 'react';
import { Dimensions, View, StyleSheet } from "react-native";
import { Overlay } from 'react-native-elements';
import { colors } from "src/theme/colors";
import { useDialogStatus } from "src/hooks";

type DialogProps = {
	children: ReactElement,
	style?: any,
	onShow?: () => void
}

export const DIALOG_SCREEN_OFFSET = Dimensions.get('screen').height * 0.06;

const styles = StyleSheet.create({
	dialogWrap: {
		position: "absolute",
		width: '90%',
		minHeight: 300,
		borderRadius: 20,
		backgroundColor: colors.white,
		shadowColor: colors.black,
		borderColor: colors.black,
		borderWidth: 0,
		shadowOffset: { width: 2, height: 2 },
		shadowRadius: 5,
		shadowOpacity: 0.5,
		padding: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
	dialogView: {
		flex: 1,
		overflow: "hidden",
		borderRadius: 20,
	},
});

const Dialog = ({style = {}, children, onShow }: DialogProps) => {

	const { properties } = useDialogStatus();

	return (
		<Overlay
			isVisible={properties.visible}
			overlayStyle={{
				...styles.dialogWrap,
				...style
			}}
			backdropStyle={{
				backgroundColor: 'transparent'
			}}
			animationType="slide"
			onShow={() => onShow && onShow()}
		>
			<View style={styles.dialogView}>
				{children}
			</View>
		</Overlay>
	);
}

export default Dialog;