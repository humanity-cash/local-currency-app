import React, { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { Header, Button, CancelBtn, BackBtn, BusinessAddressForm } from "src/shared/uielements";
import { underlineHeaderB, viewBaseB, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import { validateAddressForm } from "src/utils/validation";

type BusinessAddressProps = {
	navigation?: any,
	route?: any,
}

const styles = StyleSheet.create({
    headerText: {
		fontSize: 32,
        lineHeight: 32,
		color: colors.purple,
	},
    bodyView: {
        paddingTop: 50,
        paddingHorizontal: 17
    },
    bodyText: {
        color: colors.bodyText
    },
	label: {
		marginTop: 30,
        color: colors.bodyText,
		fontSize: 10
    },
	input: {
		color: colors.purple,
		backgroundColor: colors.white
	},
	formView: {
		paddingBottom: 120
	},
    bottomButton: {
		width: '90%',
		position: 'absolute',
		bottom: 45,
		left: '5%'
	}
});

const BusinessAddress = (props: BusinessAddressProps) => {
	const { personalDetails, updateStatus } = useUserDetails();
	const [goNext, setGoNext] = useState(false);
	const [showValidation, setShowValidation] = useState(false);

	const onNextPress = () => {
		const validation = validateAddressForm(personalDetails);
		setShowValidation(true);
		if (validation.valid) {
			updateStatus({ personalDetails: true });
			props.navigation.navigate("BusinessWelcome");
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
                    <Text style={styles.headerText}>Business information</Text>
                </View>
				<View style={styles.formView}>
					<BusinessAddressForm
						isValid={setGoNext}
						showValidation={showValidation}
						style={styles.input}
					/>
				</View>
			</ScrollView>
			<Button
				type="purple"
				title="Next"
				disabled={!goNext}
				style={styles.bottomButton}
				onPress={onNextPress}
			/>
		</View>
	);
}

export default BusinessAddress