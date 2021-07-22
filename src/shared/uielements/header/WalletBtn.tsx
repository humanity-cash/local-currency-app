import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-elements";
import { useWallet } from "src/hooks";
import { colors } from "src/theme/colors";
import { formatValue } from "src/utils/common";

type WalletBtnProps = {
	text?: string
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 15,
		paddingVertical: 5,
		flexDirection: 'row',
		// backgroundColor: colors.brown,
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

const WalletBtn = (props: WalletBtnProps) => {
	const { wallet } = useWallet();
	const navigation = useNavigation();
	return (
		<TouchableWithoutFeedback
			onPress={() => navigation.navigate('Wallet')}
		>
			<View style={styles.container}>
				{/* <Text style={styles.text}>CHF {wallet && formatValue(wallet.amount)}</Text> */}
				<AntDesign
					style={{ paddingTop: 2 }}
					name='user'
					size={25}
					color={colors.darkRed}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default WalletBtn;