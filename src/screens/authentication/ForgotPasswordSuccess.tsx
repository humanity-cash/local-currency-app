import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { AuthContext } from 'src/auth';
import { BackBtn, Button, CancelBtn, Header } from "src/shared/uielements";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import { useDispatch } from 'react-redux';
import { showLoadingProgress, hideLoadingProgress } from '../../store/loading/loading.actions';
import { LoadingScreenTypes } from "src/utils/types";

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
	const dispatch = useDispatch()

	const onPressComplete = () => {
		dispatch(showLoadingProgress(LoadingScreenTypes.LOADING_DATA))
		signIn(forgotPasswordDetails.email, forgotPasswordDetails.newPassword);
		dispatch(hideLoadingProgress())
	}

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
					onPress={onPressComplete}
				/>
			</View>
			
		</View>
	);
}

export default ForgotPasswordSuccess