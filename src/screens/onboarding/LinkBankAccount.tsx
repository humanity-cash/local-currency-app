import React, { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { BUTTON_TYPES } from 'src/constants';
import { NavigationViewContext, ViewState } from "src/contexts/navigation";
import { useCustomerWallet, useUpdateCustomerWalletData } from "src/hooks";
import * as Routes from 'src/navigation/constants';
import DwollaDialog from 'src/screens/dashboard/DwollaDialog';
import DataLoading from 'src/screens/loadings/DataLoading';
import { Button, Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		color: colors.darkGreen,
		lineHeight: 35
	},
	bottomView: {
		marginHorizontal: 20,
		marginBottom: 20
	},
	skipBtn: {
		marginBottom: 10
	}
});

const LinkBankAccount = (): JSX.Element => {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const { updateSelectedView } = useContext(NavigationViewContext);

	const selectBank = async () => {
		setIsVisible(true);
	}

	const { isLoading: isWalletLoading } = useCustomerWallet();
	useUpdateCustomerWalletData();

	const onSkip = async () => { 
		updateSelectedView(ViewState.Customer);
	};
	
	return (
		<View style={viewBase}>
			<DataLoading visible={isWalletLoading} />
			<Header />

			<View style={wrappingContainerBase}>
				<View style={baseHeader}>
					<Text style={styles.headerText}>
						{Translation.PROFILE.WELCOME_BERKSHARES}
					</Text>
				</View>
			</View>
			<SafeAreaView style={styles.bottomView}>
				<Button
					type={BUTTON_TYPES.TRANSPARENT}
					title={Translation.BUTTON.SKIP_NOW}
					style={styles.skipBtn}
					onPress={onSkip}
				/>
				<Button
					type={BUTTON_TYPES.DARK_GREEN}
					title={Routes.LINK_BANK_ACCOUNT}
					disabled={isWalletLoading}
					onPress={selectBank}
				/>
			</SafeAreaView>

			{isVisible && (
				<DwollaDialog title={Translation.BANK_ACCOUNT.USE_DWOLLA_PERSONAL} visible={isVisible} onClose={() => setIsVisible(false)} />
			)}
		</View>
	);
}

export default LinkBankAccount;