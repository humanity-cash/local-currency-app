import React from 'react';
import { Text } from "react-native-elements";
import { Clipboard, StyleSheet, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../theme/colors";

const styles = StyleSheet.create({
	view: {
		marginTop: 5,
		marginBottom: 10,
		padding: 0,
		backgroundColor: '#F8F6F4',
		flexDirection: 'row',
		paddingHorizontal: 10
	},
	text: {
		lineHeight: 60,
		flex: 1
	},
	arrow: {
		marginVertical: 15
	}
});

export const DepositView = () => {
	return (
		<View style={{ marginTop: 20 }}>
			<Text h3>Account name</Text>
			<View style={styles.view}>
				<Text style={styles.text}>D.A.T.E. MIDDENDORF</Text>
				<TouchableOpacity onPress={() => Clipboard.setString('D.A.T.E. MIDDENDORF')}>
					<Feather
						style={styles.arrow}
						name="copy"
						size={30}
						color={colors.text}
					/>
				</TouchableOpacity>
			</View>
			<Text h3>IBAN</Text>
			<View style={styles.view}>
				<Text style={styles.text}>CH01 LIEN 0099 1234 5678 99</Text>
				<TouchableOpacity onPress={() => Clipboard.setString('CH01 LIEN 0099 1234 5678 99')}>
					<Feather
						style={styles.arrow}
						name="copy"
						size={30}
						color={colors.text}
					/>
				</TouchableOpacity>
			</View>
			<Text h3>BIC</Text>
			<View style={styles.view}>
				<Text style={styles.text}>LIENCH01</Text>
				<TouchableOpacity onPress={() => Clipboard.setString('LIENCH01')}>
					<Feather
						style={styles.arrow}
						name="copy"
						size={30}
						color={colors.text}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
}