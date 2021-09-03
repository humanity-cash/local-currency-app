import { useNavigation } from '@react-navigation/native';
import React, { ReactElement, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { AuthContext } from 'src/auth';
import * as Routes from 'src/navigation/constants';
import { Button, Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';

type LinkBankAccountProps = {
	navigation?: any
	route: any
}

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

const LinkBankAccountView = (props: LinkBankAccountProps) => {
	const { signIn } = useContext(AuthContext)
	return (
		<View style={viewBase}>
			<Header />

			<View style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text style={styles.headerText}>{Translation.PROFILE.WELCOME_BERKSHARES}</Text>
				</View>
			</View>
			<View style={styles.bottomView}>
				<Button
					type="transparent"
					title={Translation.BUTTON.SKIP_NOW}
					style={styles.skipBtn}
					onPress={signIn}
				/>
				<Button
					type="darkGreen"
					title={Routes.LINK_BANK_ACCOUNT}
					onPress={() => props.navigation.navigate(Routes.SELECT_BANK_ACCOUNT)}
				/>
			</View>
		</View>
	);
}

const LinkBankAccount = (props:LinkBankAccountProps): ReactElement => {
	const navigation = useNavigation();
	return <LinkBankAccountView {...props} navigation={navigation} />;
}
export default LinkBankAccount;