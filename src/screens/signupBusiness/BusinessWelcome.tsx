import React, { ReactElement, useContext, useState } from "react";
import {
	KeyboardAvoidingView,
	Platform, SafeAreaView, ScrollView,
	StyleSheet,
	View
} from "react-native";
import { Text } from "react-native-elements";
import { UserType } from "src/auth/types";
import { AuthContext, UserContext, WalletContext } from "src/contexts";
import { NavigationViewContext, ViewState } from "src/contexts/navigation";
import { useBusinessWallet } from "src/hooks";
import DwollaDialog from 'src/screens/dashboard/DwollaDialog';
import { Button, Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { viewBaseB, wrappingContainerBase } from "src/theme/elements";
import Translation from "src/translation/en.json";

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		lineHeight: 40,
		color: colors.purple,
	},
	bottomView: {
		marginHorizontal: 20,
		marginBottom: 20,
	},
	skipBtn: {
		marginBottom: 10,
		color: colors.purple,
	},
});

const BusinessWelcome = (): ReactElement => {
	const { updateUserType, user } = useContext(UserContext);
	const { businessWalletData } = useContext(WalletContext);
	const { userEmail } = useContext(AuthContext);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const { updateSelectedView } = useContext(NavigationViewContext);

	useBusinessWallet();
	const onSkip = async () => {
		updateUserType(UserType.Business, userEmail);
		updateSelectedView(ViewState.Business)
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
				<SafeAreaView style={styles.bottomView}>
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
						disabled={!user?.verifiedBusiness || !businessWalletData?.userId}
						onPress={() => {
							setIsVisible(true)
						}}
					/>
				</SafeAreaView>
			</KeyboardAvoidingView>

			{isVisible && (
				<DwollaDialog visible={isVisible} onClose={() => setIsVisible(false)} />
			)}
		</View>
	);
};

export default BusinessWelcome;
