import { StyleSheet, View, ScrollView } from 'react-native';
import React, { ReactElement, useContext } from 'react';
import { Text } from 'react-native-elements';
import { AuthContext } from 'src/auth';
import { Header, Button, CancelBtn, BackBtn } from "src/shared/uielements";
import { underlineHeaderB, viewBaseB, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { useNavigation } from '@react-navigation/native';
import { BusinessOwnerAddressForm } from 'src/shared/uielements/reusable';

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

const BusinessOwnerAddress = (): ReactElement => {
	const navigation = useNavigation();
	const { signOut } = useContext(AuthContext);

	const onNextPress = () => {
		navigation.navigate(Routes.BUSINESS_INFO)
	}

	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={<BackBtn color={colors.purple} onClick={() => navigation.goBack()} />}
				rightComponent={<CancelBtn color={colors.purple} text={Translation.BUTTON.LOGOUT} onClick={signOut} />}
			/>
			<ScrollView style={wrappingContainerBase}>
                <View style={underlineHeaderB}>
                    <Text style={styles.headerText}>{Translation.PROFILE.BUSINESS_OWNER}</Text>
                </View>
				<View style={styles.formView}>
					<BusinessOwnerAddressForm style={styles.input} />
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

export default BusinessOwnerAddress