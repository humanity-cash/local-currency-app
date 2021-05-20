import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { Text } from 'react-native-elements';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { modalBaseHeader, modalViewBase, wrappingContainerBase } from "../../theme/elements";
import { useUserDetails } from "../../hooks/useUserDetails";
import { BackBtn } from "../../uielements/header/BackBtn";
import { CancelBtn } from "../../uielements/header/CancelBtn";
import { ModalHeader } from "../../uielements/header/ModalHeader";
import { PinCode } from "../../uielements/PinCode";

type ChangePasscodeNewConfirmProps = {
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

const ChangePasscodeNewConfirm = (props: ChangePasscodeNewConfirmProps) => {
	const navigation = useNavigation();
	const { authorization: { pinInput }, updateAuthorization } = useUserDetails();
	const [pinValue, setPinValue] = useState('');
	const [pinMatch, setPinMatch] = useState(true);
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
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
			/>
			<View style={{ ...wrappingContainerBase, flex: 1 }}>
				{pinMatch && (<Text style={modalBaseHeader}>Confirm new passcode</Text>)}
				{!pinMatch && (<Text style={modalBaseHeader}>No matching codes...please try again</Text>)}
				<View style={styles.codeView}>
					<PinCode
						key="changePasscodeNewConfirm"
						value={pinValue}
						onChange={setPinValue}
						autoFocus={autoFocus}
						length={6}
						onComplete={async receivedPin => {
							setPinValue('');
							if (pinInput === receivedPin) {
								await updateAuthorization({ pin: receivedPin });
								setAutoFocus(false);
								setPinMatch(true);
								Keyboard.dismiss();
								navigation.navigate('ChangePasscodeSuccess')
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

export default ChangePasscodeNewConfirm