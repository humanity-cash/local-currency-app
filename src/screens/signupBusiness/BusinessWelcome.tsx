import React, { ReactElement, useContext, useState } from "react";
import {
	SafeAreaView, ScrollView,
	StyleSheet,
	View
} from "react-native";
import { Text } from "react-native-elements";
import { UserType } from "src/auth/types";
import { AuthContext, UserContext, WalletContext } from "src/contexts";
import { NavigationViewContext, ViewState } from "src/contexts/navigation";
import { useBusinessWallet, useUpdateBusinessWalletData } from "src/hooks";
import DwollaDialog from 'src/screens/dashboard/DwollaDialog';
import DataLoading from 'src/screens/loadings/DataLoading';
import { Button, Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { viewBaseB, wrappingContainerBase } from "src/theme/elements";
import Translation from "src/translation/en.json";

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		lineHeight: 42,
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
	const { updateUserType } = useContext(UserContext);
	const { userEmail } = useContext(AuthContext);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const { updateSelectedView } = useContext(NavigationViewContext);

	useUpdateBusinessWalletData();

	const { isLoading: isWalletLoading } = useBusinessWallet();


	const onSkip = async () => {
		updateUserType(UserType.Business, userEmail);
		updateSelectedView(ViewState.Business)
	}

	return (
		<View style={viewBaseB}>
			<DataLoading visible={isWalletLoading} />
			<Header />
			<ScrollView style={wrappingContainerBase}>
				<Text style={styles.headerText}>
					{Translation.PROFILE.WELCOME_BERKSHARES}
				</Text>
			</ScrollView>
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
					disabled={isWalletLoading}
					onPress={() => {
						setIsVisible(true)
					}}
				/>
			</SafeAreaView>

			{isVisible && (
				<DwollaDialog title={Translation.BANK_ACCOUNT.USE_DWOLLA_BUSINESS} visible={isVisible} onClose={() => setIsVisible(false)} />
			)}
		</View>
	);
};

export default BusinessWelcome;
