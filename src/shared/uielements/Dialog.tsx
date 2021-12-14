import React, { ReactElement } from 'react';
import { Dimensions, View, StyleSheet, SafeAreaView } from 'react-native';
import { Overlay } from 'react-native-elements';
import { CancelBtn } from "src/shared/uielements/header";
import { colors } from "src/theme/colors";
import { IMap } from 'src/utils/types';

type DialogProps = {
	visible: boolean,
	children: ReactElement,
	backgroundStyle?: IMap,
	style?: IMap,
	hiddenCloseBtn?: boolean,
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
		top: 10,
		right: 20
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	dialogWrap: {
		width: '90%',
		height: 350,
		alignSelf: 'center',
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
		width: '100%',
		height: '100%',
		flex: 1,
		borderRadius: 20,
	},
});

const Dialog = ({visible = false, onClose, backgroundStyle={}, style = {}, children, hiddenCloseBtn=false, onShow }: DialogProps): JSX.Element => {

	return (
		<Overlay
			isVisible={visible}
			overlayStyle={{...styles.dialogBg, ...backgroundStyle}}
			backdropStyle={{
				backgroundColor: 'transparent'
			}}
			animationType="slide"
			onShow={() => onShow && onShow()}
		>
			<View style={styles.container}>
				{!hiddenCloseBtn && <SafeAreaView style={styles.closeBtn}>
					<CancelBtn text="Close" color={colors.white} onClick={() => onClose && onClose()} />
				</SafeAreaView>}
				<View style={{
					...styles.dialogWrap,
					...style
				}}>
					<View style={styles.dialogView}>
						{children}
					</View>
				</View>
			</View>
		</Overlay>
	);
}

export default Dialog;