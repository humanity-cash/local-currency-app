import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { Button, ModalHeader, CancelBtn } from "src/shared/uielements";
import { modalViewBase, viewBase, wrappingContainerBase } from "src/theme/elements";

type ForgotPasswordSuccessProps = {
	navigation?: any
	route?: any
}

const styles = StyleSheet.create({
	modalHeader: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40
	},
	bottomView: {
		padding: 20,
		paddingBottom: 45
	}
});

const ForgotPasswordSuccessView = (props: ForgotPasswordSuccessProps) => {
	return (
		<View style={viewBase}>
			<ModalHeader
				rightComponent={<CancelBtn text="Close" onClick={props.route.params.onClose} />}
			/>
			<View style={wrappingContainerBase}>
				<Text style={styles.modalHeader}>Password has changed successfully!</Text>
			</View>
			<View style={styles.bottomView}>
				<Button
					type="darkGreen"
					title="DONE"
					onPress={props.route.params.onClose}
				/>
			</View>
			
		</View>
	);
}

const ForgotPasswordSuccess = (props:ForgotPasswordSuccessProps) => {
	const navigation = useNavigation();
	return <ForgotPasswordSuccessView {...props} navigation={navigation} />;
}
export default ForgotPasswordSuccess