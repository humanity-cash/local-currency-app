import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-elements";
import { useWallet } from "../../hooks/useWallet";
import { useNavigation } from '@react-navigation/native';
import { colors } from "../../theme/colors";
import { formatValue } from "../../utils/common";

type WalletBtnProps = {
	text?: string
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 15,
		paddingVertical: 5,
		flexDirection: 'row',
		backgroundColor: colors.brown,
	},
	arrow: {
		paddingLeft: 10
	},
	text: {
		textAlign: "center",
		color: colors.white,
		fontFamily: 'IBMPlexSansBold',
	}
})

export const WalletBtn = (props: WalletBtnProps) => {
	const { wallet } = useWallet();
	const navigation = useNavigation();
	return (
		<TouchableWithoutFeedback
			onPress={() => navigation.navigate('Wallet')}
		>
			<View style={styles.container}>
				<Text style={styles.text}>CHF {wallet && formatValue(wallet.amount)}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};