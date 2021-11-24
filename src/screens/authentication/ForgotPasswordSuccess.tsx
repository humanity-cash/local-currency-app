import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { AuthContext } from "src/contexts";
import { BackBtn, Button, CancelBtn, Header } from "src/shared/uielements";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";

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

const ForgotPasswordSuccess = () => {
	const navigation = useNavigation()
	const { signIn, forgotPasswordDetails } = useContext(AuthContext);

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
				rightComponent={<CancelBtn text="Close" onClick={() => navigation.navigate('Login')} />}
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
					onPress={() => {
						signIn({
							email: forgotPasswordDetails.email,
							password: forgotPasswordDetails.newPassword,
						});
					}}
				/>
			</View>
			
		</View>
	);
}

export default ForgotPasswordSuccess