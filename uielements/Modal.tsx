import React, { ReactElement } from 'react';
import { Overlay } from 'react-native-elements';
import { colors } from "../theme/colors";
import { Dimensions, View } from "react-native";

type ModalProps = {
	visible?: boolean,
	children: ReactElement,
	style?: any,
	onShow?: () => void
}

export const MODAL_SCREEN_OFFSET = Dimensions.get('screen').height * 0.06;

export const Modal = ({ visible = false, style = {}, children, onShow }: ModalProps) => {
	return (
		<Overlay
			isVisible={visible}
			overlayStyle={{
				position: "absolute",
				bottom: 0,
				width: '100%',
				height: '94%',
				borderTopStartRadius: 20,
				borderTopEndRadius: 20,
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
				overflow: "hidden",
				borderTopStartRadius: 20,
				borderTopEndRadius: 20
			}}>
				{children}
			</View>
		</Overlay>
	);
}