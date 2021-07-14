import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { BackBtn, CancelBtn, ModalHeader, PinCode } from "src/shared/uielements";
import { modalViewBase, wrappingContainerBase } from "src/theme/elements";

type ForgotPasswordNewCodeProps = {
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

const ForgotPasswordNewCodeView = (props: ForgotPasswordNewCodeProps) => {
	const { updateAuthorization } = useUserDetails();
	const [pinValue, setPinValue] = useState('');
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
				<Text style={styles.modalHeader}>Create new passcode</Text>
				<View style={styles.codeView}>

					<PinCode
						key="forgotPasswordNewCode"
						value={pinValue}
						onChange={setPinValue}
						autoFocus={autoFocus}
						length={6}
						onComplete={(pinInput) => {
							updateAuthorization({ pinInput });
							props.navigation.navigate('ForgotPasswordNewCodeConfirm')
							setAutoFocus(false)
						}}
					/>
				</View>
			</View>
		</View>
	);
}

const ForgotPasswordNewCode = (props:ForgotPasswordNewCodeProps) => {
	const navigation = useNavigation();
	return <ForgotPasswordNewCodeView {...props} navigation={navigation} />;
}
export default ForgotPasswordNewCode