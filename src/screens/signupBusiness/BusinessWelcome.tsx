import React, { ReactElement, useContext, useState, useEffect } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	View
} from "react-native";
import { UserContext, AuthContext, WalletContext } from "src/contexts";
import { Text } from "react-native-elements";
import { UserType } from "src/auth/types";
import DwollaDialog from 'src/screens/dashboard/DwollaDialog';
import { Button, Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { viewBaseB, wrappingContainerBase } from "src/theme/elements";
import Translation from "src/translation/en.json";
import { useNavigation } from "@react-navigation/core";
import * as Routes from "src/navigation/constants";
import { useWallet } from "src/hooks";

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		lineHeight: 40,
		color: colors.purple,
	},
	bottomView: {
		paddingHorizontal: 20,
		paddingBottom: 50,
	},
	skipBtn: {
		marginBottom: 10,
		color: colors.purple,
	},
});

const BusinessWelcome = (): ReactElement => {
	const navigation = useNavigation();
	const { updateUserType, user, businessDwollaId } = useContext(UserContext);
	const {walletData} = useContext(WalletContext);
	const { signUpDetails: { email, password }, signIn } = useContext(AuthContext);
	const [isVisible, setIsVisible] = useState<boolean>(false);

	useWallet(businessDwollaId);
	const onSkip = async () => {
		await signIn(email, password);
		updateUserType(UserType.Business, email);
		navigation.navigate(Routes.MERCHANT_TABS);
	}

	return (
		<View style={viewBaseB}>
			<Header />
			<ScrollView style={wrappingContainerBase}>
				<Text style={styles.headerText}>
					{Translation.PROFILE.WELCOME_BERKSHARES}
				</Text>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}>
				<View style={styles.bottomView}>
					<Button
						type="transparent"
						title={Translation.BUTTON.SKIP_NOW}
						style={styles.skipBtn}
						textStyle={styles.skipBtn}
						onPress={onSkip}
					/>
					<Button
						type="purple"
						title={Translation.BUTTON.LINK_BUSINESS_BANK}
						disabled={!user?.verifiedBusiness || !walletData?.userId}
						onPress={() => {
							setIsVisible(true)
						}}
					/>
				</View>
			</KeyboardAvoidingView>

			{isVisible && (
				<DwollaDialog visible={isVisible} onClose={() => setIsVisible(false)} />
			)}
		</View>
	);
};

export default BusinessWelcome;
