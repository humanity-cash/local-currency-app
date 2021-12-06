import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { BUTTON_TYPES } from 'src/constants';
import * as Routes from 'src/navigation/constants';
import { BackBtn, BorderedInput, Button, CancelBtn, Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { underlineHeaderB, viewBaseB, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40,
		color: colors.purple
	},
	formLabel: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20
	},
	bodyText: {
		marginTop: 5, 
		color: colors.bodyText, 
		fontSize: 16
	},
	labelText: {
		marginTop: 5, 
		color: colors.bodyText, 
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
		paddingHorizontal: 20,
		paddingBottom: 45
	}
});

const MerchantCashoutAmount = (): JSX.Element => {
	const navigation = useNavigation();
	const [amount, setAmount] = useState<string>('');
	const [goNext, setGoNext] = useState(false);

	useEffect(() => {
		setGoNext(Boolean(amount));
	}, [amount]);

	const onValueChange = (name: string, change: string) => {
		setAmount(change);
	};

	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={<BackBtn color={colors.purple} onClick={() => navigation.goBack()} />}
				rightComponent={<CancelBtn text={Translation.BUTTON.CLOSE} color={colors.purple} onClick={() => navigation.navigate(Routes.MERCHANT_DASHBOARD)} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={underlineHeaderB}>
					<Text style={styles.headerText}>{Translation.PAYMENT.PAYOUT_SOMEONE}</Text>
				</View>
				<View>
					<Text style={styles.bodyText}>{Translation.PAYMENT.PAYOUT_AMOUNT_PERSONAL}</Text>
					<View style={styles.formLabel}>
						<Text style={styles.labelText}>{Translation.LABEL.AMOUNT}</Text>
						<Text style={styles.labelText}>{Translation.LABEL.MAX_BERKSHARES}</Text>
					</View>
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
						type={BUTTON_TYPES.PURPLE}
						disabled={!goNext}
						title={Translation.BUTTON.CONFIRM}
						onPress={()=>navigation.navigate(Routes.MERCHANT_PAYOUT_PENDING)}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default MerchantCashoutAmount