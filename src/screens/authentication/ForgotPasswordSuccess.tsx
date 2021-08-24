import { useNavigation } from '@react-navigation/native';
import React, { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { Button, Header, CancelBtn, BackBtn } from "src/shared/uielements";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";

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
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn text="Close" onClick={() => props.navigation.navigate('Login')} />}
			/>
			<View style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text style={styles.modalHeader}>Create a new password</Text>
				</View>
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

const ForgotPasswordSuccess = (props:ForgotPasswordSuccessProps): ReactElement => {
	const navigation = useNavigation();
	return <ForgotPasswordSuccessView {...props} navigation={navigation} />;
}
export default ForgotPasswordSuccess