import React, {useState, useEffect} from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Text } from 'react-native-elements';
import { Header, Button, CancelBtn, BorderedInput, ToggleButton } from "src/shared/uielements";
import { baseHeader, viewBaseB, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import BusinessQRCodeGen from "./BusinessQRCodeGen";
import BusinessRequestSuccess from "./BusinessRequestSuccess";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { BUTTON_TYPES } from 'src/constants';
import BankLinkDialog from 'src/shared/uielements/BankLinkDialog'
import { useSelector } from 'react-redux';
import { AppState } from 'src/store';
import { WalletState } from 'src/store/wallet/wallet.reducer';
import { FundingSourceState } from 'src/store/funding-source/funding-source.reducer';

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
	switchView: {
		flex: 1, 
		justifyContent: 'center', 
		alignItems: 'center',
		marginTop: 20
	},
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
	},
	switch: {
		borderColor: colors.purple,
	},
	switchText: {
		color: colors.purple
	},
	openBtn: {
		marginBottom: 10
	},
	toggleBg: {
		backgroundColor: colors.purple
	}
});

const BusinessRequest = (): JSX.Element => {
	const navigation = useNavigation();
	const [state, setState] = useState<AmountState>({
		amount: "",
		costs: ""
	});
	const [goNext, setGoNext] = useState<boolean>(false);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [receivedAmount, setReceivedAmount] = useState<number>(0);
	const [isRequestSuccess, setIsRequestSuccess] = useState<boolean>(false);
	const [isOpenAmount, setIsOpenAmount] = useState<boolean>(false);
	const [bankDialogInfo, setBankDialogInfo] = useState<any>({
		isVisible: false,
		title: "",
		detail: "",
		buttonTitle: ""
	});

	const { businessWallet } = useSelector((state: AppState) => state.walletReducer) as WalletState;
	const { businessFundingSource } = useSelector((state: AppState) => state.fundingSourceReducer) as FundingSourceState;

	useEffect(() => {
		setGoNext(Number(state.costs) > 0);
	}, [state]);

	const onValueChange = (name: string, change: string) => {
		const costs = change.replace(',', '.');
		setState({
		  ...state,
		  [name]: costs,
		  costs: costs,
		} as AmountState);
	};

	const requestAmount = () => {
		setIsOpenAmount(false);
		setIsVisible(true);
	}

	const openAmount = () => {
		setIsOpenAmount(true);
		setIsVisible(true);
	}

	const onSuccess = (amount: number) => {
		setReceivedAmount(amount);
		setIsVisible(false);
		setIsRequestSuccess(true);
	}

	const onConfirm = () => {
		setIsRequestSuccess(false);
		navigation.navigate(Routes.BUSINESS_DASHBOARD);
	}

	const onClose = () => {
		setIsVisible(false);
	}

	const onPressPay = () => {
		if (businessWallet.availableBalance > 0) {
			navigation.navigate(Routes.BUSINESS_QRCODE_SCAN)
			return
		}

		if(businessFundingSource) {
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

		if(businessFundingSource) {
			navigation.navigate(Routes.BUSINESS_LOADUP);
		} else {
			navigation.navigate(Routes.BUSINESS_BANK_ACCOUNT);
		}
	}

	const onBankDialogCancel = () => {
		setBankDialogInfo({
			...bankDialogInfo,
			isVisible: false
		})
	}

	return (
		<View style={viewBaseB}>
			<Header
				rightComponent={<CancelBtn color={colors.purple} text={Translation.BUTTON.CLOSE} onClick={() => navigation.navigate(Routes.BUSINESS_DASHBOARD)} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={baseHeader}>
					<View style={styles.switchView}>
						<ToggleButton
							value={false}
							onChange={onPressPay}
							activeText="Pay"
							inActiveText="Receive"
							style={styles.switch}
							textStyle={styles.switchText}
							circleStyle={styles.toggleBg}
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
						placeholderTextColor={colors.greyedPurple}
						prefix="B$"
						style={styles.input}
						textStyle={styles.text}
						value={state.amount}
						onChange={onValueChange}
					/>
				</View>
			</ScrollView>
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
						type={BUTTON_TYPES.PURPLE}
						disabled={!goNext}
						title={Translation.BUTTON.NEXT}
						onPress={requestAmount}
					/>
				</View>
			</KeyboardAvoidingView>
			{ isVisible && <BusinessQRCodeGen visible={isVisible} onSuccess={onSuccess} onClose={onClose} isOpenAmount={isOpenAmount} amount={Number(state.amount)} /> }
			{ isRequestSuccess && <BusinessRequestSuccess visible={isRequestSuccess} onClose={onConfirm} amount={receivedAmount} /> }

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

export default BusinessRequest