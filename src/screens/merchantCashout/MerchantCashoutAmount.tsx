import { useNavigation } from '@react-navigation/core';
import React, { useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View, SafeAreaView } from 'react-native';
import { Text } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TransactionsAPI } from 'src/api';
import { BUTTON_TYPES } from 'src/constants';
import { UserContext, WalletContext } from 'src/contexts';
import * as Routes from 'src/navigation/constants';
import DataLoading from 'src/screens/loadings/DataLoading';
import { BorderedInput, Button, CancelBtn, Dialog, Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { dialogViewBase, underlineHeaderB, viewBaseB, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import { showToast } from '../../utils/common';
import { ToastType } from '../../utils/types';

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
	errorBalance: {
		color: colors.mistakeRed, 
		fontSize: 10,
		lineHeight: 10
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
	resultView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 20,
		paddingLeft: 20, 
		paddingRight: 20
	},
	resultText: {
		fontSize: 16,
		lineHeight: 20,
		color: colors.purple
	},
	bottomView: {
		marginHorizontal: 20,
		marginBottom: 20
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
	},
	dialogBottom: {
		paddingTop: 20,
	}
});

const MerchantCashoutAmount = (): JSX.Element => {
	const navigation = useNavigation();
	const { businessDwollaId } = useContext(UserContext);
	const { businessWalletData } = useContext(WalletContext);
	const [amount, setAmount] = useState<string>("");
	const [goNext, setGoNext] = useState(false);
	const [exceed, setExceed] = useState(false)
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isVisible, setIsVisible] = useState(false);
	const [maxAmount, setMaxAmount] = useState<string>("5.00")

	useEffect(() => {
		setAmount("")
	}, [])


	useEffect(() => {
		setGoNext(Number(amount) > 0);
		setExceed(+amount > +maxAmount)
	}, [amount]);

	useEffect(() => {
		if(businessWalletData?.availableBalance) {
			setMaxAmount(`${businessWalletData.availableBalance.toFixed(2)}`)
		}

	}, [businessWalletData])

	const onValueChange = (name: string, change: string) => {
		const amount = change.replace(',', '.')
		setAmount(amount);
	};

	const viewConfirm = () => {
		setIsVisible(true);
	}

	const doCashout = async () => {
		if (!businessDwollaId) {
			showToast(ToastType.ERROR, "Whoops, something went wrong.", "Connection failed.");
			return;
		}

		setIsLoading(true);
		setIsVisible(false);
		const response = await TransactionsAPI.withdraw(
			businessDwollaId, 
			{amount: amount}
		);
		setIsLoading(false);

		if (response.data) {
			navigation.navigate(Routes.MERCHANT_REDEMPTION_IN_PROGRESS);
		} else {
			showToast(ToastType.ERROR, "Whoops, something went wrong.", "Connection failed.");
		}
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS == "ios" ? "padding" : "height"}
			style={viewBaseB}>
			<DataLoading visible={isLoading} />
			<Header
				rightComponent={<CancelBtn text={Translation.BUTTON.CLOSE} color={colors.purple} onClick={() => navigation.navigate(Routes.MERCHANT_DASHBOARD)} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={underlineHeaderB}>
					<Text style={styles.headerText}>{Translation.PAYMENT.CASH_OUT}</Text>
				</View>
				<View>
					<Text style={styles.bodyText}>{Translation.PAYMENT.MERCHANT_CASH_OUT_DETAIL}</Text>
					<View style={styles.formLabel}>
						<Text style={styles.labelText}>{Translation.LABEL.AMOUNT}</Text>
						<Text style={styles.labelText}>{`${Translation.LABEL.MAX_BERKSHARES} ${maxAmount}`}</Text>
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
						borderColor={exceed ? colors.mistakeRed : null}
					/>
					{exceed && <Text style={styles.errorBalance}>{Translation.PAYMENT.MERCHAT_EXCEED_BALANCE}</Text>}
					<View style={styles.resultView}>
						<Text style={styles.resultText}>{Translation.PAYMENT.REDEMPTION_FEE}(1.5%)</Text>
						<Text style={styles.resultText}>{Translation.COMMON.USD} {(Number(amount)*0.015).toFixed(2)}</Text>
					</View>
					<View style={styles.resultView}>
						<Text style={styles.resultText}>{Translation.PAYMENT.NET_CASH_OUT}</Text>
						<Text style={styles.resultText}>{Translation.COMMON.USD} {(Number(amount)*0.985).toFixed(2)}</Text>
					</View>
				</View>
			</ScrollView>
			<SafeAreaView style={styles.bottomView}>
				<Button
					type={BUTTON_TYPES.PURPLE}
					disabled={!goNext || exceed}
					title={Translation.BUTTON.CONFIRM}
					onPress={viewConfirm}
				/>
			</SafeAreaView>

			{ isVisible && (
				<Dialog visible={isVisible} onClose={()=>setIsVisible(false)} backgroundStyle={styles.dialogBg}>
					<View style={dialogViewBase}>
						<View style={styles.dialogWrap}>
							<Text style={styles.dialogHeader}>{Translation.PAYMENT.CASH_OUT_CONFIRM}</Text>
							<Text style={styles.resultText}>{`You will redeem ${Number(amount).toFixed(2)} BerkShares for USD ${(Number(amount)*0.985).toFixed(2)} after a 1.5% fee.`}</Text>
						</View>
						<Button
							type={BUTTON_TYPES.PURPLE}
							title={Translation.BUTTON.CASH_OUT}
							onPress={doCashout}
						/>
					</View>
				</Dialog>
			)}
		</KeyboardAvoidingView>
	);
}

export default MerchantCashoutAmount