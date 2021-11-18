import React, { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Text } from 'react-native-elements';
import { Header, Button, CancelBtn, BorderedInput, ToggleButton } from "src/shared/uielements";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import QRCodeGen from "./QRCodeGen";
import PaymentRequestSuccess from "./PaymentRequestSuccess";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { WalletState } from 'src/store/wallet/wallet.reducer';
import { FundingSourceState } from 'src/store/funding-source/funding-source.reducer';
import { useSelector } from 'react-redux';
import { AppState } from 'src/store'
import BankLinkDialog from 'src/shared/uielements/BankLinkDialog'

type AmountState = {
	amount: string,
	cost: string
}

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40
	},
	switchView: {
		flex: 1, 
		justifyContent: 'center', 
		alignItems: 'center',
		marginTop: 40
	},
	contentView: { 
		marginTop: 5
	},
	label: { 
		marginTop: 20, 
		color: colors.text, 
		fontSize: 12 
	},
	bottomView: {
		padding: 20,
		paddingBottom: 45
	},
	openBtn: {
		marginBottom: 10
	},
	switch: {
		borderColor: colors.darkGreen,
	},
	switchText: {
		color: colors.darkGreen
	}
});

const PaymentRequest = (): JSX.Element => {
	const navigation = useNavigation();
	const [state, setState] = useState<AmountState>({
		amount: "",
		cost: ""
	});
	const [goNext, setGoNext] = useState<boolean>(false);
	const [receivedAmount, setReceivedAmount] = useState<number>(0);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [isRequestSuccess, setIsRequestSuccess] = useState<boolean>(false);
	const [isOpenAmount, setIsOpenAmount] = useState<boolean>(false);
	const [bankDialogInfo, setBankDialogInfo] = useState<any>({
		isVisible: false,
		title: "",
		detail: "",
		buttonTitle: ""
	});
	const { clientFundingSource } = useSelector((state: AppState) => state.fundingSourceReducer) as FundingSourceState;
	const { clientWallet } = useSelector((state: AppState) => state.walletReducer) as WalletState;

	useEffect(() => {
		setGoNext(Number(state.amount) > 0);
	}, [state]);

	const onValueChange = (name: string, change: string) => {
		const costs = change.replace(',', '.');
		setState({
		  ...state,
		  [name]: costs,
		  costs: costs,
		} as AmountState);
	};

	const openAmount = () => {
		setIsOpenAmount(true);
		setIsVisible(true);
	}

	const requestAmount = () => {
		setIsOpenAmount(false);
		setIsVisible(true);
	}

	const onSuccess = (amount: number) => {
		setReceivedAmount(amount);
		setIsVisible(false);
		setIsRequestSuccess(true);
	}

	const onConfirm = () => {
		setIsRequestSuccess(false);
		navigation.navigate(Routes.DASHBOARD);
	}

	const onClose = () => {
		setIsVisible(false);
	}

	const onPressPay = () => {
		if (clientWallet.availableBalance > 0) {
			navigation.navigate(Routes.QRCODE_SCAN)
			return
		}

		if(clientFundingSource) {
			setBankDialogInfo({
				...bankDialogInfo,
				isVisible: true,
				detail: Translation.PAYMENT.PAYMENT_NO_BALANCE_DETAIL,
				buttonTitle: Translation.BUTTON.LOAD_UP_BERKSHARES
			})
		} else {
			setBankDialogInfo({
				...bankDialogInfo,
				isVisible: true,
				detail: Translation.PAYMENT.PAYMENT_NO_BANK_DETAIL,
				buttonTitle: Translation.BUTTON.LINK_BANK
			})
		}
	}

	const onBankDialogConfirm = () => {
		onBankDialogCancel()

		if(clientFundingSource) {
			navigation.navigate(Routes.LOAD_UP);
		} else {
			navigation.navigate(Routes.SELECT_BANK);
		}
	}

	const onBankDialogCancel = () => {
		setBankDialogInfo({
			...bankDialogInfo,
			isVisible: false
		})
	}

	return (
		<View style={viewBase}>
			<Header
				rightComponent={<CancelBtn text={Translation.BUTTON.CLOSE} onClick={() => navigation.navigate(Routes.DASHBOARD)} />}
			/>
			<View style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<View style={styles.switchView}>
						<ToggleButton
							value={false}
							onChange={onPressPay}
							activeText="Pay"
							inActiveText="Receive"
							style={styles.switch}
							textStyle={styles.switchText}
						/>
					</View>
				</View>
				<View style={styles.contentView}>
					<Text style={styles.label}>{Translation.LABEL.AMOUNT}</Text>
					<BorderedInput
						label="Amount"
						name="amount"
						keyboardType="decimal-pad"
						placeholder="Amount"
						prefix="B$"
						value={state.amount}
						onChange={onValueChange}
					/>
				</View>
			</View>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type="transparent"
						title={Translation.BUTTON.LET_CHOOSE_AMOUNT}
						style={styles.openBtn}
						onPress={openAmount}
					/>
					<Button
						type="darkGreen"
						disabled={!goNext}
						title={Translation.BUTTON.NEXT}
						onPress={requestAmount}
					/>
				</View>
			</KeyboardAvoidingView>
			{ isVisible && <QRCodeGen visible={isVisible} onSuccess={onSuccess} onClose={onClose} isOpenAmount={isOpenAmount} amount={Number(state.amount)} /> }
			{ isRequestSuccess && <PaymentRequestSuccess visible={isRequestSuccess} onClose={onConfirm} amount={receivedAmount} /> }

			<BankLinkDialog 
				visible={bankDialogInfo.isVisible}
				description={bankDialogInfo.detail}
				buttonTitle={bankDialogInfo.buttonTitle}
				onConfirm={onBankDialogConfirm}
				onCancel={onBankDialogCancel}
			/>
		</View>
	);
}

export default PaymentRequest