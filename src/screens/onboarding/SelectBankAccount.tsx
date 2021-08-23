import { useNavigation } from '@react-navigation/native';
import React, { ReactElement, useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BackBtn, Header, CancelBtn } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { underlineHeader, viewBase, wrappingContainerBase } from "src/theme/elements";

type SelectBankAccountProps = {
	navigation?: any
	route?: any
}

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

const SelectBankAccountView = (props: SelectBankAccountProps) => {
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
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn text="Close" onClick={() => props.navigation.navigate('Tabs')} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={underlineHeader}>
					<Text style={styles.headerText}>Select account</Text>
				</View>
				<Text style={styles.bodyText}>Which account would you like to link to BerkShares?</Text>
				<View style={styles.form}>
					<TouchableOpacity style={styles.accountView} onPress={() => onValueChange("1")}>
						<Text >Checking</Text>
						<Text >$1,000.76</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.accountView} onPress={() => onValueChange("2")}>
						<Text >Saving</Text>
						<Text >$100,000.76</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
}

const SelectBankAccount = (props: SelectBankAccountProps): ReactElement => {
	const navigation = useNavigation();
	return <SelectBankAccountView {...props} navigation={navigation} />;
}
export default SelectBankAccount