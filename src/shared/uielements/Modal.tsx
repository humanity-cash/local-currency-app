import React, { ReactElement } from 'react';
import { Dimensions, View } from "react-native";
import { Overlay } from 'react-native-elements';
import { colors } from "src/theme/colors";

type ModalProps = {
	visible?: boolean,
	children: ReactElement,
	style?: any,
	onShow?: () => void
}

export const MODAL_SCREEN_OFFSET = Dimensions.get('screen').height * 0.06;

const Modal = ({ visible = false, style = {}, children, onShow }: ModalProps) => {
	return (
		<Overlay
			isVisible={visible}
			overlayStyle={{
				position: "absolute",
				bottom: 0,
				width: '100%',
				height: '100%',
				backgroundColor: colors.lightBg,
				shadowColor: colors.black,
				borderColor: colors.black,
				borderWidth: 0,
				shadowOffset: { width: 2, height: 2 },
				shadowRadius: 5,
				shadowOpacity: 0.5,
				padding: 0,
				...style
			}}
			backdropStyle={{
				backgroundColor: 'transparent'
			}}
			animationType="slide"
			onShow={() => onShow && onShow()}
		>
			<View style={{
				flex: 1,
				overflow: "hidden"
			}}>
				{children}
			</View>
		</Overlay>
	);
}

export default Modal;