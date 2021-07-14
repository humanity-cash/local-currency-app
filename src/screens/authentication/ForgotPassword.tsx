import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useModalStatusBar, useRouteTracking } from "src/hooks";
import { ForgotPasswordNavigator } from "src/navigation/ForgotPasswordStack";
import { Modal } from "src/shared/uielements";

type ForgotPasswordProps = {
	navigation?: any,
	route?: any
}

const styles = StyleSheet.create({
	headerView: {
		fontFamily: 'IBMPlexSansSemiBold', fontSize: 20, textAlign: "center"
	}, codeView: {
		flex: 1
	}, bottomNavigation: {
		justifyContent: "center"
	}, bottomView: {
		height: 60, justifyContent: "center", alignItems: 'center'
	}, image: {
		alignSelf: "center", width: 190, height: 156
	}, imageView: {
		justifyContent: "center", textAlignVertical: "center", flex: 1
	}
});

const ForgotPasswordView = (props: ForgotPasswordProps) => {
	const [visible, setVisible] = useState(false);
	const { update } = useRouteTracking();
	const route = useRoute();
	const { setUseHeader } = useModalStatusBar();

	const onClose = () => {
		setVisible(false);
		setUseHeader(false);
		update({ current: route.name });
	}
	return (
		<View>
			<View style={styles.bottomView}>
				<TouchableOpacity onPress={() => setVisible(true)}>
					<Text style={styles.bottomNavigation}>Forgot your passcode?</Text>
				</TouchableOpacity>
			</View>
			{visible && (
				<Modal visible={visible} onShow={() => setUseHeader(true)}>
					<ForgotPasswordNavigator onClose={onClose} />
				</Modal>
			)}
		</View>
	);
}

const ForgotPassword = (props: ForgotPasswordProps) => {
	const navigation = useNavigation();
	return <ForgotPasswordView {...props} navigation={navigation}/>;
}
export default ForgotPassword