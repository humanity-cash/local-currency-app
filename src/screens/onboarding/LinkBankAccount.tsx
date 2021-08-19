import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { useModalStatusBar } from "src/hooks";
import { useUserDetails } from "src/hooks";
import { Button, Header } from "src/shared/uielements";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";

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
	const [isVisible, setIsVisible] = useState(false);
	const { personalDetails: { email }} = useUserDetails();

	const selectBank = () => {
		setIsVisible(false);
		props.navigation.navigate("SelectBank");
	}

	return (
		<View style={viewBase}>
			<Header />

			<View style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text style={styles.headerText}>Thank you! Welcome to the BerkShares App. Now it is time to add some BerkShares to your wallet!</Text>
				</View>
			</View>
			<View style={styles.bottomView}>
				<Button
					type="transparent"
					title="Skip for now"
					style={styles.skipBtn}
					onPress={() => props.navigation.navigate("Tabs")}
				/>
				<Button
					type="darkGreen"
					title="Link my bank account"
					onPress={() => props.navigation.navigate("SelectBank")}
				/>
			</View>
		</View>
	);
}

const LinkBankAccount = (props:LinkBankAccountProps) => {
	const navigation = useNavigation();
	return <LinkBankAccountView {...props} navigation={navigation} />;
}
export default LinkBankAccount;