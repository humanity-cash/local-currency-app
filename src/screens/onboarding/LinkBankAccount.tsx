import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { UserType } from "src/auth/types";
import { BUTTON_TYPES } from 'src/constants';
import * as Routes from 'src/navigation/constants';
import { Button, Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import DwollaDialog from 'src/screens/dashboard/DwollaDialog';
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
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const navigation = useNavigation()

	const selectBank = () => {
		setIsVisible(true);
	}

	const onSkip = () => {
		navigation.goBack()
	}

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
					onPress={selectBank}
				/>
			</View>

			{isVisible && (
				<DwollaDialog visible={isVisible} onClose={() => setIsVisible(false)} userType={UserType.Customer} />
			)}
		</View>
	);
}

export default LinkBankAccount;