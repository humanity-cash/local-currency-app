import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Text } from 'react-native-elements';
import { AuthContext } from "src/contexts";
import { BackBtn, Button, CancelBtn, Header } from "src/shared/uielements";
import { viewBase, wrappingContainerBase } from "src/theme/elements";
import DataLoading from 'src/screens/loadings/DataLoading';
import { colors } from "src/theme/colors";
import Translation from "src/translation/en.json";

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		lineHeight: 42,
		color: colors.darkGreen,
	},
	modalHeader: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40
	},
	bottomView: {
		marginHorizontal: 20,
		marginBottom: 45
	}
});

const ForgotPasswordSuccess = () => {
	const navigation = useNavigation()
	const { signIn, forgotPasswordDetails } = useContext(AuthContext);
	const [isLoading, setLoading] = useState<boolean>(false)

	const onComplete = async () => {
		setLoading(true)
		await signIn(
			forgotPasswordDetails.email,
			forgotPasswordDetails.newPassword,
		);
		setLoading(false)
	}

	return (
		<View style={viewBase}>
			<DataLoading visible={isLoading} />
			<Header
				rightComponent={<CancelBtn text="Close" onClick={() => navigation.navigate('Login')} />}
			/>
			<View style={wrappingContainerBase}>
				<Text style={styles.headerText}>
					{Translation.FORGOT_PASSWORD.CHANGE_PASSWORD_SUCCESS}
				</Text>
			</View>
			<SafeAreaView style={styles.bottomView}>
				<Button
					type="darkGreen"
					title="DONE"
					onPress={onComplete}
				/>
			</SafeAreaView>
			
		</View>
	);
}

export default ForgotPasswordSuccess