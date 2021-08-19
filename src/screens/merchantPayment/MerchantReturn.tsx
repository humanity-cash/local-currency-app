import React, {useState, useEffect} from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, Switch } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, Button, CancelBtn, BackBtn, BorderedInput } from "src/shared/uielements";
import { underlineHeaderB, viewBaseB, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";

type MerchantRequestProps = {
	navigation?: any,
	route?: any,
}

type AmountState = {
	amount: string,
	costs: string
}

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40
	},
	switchView: {flex: 1, justifyContent: 'center', alignItems: 'center'},
	contentView: { 
		marginTop: 5
	},
	label: { 
		marginTop: 20, 
		color: colors.text, 
		fontSize: 12 
	},
	input: {
		backgroundColor: colors.white,
		color: colors.purple
	},
	text: {
		color: colors.purple
	},
	bottomView: {
		padding: 20,
		paddingBottom: 45
	}
});

const MerchantRequest = (props: MerchantRequestProps) => {

	const [amount, setAmount] = useState<string>("");
	const [goNext, setGoNext] = useState<boolean>(false);

	useEffect(() => {
		setGoNext(amount !== "");
	}, [amount]);


	const onValueChange = (name: any, change: any) => {
		setAmount(change);
	}

	const onReturn = () => {
		props.navigation.navigate('MerchantPaymentPending');
	}

	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={<BackBtn color={colors.purple} onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn color={colors.purple} text="Close" onClick={() => props.navigation.navigate('MerchantDashboard')} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={underlineHeaderB}>
					<Text style={styles.headerText}>Send return</Text>
				</View>
				<View style={styles.contentView}>
					<Text style={styles.label}>RETURN AMOUNT</Text>
					<BorderedInput
						label="Amount"
						name="amount"
						keyboardType="number-pad"
						placeholder="Amount"
						placeholderTextColor={colors.greyedPurple}
						prefix="B$"
						style={styles.input}
						textStyle={styles.text}
						value={amount}
						onChange={onValueChange}
					/>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type="purple"
						disabled={!goNext}
						title="'Return amount'"
						onPress={onReturn}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default MerchantRequest