import React, { ReactElement } from 'react';
import { Dimensions, View, StyleSheet } from "react-native";
import { Overlay } from 'react-native-elements';
import { colors } from "src/theme/colors";

type ModalProps = {
	visible?: boolean,
	children: ReactElement,
	style?: any,
	onShow?: () => void
}

const styles = StyleSheet.create({
	modalWrap: {
		position: "absolute",
		bottom: 0,
		width: '100%',
		height: '100%',
		backgroundColor: colors.lightBg,
		borderWidth: 0,
		padding: 0,
	},
	modalView: {
		flex: 1,
		overflow: "hidden",
	},
});

export const MODAL_SCREEN_OFFSET = Dimensions.get('screen').height * 0.06;

const Modal = ({ visible = false, style = {}, children, onShow }: ModalProps) => {
	return (
		<Overlay
			isVisible={visible}
			overlayStyle={{
				...styles.modalWrap,
				...style
			}}
			backdropStyle={{
				backgroundColor: 'transparent'
			}}
			animationType="slide"
			onShow={() => onShow && onShow()}
		>
			<View style={styles.modalView}>
				{children}
			</View>
		</Overlay>
	);
}

export default Modal;