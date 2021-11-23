import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform, SafeAreaView } from 'react-native';
import { Text } from 'react-native-elements';
import { AuthContext } from 'src/auth';
import {
	Header,
	Button,
	CancelBtn,
	BackBtn,
} from "src/shared/uielements";
import { underlineHeaderB, viewBaseB, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { BusinessOwnerDetailsForm } from 'src/shared/uielements/reusable';
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
		paddingBottom: 40
	},
    bottomView: {
		marginHorizontal: 20,
        marginBottom: 20
	},
});

const BusinessOwnerDetail = (): JSX.Element => {
	const navigation = useNavigation()
	const { signOut, buisnessBasicVerification } = useContext(AuthContext);
	const [goNext, setGoNext] = useState<boolean>(false);

	useEffect(() => {
		setGoNext(buisnessBasicVerification.owner.firstName !== "" && buisnessBasicVerification.owner.lastName !== "");
	}, [buisnessBasicVerification.owner.firstName, buisnessBasicVerification.owner.lastName]);

	const onNextPress = () => {
		// navigation.navigate(Routes.BUSINESS_OWNER_ADDRESS);
		navigation.navigate(Routes.BUSINESS_INFO);
	};

	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={<BackBtn color={colors.purple} onClick={() => navigation.goBack()} />}
				rightComponent={<CancelBtn color={colors.purple} text={Translation.BUTTON.LOGOUT} onClick={signOut} />}
			/>
			<View style={wrappingContainerBase}>
				<View style={underlineHeaderB}>
					<Text style={styles.headerText}>
						{Translation.PROFILE.BUSINESS_OWNER}
					</Text>
				</View>
				<ScrollView>
					<View style={styles.formView}>
						<BusinessOwnerDetailsForm style={styles.input} />
					</View>
				</ScrollView>
			</View>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}>
				<SafeAreaView style={styles.bottomView}>
					<Button
						type="purple"
						title={Translation.BUTTON.NEXT}
						disabled={!goNext}
						onPress={onNextPress}
					/>
				</SafeAreaView>
			</KeyboardAvoidingView>
		</View>
	);
}

export default BusinessOwnerDetail