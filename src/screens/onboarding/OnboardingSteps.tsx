import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { BackBtn, Button, Header, NextBtn } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";

type OnboardingStepsProps = {
	navigation?: any
	route: any
}

const styles = StyleSheet.create({
	codeView: {
	},
	bottomNavigation: {
		justifyContent: "center"
	},
	bottomView: {
		height: 60,
		justifyContent: "center",
		alignItems: 'center'
	},
	image: {
		alignSelf: "center",
		width: 300,
		height: 300
	},
	imageView: {
		justifyContent: "center",
		textAlignVertical: "center",
		flex: 1
	},
	stepCounter: {
		justifyContent: "center",
		alignItems: "center"
	},
	stepText: {
		color: colors.brown
	}
});

const OnboardingStepsView = (props: OnboardingStepsProps) => {
	const { personalDetails } = useUserDetails();
	const steps = [
		{
			header: 'We need your personal details',
			description: 'We use your personal details to set up your Cash Settings and banking account.',
			image: require('../../../assets/images/onboarding1.png'),
			buttonText: 'NEXT',
			goTo: () => props.navigation.navigate('PersonalDetails')
		},
		{
			header: `Please verify your identity, ${personalDetails.firstname}!`,
			description: 'According to Swiss law, we are obliged to verify your identity before you can add cash to your settings and trade unlisted shares. Your data will be stored securely.',
			image: require('../../../assets/images/onboarding2.png'),
			buttonText: 'VERIFY IDENTITY',
			goTo: () => props.navigation.navigate('OnboardingSteps', { step: 3 })
		},
		{
			header: 'Our terms and conditions',
			description: 'Only a couple of checks needed before you can start trading.',
			image: require('../../../assets/images/onboarding3.png'),
			buttonText: 'NEXT',
			goTo: () => props.navigation.navigate('TermsEmail')
		},
		{
			header: 'Add a minimum of CHF 1\'000 to your settings',
			description: 'Welcome to DATE! Now it’s time to add some cash to your settings.',
			image: require('../../../assets/images/onboarding4.png'),
			buttonText: 'NEXT',
			goTo: () => props.navigation.navigate('AddCash')
		},
		{
			header: 'Done! Take a look at the market while you wait',
			description: 'Your profile and account is setup. We are verifying it which usually takes a few minutes.',
			image: require('../../../assets/images/onboarding5.png'),
			buttonText: 'NEXT',
			goTo: () => props.navigation.navigate('Teaser')
		}
	];
	const { statuses, updateStatus } = useUserDetails();
	const currentStep = props.route.params?.step;
	const stepObject = steps[currentStep - 1];

	// TODO: remove - it verifies status that user was verified by default
	useEffect(() => {
		if (currentStep === 2 && !statuses.verifyId) {
			updateStatus({ verifyId: true });
		}
	}, [currentStep]);
	return (
		<View style={{...viewBase}}>
			{currentStep !== steps.length && (
				<Header
					leftComponent={<BackBtn onClick={() => props.navigation.navigate('Teaser')} />}
					rightComponent={<NextBtn text="Skip" onClick={() => props.navigation.navigate('OnboardingSteps', { step: currentStep + 1 })} />}
				/>
			)}
			{currentStep === steps.length && (
				<Header
					leftComponent={<BackBtn onClick={() => props.navigation.navigate('Teaser')} />}
				/>
			)}
			<View style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text h1>{stepObject.header}</Text>
				</View>
				<View style={styles.codeView}>
					<Text>{stepObject.description}</Text>
				</View>
				<View style={styles.imageView}>
					<Image
						source={stepObject.image}
						containerStyle={styles.image}
					/>
				</View>
				{currentStep !== steps.length && (
					<View style={styles.stepCounter}>
						<Text style={styles.stepText}>Step {currentStep} of {steps.length - 1}</Text>
					</View>
				)}
			</View>
			<Button
				type="fluidDark"
				title={stepObject.buttonText}
				onPress={stepObject.goTo}
			/>
		</View>
	);
}

const OnboardingSteps = (props:OnboardingStepsProps) => {
	const navigation = useNavigation();
	return <OnboardingStepsView {...props} navigation={navigation} />;
}
export default OnboardingSteps;