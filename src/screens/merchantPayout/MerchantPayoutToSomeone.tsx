import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { BUTTON_TYPES } from 'src/constants';
import * as Routes from 'src/navigation/constants';
import { BackBtn, BorderedInput, Button, CancelBtn, Dialog, Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { dialogViewBase, underlineHeaderB, viewBaseB, wrappingContainerBase } from "src/theme/elements";
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
	},
	dialogBg: {
        backgroundColor: colors.overlayPurple
    },
	dialogWrap: {
		paddingHorizontal: 10,
		height: "100%",
		flex: 1,
	},
	dialogHeader: {
		fontSize: 30,
		lineHeight: 32,
		marginTop: 20,
		marginBottom: 10,
		color: colors.purple
	}
});

const MerchantCashoutAmount = (): JSX.Element => {
	const navigation = useNavigation();
	const [amount, setAmount] = useState<string>('');
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [goNext, setGoNext] = useState(false);

	useEffect(() => {
		setGoNext(Boolean(amount));
	}, [amount]);

	const onValueChange = (name: string, change: string) => {
		setAmount(change.replace(',', '.'));
	};

	const doScan = () => {
		setIsVisible(false);
		navigation.navigate(Routes.MERCHANT_PAYOUT_QR_SCAN);
	}

	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={<BackBtn color={colors.purple} onClick={() => navigation.goBack()} />}
				rightComponent={<CancelBtn text={Translation.BUTTON.CLOSE} color={colors.purple} onClick={() => navigation.navigate(Routes.MERCHANT_DASHBOARD)} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={underlineHeaderB}>
					<Text style={styles.headerText}>{Translation.PAYMENT.PAYOUT_IN}</Text>
				</View>
				<View>
					<Text style={styles.bodyText}>{Translation.PAYMENT.SELECT_PAYOUT_AMOUNT}</Text>
					<View style={styles.formLabel}>
						<Text style={styles.labelText}>{Translation.LABEL.AMOUNT}</Text>
						<Text style={styles.labelText}>{Translation.LABEL.MAX_BERKSHARES}</Text>
					</View>
					<BorderedInput
						label="Amount"
						name="amount"
						keyboardType="decimal-pad"
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
						onPress={()=>setIsVisible(true)}
					/>
				</View>
			</KeyboardAvoidingView>

			{isVisible && (
				<Dialog visible={isVisible} onClose={() => setIsVisible(false)} backgroundStyle={styles.dialogBg}>
					<View style={dialogViewBase}>
						<View style={styles.dialogWrap}>
							<Text style={styles.dialogHeader}>{Translation.PAYMENT.SCAN_QR}</Text>
							<Text style={styles.bodyText}>{Translation.PAYMENT.SCAN_QR_DETAIL}</Text>
						</View>
						<Button
							type={BUTTON_TYPES.PURPLE}
							title={Translation.BUTTON.SCAN}
							onPress={doScan}
						/>
					</View>
				</Dialog>
			)}
		</View>
	);
}

export default MerchantCashoutAmount