import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Text } from 'react-native-elements';
import { Header, Button, CancelBtn, BorderedInput, ToggleButton } from "src/shared/uielements";
import { baseHeader, viewBaseB, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import { PaymentsModule } from "src/modules";
import MerchantRequestSuccess from "./MerchantRequestSuccess";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { WalletContext, UserContext } from 'src/contexts';
import BankLinkDialog from 'src/shared/uielements/BankLinkDialog'
import { IWallet } from '@humanity.cash/types';

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
		marginHorizontal: 20,
		marginBottom: 20
	},
	switch: {
		borderColor: colors.purple,
	},
	switchText: {
		color: colors.purple
	},
	toggleBg: {
		backgroundColor: colors.purple
	},
	openBtn: {
		marginBottom: 10
	}
});

const MerchantRequest = (): JSX.Element => {
	const navigation = useNavigation();
	const [state, setState] = useState<AmountState>({
		amount: "",
		costs: ""
	});
	const [goNext, setGoNext] = useState<boolean>(false);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [receivedAmount, setReceivedAmount] = useState<number>(0);
	const [isRequestSuccess, setIsRequestSuccess] = useState<boolean>(false);

	const { businessDwollaId, user } = useContext(UserContext)
	const { businessWalletData, updateBusinessWalletData } = useContext(WalletContext)
	const businessFundingSource = businessWalletData?.availableFundingSource;
	const availableBalance = businessWalletData?.availableBalance;
	const [bankDialogInfo, setBankDialogInfo] = useState<any>({
		isVisible: false,
		title: "",
		detail: "",
		buttonTitle: ""
	});
	const [isOpenAmount, setIsOpenAmount] = useState<boolean>(false);

	useEffect(() => {
		setState({amount: "", costs: ""})
	}, [])

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
		navigation.navigate(Routes.MERCHANT_DASHBOARD);
	}

	const onClose = () => {
		setIsVisible(false);
	}

	const onPressPay = () => {
		if (availableBalance > 0) {
			navigation.navigate(Routes.MERCHANT_QRCODE_SCAN, {
				senderId: businessDwollaId, 
				walletData: businessWalletData,
				username: user?.business?.tag
			})
			return
		}

		if(businessFundingSource) {
			setBankDialogInfo({
				...bankDialogInfo,
				isVisible: true,
				title: Translation.LOAD_UP.LOAD_UP_NO_BANK_TITLE,
				detail: Translation.LOAD_UP.LOAD_UP_NO_BANK_DETAIL,
				buttonTitle: Translation.BUTTON.LOAD_UP_BERKSHARES
			})
		} else {
			setBankDialogInfo({
				...bankDialogInfo,
				isVisible: true,
				title: Translation.PAYMENT.PAYMENT_NO_BANK_TITLE,
				detail: Translation.PAYMENT.PAYMENT_NO_BANK_DETAIL,
				buttonTitle: Translation.BUTTON.LINK_BUSINESS_BANK
			})
		}
	}

	const onBankDialogConfirm = () => {
		onBankDialogCancel()

		if(businessFundingSource) {
			navigation.navigate(Routes.MERCHANT_LOADUP);
		} else {
			navigation.navigate(Routes.MERCHANT_BANK_ACCOUNT);
		}
	}

	const onBankDialogCancel = () => {
		setBankDialogInfo({
			...bankDialogInfo,
			isVisible: false
		})
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS == "ios" ? "padding" : "height"}
			style={viewBaseB}>
			<Header
				rightComponent={
					<CancelBtn 
						color={colors.purple} 
						text={Translation.BUTTON.CLOSE} 
						onClick={() => navigation.goBack()} />
				}
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
			<SafeAreaView style={styles.bottomView}>
				<Button
					type="transparent"
					title={Translation.BUTTON.OPEN_AMOUNT}
					style={styles.openBtn}
					onPress={openAmount}
				/>
				<Button
					type="purple"
					disabled={!goNext}
					title={Translation.BUTTON.NEXT}
					onPress={requestAmount}
				/>
			</SafeAreaView>
			{isVisible && <PaymentsModule.Request
				visible={isVisible}
				onSuccess={onSuccess}
				styles={paymentRequestStyles}
				onClose={onClose}
				isOpenAmount={isOpenAmount}
				amount={Number(state.amount)}
				ownerName={user?.business?.tag || ""}
				recieverId={businessDwollaId}
				walletData={businessWalletData}
				updateWalletData={(walletData: IWallet) => updateBusinessWalletData((pv: any) => ({ ...pv, ...walletData }))}
			/>}
			{isRequestSuccess && <MerchantRequestSuccess visible={isRequestSuccess} onClose={onConfirm} amount={receivedAmount} />}

			<BankLinkDialog 
				visible={bankDialogInfo.isVisible}
				title={bankDialogInfo.title}
				description={bankDialogInfo.detail}
				buttonTitle={bankDialogInfo.buttonTitle}
				onConfirm={onBankDialogConfirm}
				onCancel={onBankDialogCancel}
			/>
		</KeyboardAvoidingView>
	);
}

const paymentRequestStyles = StyleSheet.create({
	dialog: {
		height: 420
	},
	dialogBg: {
		backgroundColor: colors.overlayPurple
	},
	dialogWrap: {
		paddingHorizontal: 10,
		paddingTop: 70,
		height: "100%",
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	amount: {
		alignSelf: 'center',
		marginTop: 10,
		fontWeight: 'bold',
		fontSize: 32,
		lineHeight: 32,
		paddingTop: 20,
		color: colors.purple
	},
	ownerInfo: {
		position: 'absolute',
		top: -60,
		borderRadius: 40,
		alignItems: 'center'
	},
	image: {
		width: 80,
		height: 80,
		borderRadius: 40
	},
	ownerName: {
		fontWeight: 'bold',
		fontSize: 18,
		paddingVertical: 10,
		color: colors.purple
	}
});



export default MerchantRequest