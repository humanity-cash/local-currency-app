import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { BackBtn, CancelBtn, ModalHeader, PinCode } from "src/shared/uielements";
import { modalViewBase, wrappingContainerBase } from "src/theme/elements";

type ForgotPasswordNewCodeConfirmProps = {
	navigation?: any
	route?: any
}

const styles = StyleSheet.create({
	modalHeader: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20,
		paddingBottom: 10
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

const ForgotPasswordNewCodeConfirmView = (props: ForgotPasswordNewCodeConfirmProps) => {
	const [pinValue, setPinValue] = useState('');
	const [pinMatch, setPinMatch] = useState(true);
	const { authorization: { pinInput }, updateAuthorization } = useUserDetails();
	const [autoFocus, setAutoFocus] = useState(true);
	const isFocused = useIsFocused();

	useEffect(() => {
		setAutoFocus(isFocused);
		setPinValue(isFocused ? pinValue : '');
	},[isFocused]);

	return (
		<View style={modalViewBase}>
			<ModalHeader
				rightComponent={<CancelBtn onClick={props.route.params.onClose} />}
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
			/>
			<View style={{ ...wrappingContainerBase, flex: 1 }}>
				{pinMatch && (<Text style={styles.modalHeader}>Confirm new passcode</Text>)}
				{!pinMatch && (<Text style={styles.modalHeader}>No matching codes...please try again</Text>)}
				<View style={styles.codeView}>
					<PinCode
						key="forgotPasswordNewCodeConfirm"
						value={pinValue}
						onChange={setPinValue}
						autoFocus={autoFocus}
						length={6}
						onComplete={async receivedPin => {
							setPinValue('');
							if (pinInput === receivedPin) {
								await updateAuthorization({ pin: receivedPin });
								setAutoFocus(false);
								props.navigation.navigate('ForgotPasswordSuccess');
								Keyboard.dismiss();
								setPinMatch(true);
								return;
							}
							setPinMatch(false);
						}}
					/>
				</View>
			</View>
		</View>
	);
}

const ForgotPasswordNewCodeConfirm = (props:ForgotPasswordNewCodeConfirmProps) => {
	const navigation = useNavigation();
	return <ForgotPasswordNewCodeConfirmView {...props} navigation={navigation} />;
}
export default ForgotPasswordNewCodeConfirm