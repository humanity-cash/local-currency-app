import React, { ReactElement, useContext, useState, useEffect } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	View,
	SafeAreaView
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
import { NavigationViewContext, ViewState } from "src/contexts/navigation";
import { useWallet } from "src/hooks";
import DataLoading from 'src/screens/loadings/DataLoading';

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
	const { updateUserType, user, businessDwollaId } = useContext(UserContext);
	const { walletData } = useContext(WalletContext);
	const { userEmail } = useContext(AuthContext);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const { updateSelectedView } = useContext(NavigationViewContext);
	const [isLoading, setLoading] = useState<boolean>(true)

	useWallet(businessDwollaId);

	useEffect(() => {
		setLoading(!user?.verifiedBusiness || !walletData?.userId)
	}, [user?.verifiedBusiness, walletData?.userId])

	const onSkip = async () => {
		updateUserType(UserType.Business, userEmail);
		updateSelectedView(ViewState.Business)
	}

	return (
		<View style={viewBaseB}>
			<DataLoading visible={isLoading} />
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
						disabled={isLoading}
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
