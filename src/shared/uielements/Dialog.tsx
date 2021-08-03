import React, { ReactElement } from 'react';
import { Dimensions, View, StyleSheet } from "react-native";
import { Overlay } from 'react-native-elements';
import { CancelBtn } from "src/shared/uielements";
import { colors } from "src/theme/colors";

type DialogProps = {
	visible: boolean,
	children: ReactElement,
	style?: any,
	onShow?: () => void,
	onClose?: () => void
}

export const DIALOG_SCREEN_OFFSET = Dimensions.get('screen').height * 0.06;

const styles = StyleSheet.create({
	dialogBg: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(57, 83, 68, 0.9)'
	},
	closeBtn: {
		position: 'absolute',
		top: 60,
		right: 20,
		zIndex: 999
	},
	dialogWrap: {
		position: "absolute",
		width: '85%',
		minHeight: 300,
		borderRadius: 20,
		backgroundColor: colors.background,
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

const Dialog = ({visible = false, style = {}, children, onShow, onClose }: DialogProps) => {

	return (
		<View style={styles.dialogBg}>
			<View style={styles.closeBtn}>
				<CancelBtn text="Close" color={colors.white} onClick={() => onClose && onClose()} />
			</View>
			<Overlay
				isVisible={visible}
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
		</View>
	);
}

export default Dialog;