import { useNavigation } from '@react-navigation/native';
import React, { ReactElement, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { Button, BackBtn, Header, CancelBtn, BusinessProfileForm } from 'src/shared/uielements';
import { underlineHeaderB, viewBaseB, wrappingContainerBase } from "src/theme/elements";
import { validateBusinessProfileForm } from "src/utils/validation";
import { colors } from "src/theme/colors";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

type BusinessProfileProps = {
	navigation?: any
	route?: any
}

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

const BusinessProfileView = (props: BusinessProfileProps) => {
	const { businessDetails } = useUserDetails();
	const [goNext, setGoNext] = useState<boolean>(false);
	const [isShowValidation, setIsShowValidation] = useState<boolean>(false);

	const onNextPress = () => {
		const validation = validateBusinessProfileForm(businessDetails);
		setIsShowValidation(true);
		if (validation.valid) {
			props.navigation.navigate(Routes.BUSINESS_DETAIL);
		}
	}

	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={<BackBtn color={colors.purple} onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn color={colors.purple} text={Translation.BUTTON.LOGOUT} onClick={() => props.navigation.navigate(Routes.TEASER)} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={underlineHeaderB}>
					<Text style={styles.headerText}>{Translation.PROFILE.SETUP_PROFILE}</Text>
				</View>
				<View style={styles.formView}>
					<BusinessProfileForm
						isValid={setGoNext}
						showValidation={isShowValidation}
					/>
				</View>
			</ScrollView>
			<Button
				type="purple"
				title={Translation.BUTTON.NEXT}
				disabled={!goNext}
				onPress={onNextPress}
				style={styles.bottomButton}
			/>
		</View>
	);
}

const BusinessProfile = (props: BusinessProfileProps): ReactElement => {
	const navigation = useNavigation();
	return <BusinessProfileView {...props} navigation={navigation} />;
}
export default BusinessProfile