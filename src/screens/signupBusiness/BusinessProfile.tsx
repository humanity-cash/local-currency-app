import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { Button, BackBtn, Header, CancelBtn, BusinessProfileForm } from 'src/shared/uielements';
import { underlineHeaderB, viewBaseB, wrappingContainerBase } from "src/theme/elements";
import { validateBusinessProfileForm } from "src/utils/validation";
import { colors } from "src/theme/colors";

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
	const { businessDetails, updateBusinessDetails } = useUserDetails();
	const [goNext, setGoNext] = useState<boolean>(false);
	const [isShowValidation, setIsShowValidation] = useState<boolean>(false);

	const onNextPress = () => {
		const validation = validateBusinessProfileForm(businessDetails);
		setIsShowValidation(true);
		if (validation.valid) {
			props.navigation.navigate('BusinessDetail');
		}
	}

	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={<BackBtn color={colors.purple} onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn color={colors.purple} text="Log out" onClick={() => props.navigation.navigate('Teaser')} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={underlineHeaderB}>
					<Text style={styles.headerText}>Set up your profile</Text>
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
				title="Next"
				disabled={!goNext}
				onPress={onNextPress}
				style={styles.bottomButton}
			/>
		</View>
	);
}

const BusinessProfile = (props: BusinessProfileProps) => {
	const navigation = useNavigation();
	return <BusinessProfileView {...props} navigation={navigation} />;
}
export default BusinessProfile