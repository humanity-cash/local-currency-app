import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BackBtn, Header, CancelBtn, Button } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, viewBaseWhite, wrappingContainerBase } from "src/theme/elements";

type SelectBankAccountProps = {
	navigation?: any
	route?: any
}

const styles = StyleSheet.create({
	accountView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: colors.azure,
		padding: 15,
		margin: 5
	},
	selectedAccountView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: colors.lightBlue,
		padding: 15,
		margin: 5
	},
	text: {
		color: colors.blue,
	},
	bottomView: {
		padding: 20,
	},
});

const SelectBankAccountView = (props: SelectBankAccountProps) => {
	const [account, setAccount] = useState('');
	const [goNext, setGoNext] = useState(false);

	useEffect(() => {
		setGoNext(account !== "");
	},[account]);

	const onValueChange = (value: string) => {
		setAccount(value);
	}

	return (
		<View style={viewBaseWhite}>
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn text="Close" onClick={() => props.navigation.navigate('Tabs')} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text h1 style={{color: colors.blue}}>Select account</Text>
					<Text>Which account would you like to link to BerkShares?</Text>
				</View>
				<TouchableOpacity style={(account==="1") ? styles.selectedAccountView : styles.accountView} onPress={() => onValueChange("1")}>
					<View>
						<Text style={styles.text}>Checking</Text>
						<Text style={styles.text}>US-08-CHAS-0686-5892</Text>
					</View>
					<View>
						<Text style={styles.text}>$12</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={(account==="2") ? styles.selectedAccountView : styles.accountView} onPress={()=>onValueChange("2")}>
					<View>
						<Text style={styles.text}>Checking</Text>
						<Text style={styles.text}>US-08-CHAS-0686-5892</Text>
					</View>
					<View>
						<Text style={styles.text}>$12</Text>
					</View>
				</TouchableOpacity>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type="darkRed"
						style={{backgroundColor: colors.blue}}
						title="Select"
						textStyle={{color: colors.white}}
						disabled={!goNext}
						onPress={() => props.navigation.navigate("Congratulations")}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

const SelectBankAccount = (props: SelectBankAccountProps) => {
	const navigation = useNavigation();
	return <SelectBankAccountView {...props} navigation={navigation} />;
}
export default SelectBankAccount