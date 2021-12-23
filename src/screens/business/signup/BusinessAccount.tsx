import { useNavigation } from '@react-navigation/core';
import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View, SafeAreaView } from 'react-native';
import { Text } from 'react-native-elements';
import { UserContext } from "src/contexts";
import * as Routes from 'src/navigation/constants';
import { BackBtn, Button, Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { underlineHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';

const styles = StyleSheet.create({
    headerText: {
		fontSize: 32,
        lineHeight: 32
	},
    bodyView: {
        paddingTop: 50,
        paddingHorizontal: 17
    },
    bodyText: {
        color: colors.bodyText,
        textAlign: 'center'
    },
    bottomView: {
		marginHorizontal: 20,
        marginBottom: 20
	},
});

const BusinessAccount = (): JSX.Element => {
	const navigation = useNavigation();
	const { user } = useContext(UserContext);

	const signupBusiness = () => {
		if (!user?.verifiedBusiness) {
			navigation.navigate(Routes.SIGNUP_BUSINESS);
		}
	}

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn text="Home" onClick={() => navigation.goBack()} />}
			/>
			<ScrollView style={wrappingContainerBase}>
                <View style={underlineHeader}>
                    <Text style={styles.headerText}>{Translation.PROFILE.BUSINESS_ACCOUNT}</Text>
                </View>
                <View style={styles.bodyView}>
                    {!user?.verifiedBusiness && <Text style={styles.bodyText}>{Translation.PROFILE.BUSINESS_ACCOUNT_DETAIL}</Text>}
                </View>
			</ScrollView>
			<SafeAreaView style={styles.bottomView}>
				<Button
					type="darkGreen"
					disabled={user?.verifiedBusiness}
					title={Translation.BUTTON.SIGNUP_BUSINESS}
					onPress={signupBusiness}
				/>
			</SafeAreaView>
		</View>
	);
}

export default BusinessAccount