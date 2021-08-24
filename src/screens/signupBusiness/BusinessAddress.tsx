import React, { ReactElement, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { Header, Button, CancelBtn, BackBtn, BusinessAddressForm } from "src/shared/uielements";
import { underlineHeaderB, viewBaseB, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import { validateAddressForm } from "src/utils/validation";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

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

const BusinessAddress = (props: BusinessAddressProps): ReactElement => {
	const {personalDetails, updateStatus} = useUserDetails();
	const [goNext, setGoNext] = useState(false);
	const [showValidation, setShowValidation] = useState(false);

	const onNextPress = () => {
		const validation = validateAddressForm(personalDetails);
		setShowValidation(true);
		if (validation.valid) {
			updateStatus({ personalDetails: true });
			props.navigation.navigate(Routes.BUSINESS_WELCOME);
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
                    <Text style={styles.headerText}>{Translation.PROFILE.BUSINESS_INFORMATION}</Text>
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
				title={Translation.BUTTON.NEXT}
				disabled={!goNext}
				style={styles.bottomButton}
				onPress={onNextPress}
			/>
		</View>
	);
}

export default BusinessAddress