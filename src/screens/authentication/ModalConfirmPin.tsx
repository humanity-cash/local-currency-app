import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { BackBtn, CancelBtn, ModalHeader, PinCode } from "src/shared/uielements";
import { MODAL_SCREEN_OFFSET } from "src/shared/uielements/Modal";
import { baseHeader, modalViewBase, wrappingContainerBase } from "src/theme/elements";
import ForgotPassword from "./ForgotPassword";

type ModalConfirmPinProps = {
	navigation?: any,
	route: any,
	onClose: () => void
}

const styles = StyleSheet.create({
	headerView: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20,
		textAlign: "center"
	},
	codeView: {
		flex: 1
	},
	bottomNavigation: {
		justifyContent: "center"
	},
	bottomView: {
		height: 60,
		justifyContent: "center",
		alignItems: 'center'
	}
});

const ModalConfirmPinView = (props: ModalConfirmPinProps) => {
	const [pinValue, setPinValue] = useState('');
	const [pinMatch, setPinMatch] = useState(true);
	const { authorization: { pin } } = useUserDetails();
	const [autoFocus, setAutoFocus] = useState(true);
	const isFocused = useIsFocused();

	useEffect(() => {
		setAutoFocus(isFocused);
		setPinValue(isFocused ? pinValue : '');
	},[isFocused]);

	const { redirectTo, redirectParams = {}, onSuccess, onClose } = props.route.params;
	return (
		<View style={modalViewBase}>
			<ModalHeader
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn onClick={onClose} />}
			/>

			<View style={{ ...wrappingContainerBase, flex: 1 }}>
				<View style={ baseHeader }>
					{pinMatch && (<Text style={styles.headerView}>Confirm with your passcode</Text>)}
					{!pinMatch && (<Text style={styles.headerView}>Wrong passcode... Please try again</Text>)}
				</View>
				<View style={styles.codeView}>
					<PinCode
						value={pinValue}
						onChange={setPinValue}
						autoFocus={autoFocus}
						length={6}
						onComplete={async receivedPin => {
							setPinValue('');
							if (pin === receivedPin) {
								setAutoFocus(false);
								setPinMatch(true);
								if (redirectTo) {
									props.navigation.navigate(redirectTo, redirectParams);
								}
								if (onSuccess) {
									onSuccess();
								}
								return;
							}
							setPinMatch(false);
						}}
					/>
				</View>
			</View>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}
				keyboardVerticalOffset={MODAL_SCREEN_OFFSET}
			>
				<ForgotPassword />
			</KeyboardAvoidingView>
		</View>
	);
}

const ModalConfirmPin = (props:ModalConfirmPinProps) => {
	const navigation = useNavigation();
	return <ModalConfirmPinView {...props} navigation={navigation} />;
}
export default ModalConfirmPin