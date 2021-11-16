import React, {useEffect, useContext, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, Button, CancelBtn, BorderedInput } from "src/shared/uielements";
import { viewBase, wrappingContainerBase, underlineHeader } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { BUTTON_TYPES } from 'src/constants';
import { colors } from "src/theme/colors";
import { QRCodeEntry } from '../../utils/types';
import { showLoadingProgress, hideLoadingProgress } from '../../store/loading/loading.actions';
import { ToastType, SECURITY_ID, PaymentMode, LoadingScreenTypes } from 'src/utils/types';
import { WalletState } from 'src/store/wallet/wallet.reducer';
import { AppState } from 'src/store';
import { showToast } from 'src/utils/common';
import { UserAPI } from 'src/api';
import { ITransactionRequest } from 'src/api/types';
import { AuthContext } from 'src/auth';
import { loadPersonalWallet, loadBusinessWallet } from 'src/store/wallet/wallet.actions';
import { loadPersonalTransactions, loadBusinessTransactions } from 'src/store/transaction/transaction.actions';
import BankLinkDialog from 'src/shared/uielements/BankLinkDialog';
import { UserType } from '../../auth/types';

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40
	},
	bottomView: {
		padding: 20,
		paddingBottom: 45
	},
	label: { 
		color: colors.text, 
		fontSize: 12,
		paddingTop: 10
	},
	bodyText: {
		color: colors.bodyText
	}
});

const PaymentReceiveAmount = (): JSX.Element => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const route = useRoute()
	const [openAmount, setOpenAmount] = useState<string>("");
	const [goNext, setGoNext] = useState<boolean>(false);
	const [isLowAmountDialog, setIsLowAmountDialog] = useState<boolean>(false);
	const [dwollaId, setDwollaId] = useState<string|undefined>(undefined)
	
	const { personalWallet, businessWallet } = useSelector((state: AppState) => state.walletReducer) as WalletState;
	const { customerDwollaId, businessDwollaId, userType } = useContext(AuthContext);

	const [state, setState] = useState<any>({
		securityId: SECURITY_ID,
		to: "",
		amount: 0,
		mode: PaymentMode.SELECT_AMOUNT
	});

	useEffect(() => {
		setState(route.params)
		if(userType == UserType.Customer) {
			setDwollaId(customerDwollaId)
		} else {
			setDwollaId(businessDwollaId)
		}
	}, [])

	useEffect(() => {
		setGoNext(Number(openAmount) > 0);
	}, [openAmount]);

	const onLoadupDialogConfirm = () => {
		setIsLowAmountDialog(false);
		navigation.navigate(userType == UserType.Customer ? Routes.LOAD_UP : Routes.BUSINESS_LOADUP);
	}

	const onLoadupDialogCancel = () => {
		setIsLowAmountDialog(false);
	}

	const handleOpenPay = async () => {
		const amout = Number(openAmount)
		// check balance
		const wallet = userType == UserType.Customer ? personalWallet : businessWallet
		const loadWallet = userType == UserType.Customer ? loadPersonalWallet : loadBusinessWallet
		const loadTransactions = userType == UserType.Customer ? loadPersonalTransactions : loadBusinessTransactions
		if (wallet.availableBalance <= amout) {
			setIsLowAmountDialog(true);
		} else {
			if (dwollaId) {
				const request: ITransactionRequest = {
					toUserId: state.to,
					amount: openAmount,
					comment: ''
				};

				dispatch(showLoadingProgress(LoadingScreenTypes.PAYMENT_PENDING))
				const response = await UserAPI.transferTo(dwollaId, request);
				if (response.data) {
					await dispatch(loadWallet(dwollaId));
					await dispatch(loadTransactions(dwollaId));
					navigation.goBack();
					navigation.goBack();
					navigation.navigate(Routes.PAYMENT_SUCCESS);
				} else {
					navigation.navigate(Routes.PAYMENT_FAILED);
				}
				dispatch(hideLoadingProgress())
			} else {
				showToast(ToastType.ERROR, "Failed", "Whooops, something went wrong.");
			}
		}
	}

	return (
		<View style={viewBase}>
			<Header
				rightComponent={<CancelBtn text="Close" onClick={() => navigation.goBack()} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={underlineHeader}>
					<Text style={styles.headerText}>{Translation.PAYMENT.SPECIFY_PAYMENT}</Text>
				</View>
				<Text>Select the amount of BerkShares you would like to send.</Text>
				<View>
					<Text style={styles.label}>{Translation.LABEL.AMOUNT}</Text>
					<BorderedInput
						label="Amount"
						name="amount"
						keyboardType="decimal-pad"
						placeholder="Amount"
						prefix="B$"
						value={openAmount}
						onChange={(name: string, amount: string) => setOpenAmount(amount.replace(',', '.'))}
					/>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type={BUTTON_TYPES.DARK_GREEN}
						disabled={!goNext}
						title={Translation.BUTTON.CONFIRM}
						onPress={handleOpenPay}
					/>
				</View>
			</KeyboardAvoidingView>

			<BankLinkDialog 
				visible={isLowAmountDialog}
				description={Translation.PAYMENT.PAYMENT_NO_BALANCE_DETAIL}
				buttonTitle={Translation.BUTTON.LOAD_UP_BERKSHARES}
				onConfirm={onLoadupDialogConfirm}
				onCancel={onLoadupDialogCancel}
			/>
		</View>
	);
}

export default PaymentReceiveAmount