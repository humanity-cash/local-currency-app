import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { BackBtn, CancelBtn, ModalHeader, PinCode } from "src/shared/uielements";
import { modalBaseHeader, modalViewBase, wrappingContainerBase } from "src/theme/elements";

type ChangePasscodeNewProps = {
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

const ChangePasscodeNew = (props: ChangePasscodeNewProps) => {
	const navigation = useNavigation();
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
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
			/>
			<View style={{ ...wrappingContainerBase, flex: 1 }}>
				<Text style={modalBaseHeader}>Create new passcode</Text>
				<View style={styles.codeView}>

					<PinCode
						key="changePasscodeNew"
						value={pinValue}
						onChange={setPinValue}
						autoFocus={autoFocus}
						length={6}
						onComplete={(pinInput) => {
							updateAuthorization({ pinInput });
							navigation.navigate('ChangePasscodeNewConfirm')
							setAutoFocus(false)
						}}
					/>
				</View>
			</View>
		</View>
	);
}
export default ChangePasscodeNew