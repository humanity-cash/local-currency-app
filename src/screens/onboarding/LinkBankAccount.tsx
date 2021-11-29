import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { BUTTON_TYPES } from 'src/constants';
import * as Routes from 'src/navigation/constants';
import { Button, Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import DwollaDialog from 'src/screens/dashboard/DwollaDialog';
import { WalletContext, UserContext } from "src/contexts";
import { NavigationViewContext, ViewState } from "src/contexts/navigation";
import { useWallet } from "src/hooks";
import { useNavigation } from '@react-navigation/core';

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		color: colors.darkGreen,
		lineHeight: 35
	},
	bottomView: {
		paddingHorizontal: 20,
		paddingBottom: 50
	},
	skipBtn: {
		marginBottom: 10
	}
});

const LinkBankAccount = (): JSX.Element => {
	const navigation = useNavigation();
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const { walletData } = useContext(WalletContext)
	const { customerDwollaId } = useContext(UserContext)
	const { updateSelectedView } = useContext(NavigationViewContext);

	const selectBank = async () => {
		setIsVisible(true);
	}

	useWallet(customerDwollaId);

	const onSkip = async () => { 
		updateSelectedView(ViewState.Customer);
		// navigation.navigate(Routes.TABS)
	};
	
	return (
		<View style={viewBase}>
			<Header />

			<View style={wrappingContainerBase}>
				<View style={baseHeader}>
					<Text style={styles.headerText}>
						{Translation.PROFILE.WELCOME_BERKSHARES}
					</Text>
				</View>
			</View>
			<View style={styles.bottomView}>
				<Button
					type={BUTTON_TYPES.TRANSPARENT}
					title={Translation.BUTTON.SKIP_NOW}
					style={styles.skipBtn}
					onPress={onSkip}
				/>
				<Button
					type={BUTTON_TYPES.DARK_GREEN}
					title={Routes.LINK_BANK_ACCOUNT}
					disabled={!walletData?.userId?.length}
					onPress={selectBank}
				/>
			</View>

			{isVisible && (
				<DwollaDialog visible={isVisible} onClose={() => setIsVisible(false)} />
			)}
		</View>
	);
}

export default LinkBankAccount;