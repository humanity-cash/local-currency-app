import { useNavigation } from '@react-navigation/native';
import React, { ReactElement, useContext } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { AuthContext } from 'src/auth';
import { Button, BackBtn, Header, CancelBtn, BusinessProfileForm } from 'src/shared/uielements';
import { underlineHeaderB, viewBaseB, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

const styles = StyleSheet.create({
	buttonText: {
		color: colors.white
	},
	mainColor: {
		color: colors.purple
	},
	headerText: {
		fontSize: 32,
		color: colors.purple,
		lineHeight: 35
	},
	formView: {
		paddingBottom: 80
	},
	bottomButton: {
		width: '90%',
		position: 'absolute',
		bottom: 45,
		left: '5%'
	},
});

const BusinessProfile = (): ReactElement => {
	const navigation = useNavigation()
	const { signOut } = useContext(AuthContext);

	const onNextPress = () => {
		navigation.navigate(Routes.BUSINESS_DETAIL);
	}

	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={<BackBtn color={colors.purple} onClick={() => navigation.goBack()} />}
				rightComponent={<CancelBtn color={colors.purple} text={Translation.BUTTON.LOGOUT} onClick={signOut} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={underlineHeaderB}>
					<Text style={styles.headerText}>{Translation.PROFILE.SETUP_PROFILE}</Text>
				</View>
				<View style={styles.formView}>
					<BusinessProfileForm
					/>
				</View>
			</ScrollView>
			<Button
				type="purple"
				title={Translation.BUTTON.NEXT}
				disabled={false}
				onPress={onNextPress}
				style={styles.bottomButton}
			/>
		</View>
	);
}

export default BusinessProfile;