import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { CancelBtn, ModalHeader, PinCode } from "src/shared/uielements";
import { baseHeader, modalBaseHeader, modalViewBase, wrappingContainerBase } from "src/theme/elements";

type ChangePasscodeCurrentProps = {
	navigation?: any,
	route: any,
	onClose: () => void
}

const styles = StyleSheet.create({
	headerView: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20
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

const ChangePasscodeCurrent = (props: ChangePasscodeCurrentProps) => {
	const navigation = useNavigation();
	const [pinValue, setPinValue] = useState('');
	const [pinMatch, setPinMatch] = useState(true);
	const { authorization: { pin } } = useUserDetails();
	const [autoFocus, setAutoFocus] = useState(true);
	const isFocused = useIsFocused();

	useEffect(() => {
		setAutoFocus(isFocused);
		setPinValue(isFocused ? pinValue : '');
	},[isFocused]);

	const { onClose } = props.route.params;
	return (
		<View style={modalViewBase}>
			<ModalHeader
				rightComponent={<CancelBtn onClick={onClose} />}
			/>

			<View style={{ ...wrappingContainerBase, flex: 1 }}>
				<View style={ baseHeader }>
					{pinMatch && (<Text style={modalBaseHeader}>Enter current passcode</Text>)}
					{!pinMatch && (<Text style={modalBaseHeader}>Wrong passcode... Please try again</Text>)}
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
								navigation.navigate('ChangePasscodeNew');
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

export default ChangePasscodeCurrent;