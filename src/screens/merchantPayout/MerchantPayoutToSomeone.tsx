import React, {useState, useEffect} from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Text } from 'react-native-elements';
import { Header, Button, CancelBtn, BackBtn, BorderedInput, Dialog } from "src/shared/uielements";
import { underlineHeaderB, viewBaseB, dialogViewBase, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { BUTTON_TYPES } from 'src/constants';
import { BarCodeScanner } from 'expo-barcode-scanner';
import SettingDialog from 'src/shared/uielements/SettingDialog';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'src/store';
import { WalletState } from 'src/store/wallet/wallet.reducer';
import { FundingSourceState } from 'src/store/funding-source/funding-source.reducer';
import BankLinkDialog from 'src/shared/uielements/BankLinkDialog';

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

	const { businessWallet } = useSelector((state: AppState) => state.walletReducer) as WalletState;
	const { businessFundingSource } = useSelector((state: AppState) => state.fundingSourceReducer) as FundingSourceState;
	const [isBankDialog, setIsBankDialog] = useState<boolean>(false);
	const [isLoadupDialog, setIsLoadupDialog] = useState<boolean>(false);
	const [isSetting, setIsSetting] = useState(false)

	useEffect(() => {
		setGoNext(amount != "");
	}, [amount]);

	const onBankDialogConfirm = () => {
		setIsBankDialog(false);
		navigation.navigate(Routes.MERCHANT_BANK_ACCOUNT);
	}

	const onBankDialogCancel = () => {
		setIsBankDialog(false);
	}

	const onLoadupDialogConfirm = () => {
		setIsLoadupDialog(false);
		navigation.navigate(Routes.MERCHANT_LOADUP);
	}

	const onLoadupDialogCancel = () => {
		setIsLoadupDialog(false);
	}

	const onValueChange = (name: string, change: string) => {
		setAmount(change.replace(',', '.'));
	};

    const doScan = async () => {
		setIsVisible(false);
		const {status} = await BarCodeScanner.requestPermissionsAsync();
		if(status === 'granted') {
			if(businessWallet.availableBalance > 0) {
				navigation.navigate(Routes.MERCHANT_PAYOUT_QR_SCAN);
			} else {
				if(businessFundingSource) {
					setIsLoadupDialog(true)
				} else {
					setIsBankDialog(true)
				}
			} 
		} else {
			setIsSetting(true)
		}
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

            { isVisible && (
				<Dialog visible={isVisible} onClose={()=>setIsVisible(false)} backgroundStyle={styles.dialogBg}>
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

			<BankLinkDialog 
				visible={isBankDialog}
				description={Translation.PAYMENT.PAYMENT_NO_BANK_DETAIL}
				buttonTitle={Translation.BUTTON.LINK_BANK}
				onConfirm={onBankDialogConfirm}
				onCancel={onBankDialogCancel}
			/>
			<BankLinkDialog 
				visible={isLoadupDialog}
				description={Translation.PAYMENT.PAYMENT_NO_BALANCE_DETAIL}
				buttonTitle={Translation.BUTTON.LOAD_UP_BERKSHARES}
				onConfirm={onLoadupDialogConfirm}
				onCancel={onLoadupDialogCancel}
			/>

			<SettingDialog
				visible={isSetting}
				onCancel={() => setIsSetting(false)}
				description={Translation.OTHER.NO_CAMERA_PERMISSION_DETAIL}
			/>

		</View>
	);
}

export default MerchantCashoutAmount