import React, { ReactElement } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, Button, CancelBtn, BackBtn, BusinessAddressForm } from "src/shared/uielements";
import { underlineHeaderB, viewBaseB, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { useNavigation } from '@react-navigation/native';

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

const BusinessAddress = (): ReactElement => {
	const navigation = useNavigation();
	const onNextPress = () => {
			navigation.navigate(Routes.BUSINESS_WELCOME);
	}

	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={<BackBtn color={colors.purple} onClick={() => navigation.goBack()} />}
				rightComponent={<CancelBtn color={colors.purple} text={Translation.BUTTON.LOGOUT} onClick={() => props.navigation.navigate(Routes.TEASER)} />}
			/>
			<ScrollView style={wrappingContainerBase}>
                <View style={underlineHeaderB}>
                    <Text style={styles.headerText}>{Translation.PROFILE.BUSINESS_INFORMATION}</Text>
                </View>
				<View style={styles.formView}>
					<BusinessAddressForm
						style={styles.input}
					/>
				</View>
			</ScrollView>
			<Button
				type="purple"
				title={Translation.BUTTON.NEXT}
				disabled={false}
				style={styles.bottomButton}
				onPress={onNextPress}
			/>
		</View>
	);
}

export default BusinessAddress