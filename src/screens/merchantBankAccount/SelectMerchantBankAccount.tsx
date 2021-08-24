import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, ReactElement } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BackBtn, Header, CancelBtn } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { underlineHeaderB, viewBase, wrappingContainerBase } from "src/theme/elements";

type SelectMerchantBankAccountProps = {
	navigation?: any
	route?: any
}

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
        lineHeight: 32,
		color: colors.purple
	},
	bodyText: {
        color: colors.bodyText
    },
	text: {
		color: colors.purple
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
		borderColor: colors.purple,
		marginVertical: 10
	}
});

const SelectMerchantBankAccountView = (props: SelectMerchantBankAccountProps) => {
	const [account, setAccount] = useState('');
	const [goNext, setGoNext] = useState(false);

	useEffect(() => {
		setGoNext(account !== "");
	},[account]);

	const onValueChange = (value: string) => {
		setAccount(value);
		props.navigation.navigate("Congratulations");
	}

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn color={colors.purple} onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn text="Close" color={colors.purple} onClick={() => props.navigation.navigate('Tabs')} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={underlineHeaderB}>
					<Text style={styles.headerText}>Select account</Text>
				</View>
				<View>
					<Text style={styles.bodyText}>Which account would you like to link to BerkShares?</Text>
					<Text style={styles.text}>NB: Make sure to link your business bank account.</Text>
				</View>
				<View style={styles.form}>
					<TouchableOpacity style={styles.accountView} onPress={() => onValueChange("1")}>
						<Text style={styles.text}>Checking</Text>
						<Text style={styles.text}>$1,000.76</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.accountView} onPress={() => onValueChange("2")}>
						<Text style={styles.text}>Saving</Text>
						<Text style={styles.text}>$100,000.76</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
}

const SelectMerchantBankAccount = (props: SelectMerchantBankAccountProps): ReactElement => {
	const navigation = useNavigation();
	return <SelectMerchantBankAccountView {...props} navigation={navigation} />;
}
export default SelectMerchantBankAccount