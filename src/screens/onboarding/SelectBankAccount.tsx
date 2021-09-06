import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BackBtn, Header, CancelBtn } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { underlineHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import * as Routes from 'src/navigation/constants';
import Translation from 'src/translation/en.json';

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
        lineHeight: 32
	},
	bodyText: {
        color: colors.bodyText
    },
	form: {
		marginTop: 40,
		paddingHorizontal: 20
	},
	accountView: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		height: 55,
		borderWidth: 1,
		borderRadius: 30,
		borderColor: colors.darkGreen,
		marginVertical: 10
	}
});

const SelectBankAccount = (): JSX.Element => {
	const navigation = useNavigation();
	const [account, setAccount] = useState('');
	const onValueChange = (value: string) => {
		setAccount(value);
		console.log(account);
		navigation.navigate(Routes.BANK_LINK_SUCCESS);
	}

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
				rightComponent={<CancelBtn text={Translation.BUTTON.CLOSE} onClick={() => navigation.navigate(Routes.TABS)} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={underlineHeader}>
					<Text style={styles.headerText}>{Translation.BANK_ACCOUNT.SELECT_BANK_ACCOUNT}</Text>
				</View>
				<Text style={styles.bodyText}>{Translation.BANK_ACCOUNT.SELECT_BANK_ACCOUNT_DETAIL}</Text>
				<View style={styles.form}>
					<TouchableOpacity style={styles.accountView} onPress={() => onValueChange("1")}>
						<Text >{Translation.BUTTON.CHECKINGS}</Text>
						<Text >$1,000.76</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.accountView} onPress={() => onValueChange("2")}>
						<Text >{Translation.BUTTON.SAVING}</Text>
						<Text >$100,000.76</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
}

export default SelectBankAccount