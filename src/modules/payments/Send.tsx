import { useNavigation } from '@react-navigation/core';
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View, SafeAreaView } from 'react-native';
import { Text } from 'react-native-elements';
import PaymentLoading from 'src/screens/loadings/PaymentPending';
import { TransactionsAPI } from 'src/api';
import { ITransactionRequest } from 'src/api/types';
import { BUTTON_TYPES } from 'src/constants';
import { useCameraPermission } from 'src/hooks';
import * as Routes from 'src/navigation/constants';
import { BackBtn, BorderedInput, Button, CancelBtn, Dialog, Header, Modal, ModalHeader, ToggleButton } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, dialogViewBase, modalViewBase, underlineHeaderB, viewBase, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import { showToast } from 'src/utils/common';
import { PaymentMode, QRCodeEntry, SECURITY_ID, ToastType } from 'src/utils/types';
import { isQRCodeValid } from 'src/utils/validation';

type HandleScaned = {
	type: string,
	data: string,
}

type LowAmountProps = {
	visible: boolean,
	onConfirm: () => void,
	onCancel: () => void
}

const LowAmount = (props: LowAmountProps) => {

	return (
		<Dialog visible={props.visible} onClose={() => props.onCancel()}>
			<View style={dialogViewBase}>
				<View>
					<View style={baseHeader}>
						<Text style={styles.headerText}> Whoooops. You cannot the payment. </Text>
					</View>
					<View style={styles.view}>
						<Text style={styles.detailText}>You have too little funds available. Please load up your balance first.</Text>
					</View>
				</View>

				<View>
					<Button
						type={BUTTON_TYPES.DARK_GREEN}
						title={Translation.BUTTON.LOAD_UP}
						onPress={() => props.onConfirm()}
					/>
				</View>
			</View>
		</Dialog>
	)
}

type PaymentConfirmProps = {
	visible: boolean,
	onConfirm: (isRoundUp: boolean) => void,
	onCancel: () => void,
	payInfo: QRCodeEntry,
	username: string
}

const PaymentConfirm = (props: PaymentConfirmProps) => {
	const amountCalcedFee = props.payInfo.amount;
	const roundUpTotalAmount = (Math.ceil(amountCalcedFee) - amountCalcedFee) ? Math.ceil(amountCalcedFee) : amountCalcedFee + 1;

	return (
		<Dialog visible={props.visible} onClose={props.onCancel} backgroundStyle={styles.dialogBg} style={styles.dialog}>
			<View style={dialogViewBase}>
				<View style={styles.dialogWrap}>
					<View style={styles.ownerInfo}>
						<Image
							source={require("../../../assets/images/feed1.png")}
							style={styles.image}
						/>
						<Text style={styles.ownerName}>{props.username}</Text>
					</View>

					<Text style={styles.headerText}>B$ {props.payInfo.amount?.toFixed(2)}</Text>
					<View style={styles.view}>
						<Text style={styles.detailText}>or</Text>
						<Text style={styles.detailText}>{Translation.PAYMENT.CHOOSE_ROUND_UP}</Text>
					</View>
				</View>

				<View>
					<Button
						type={BUTTON_TYPES.TRANSPARENT}
						style={styles.transparentBtn}
						title={`Pay B$ ${amountCalcedFee.toFixed(2)}`}
						onPress={() => props.onConfirm(false)}
					/>
					<Button
						type={BUTTON_TYPES.PURPLE}
						title={`Round up to B$ ${roundUpTotalAmount.toFixed(2)}`}
						onPress={() => props.onConfirm(true)}
					/>
					<Text style={styles.description}>{Translation.PAYMENT.NOT_REFUNABLE_DONATION}</Text>
				</View>
			</View>
		</Dialog>
	)
}

interface SendPaymentInput {
	route: {
		params: {
			senderId: string
			walletData: { availableBalance: number }
			username: string
		}
	}
}

const SendPayment = (props: SendPaymentInput): JSX.Element => {
	const { senderId, walletData, username } = props?.route?.params;
	if(!senderId || !walletData) return <div>InValid</div>
	const navigation = useNavigation();
	const hasPermission = useCameraPermission();
	const [isScanned, setIsScanned] = useState<boolean>(false);
	const [isPaymentDialog, setIsPaymentDialog] = useState<boolean>(false);
	const [isOpenPayment, setIsOpenPayment] = useState<boolean>(false);
	const [openAmount, setOpenAmount] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [qrCodeData, setQRCodeData] = useState<QRCodeEntry>({
		securityId: SECURITY_ID,
		to: "",
		amount: 0,
		mode: PaymentMode.SELECT_AMOUNT
	});
	const [goNext, setGoNext] = useState<boolean>(false);
	const [isLowAmountDialog, setIsLowAmountDialog] = useState<boolean>(false);

	useEffect(() => {
		setGoNext(Number(openAmount) > 0);
	}, [openAmount]);

	const handleBarCodeScanned = (data: HandleScaned) => {
		if (isQRCodeValid(data.data)) {
			const qrcodeData = JSON.parse(data.data) as QRCodeEntry;
			setQRCodeData(qrcodeData);
			setIsScanned(true);

			if (qrcodeData.mode == PaymentMode.OPEN_AMOUNT) {
				setIsOpenPayment(true);
			} else {
				setIsPaymentDialog(true);
			}
		} else {
			showToast(ToastType.ERROR, "Whooops, something went wrong.", "Invalide QRCode");
		}
	};

	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	const onPayConfirm = async (isRoundUp: boolean) => {
		setIsPaymentDialog(false);
		setIsScanned(false);

		if (walletData.availableBalance <= qrCodeData.amount) {
			setIsLowAmountDialog(true);
			return;
		}

		setIsLoading(true)
		if (senderId) {
			const request: ITransactionRequest = {
				toUserId: qrCodeData.to,
				amount: qrCodeData.amount.toString(),
				comment: ''
			};
			if (isRoundUp) {
				const roundUpAmount = Math.ceil(qrCodeData.amount) - Number(qrCodeData.amount) || 1;
				request.roundUpAmount = roundUpAmount.toString();
			}
			const response = await TransactionsAPI.transferTo(senderId, request);
			cleanUpState();
			if (response.data) {
				navigation.navigate(Routes.MERCHANT_PAYMENT_SUCCESS);
			} else {
				showToast(ToastType.ERROR, "Failed", "Whooops, something went wrong.");
				navigation.navigate(Routes.MERCHANT_DASHBOARD);
			}
		} else {
			showToast(ToastType.ERROR, "Failed", "Whooops, something went wrong.");
		}
		setIsLoading(false)
	};

	const onLoadUp = () => {
		setIsLowAmountDialog(false);
		navigation.navigate(Routes.MERCHANT_LOADUP);
	}

	const handleOpenPay = async () => {
		setIsOpenPayment(false);
		if (walletData.availableBalance <= qrCodeData.amount) {
			setIsLowAmountDialog(true);
			return;
		}

		if (senderId) {
			const request: ITransactionRequest = {
				toUserId: qrCodeData.to,
				amount: openAmount,
				comment: ''
			};
			setIsLoading(true)
			const response = await TransactionsAPI.transferTo(senderId, request);
			if (response.data) {
				navigation.navigate(Routes.MERCHANT_PAYMENT_SUCCESS);
			} else {
				showToast(ToastType.ERROR, "Whooops, something went wrong.", "Connection failed");
			}
			setIsLoading(false)
		} else {
			showToast(ToastType.ERROR, "Whooops, something went wrong.", "Connection failed");
		}
	}

	const cleanUpState = () => {
		setIsPaymentDialog(false);
		setIsLowAmountDialog(false);
		setIsOpenPayment(false);
		setIsLoading(false);
		setIsScanned(false);
		setQRCodeData({} as QRCodeEntry)
	}

	const onClose = () => {
		cleanUpState();
		navigation.navigate(Routes.MERCHANT_DASHBOARD);
	};

	return (
		<View style={viewBase}>
			<PaymentLoading visible={isLoading} />
			<View style={styles.container}>
				{
					(!isPaymentDialog && !isOpenPayment && !isLowAmountDialog) &&
					<BarCodeScanner
						onBarCodeScanned={isScanned ? undefined : handleBarCodeScanned}
						style={StyleSheet.absoluteFillObject}
					/>
				}
			</View>
			<View style={styles.toggleView}>
				<Header
					rightComponent={<CancelBtn text={Translation.BUTTON.CLOSE} color={colors.white} onClick={() => navigation.navigate(Routes.MERCHANT_DASHBOARD)} />}
				/>
				<View style={styles.switchView}>
					<ToggleButton
						value={true}
						onChange={() => navigation.navigate(Routes.MERCHANT_REQUEST)}
						activeText="Pay"
						inActiveText="Receive"
						style={styles.switch}
						textStyle={styles.switchText}
						circleStyle={styles.toggleBg}
					/>
				</View>
			</View>
			{isPaymentDialog && <PaymentConfirm username={username} visible={isPaymentDialog} payInfo={qrCodeData} onConfirm={onPayConfirm} onCancel={onClose} />}
			{isLowAmountDialog && <LowAmount visible={isLowAmountDialog} onConfirm={onLoadUp} onCancel={onClose} />}
			{isOpenPayment && (
				<Modal visible={isOpenPayment}>
					<KeyboardAvoidingView
						behavior={Platform.OS == "ios" ? "padding" : "height"}
						style={modalViewBase}>
						<ModalHeader
							leftComponent={<BackBtn color={colors.purple} onClick={() => setIsOpenPayment(false)} />}
							rightComponent={<CancelBtn color={colors.purple} text="Close" onClick={onClose} />}
						/>
						<ScrollView style={wrappingContainerBase}>
							<View style={underlineHeaderB}>
								<Text style={styles.headerText}>{Translation.PAYMENT.SPECIFY_PAYMENT}</Text>
							</View>
							<Text style={styles.switchText}>Select the amount of BerkShares you would like to send.</Text>
							<View>
								<Text style={styles.label}>{Translation.LABEL.AMOUNT}</Text>
								<BorderedInput
									label="Amount"
									name="amount"
									placeholderTextColor={colors.greyedPurple}
									keyboardType="decimal-pad"
									placeholder="Amount"
									prefix="B$"
									style={styles.input}
									textStyle={styles.switchText}
									value={openAmount}
									onChange={(name: string, amount: string) => setOpenAmount(amount.replace(',', '.'))}
								/>
							</View>
						</ScrollView>
						<SafeAreaView style={styles.bottomView}>
							<Button
								type={BUTTON_TYPES.PURPLE}
								disabled={!goNext}
								title={Translation.BUTTON.CONFIRM}
								onPress={handleOpenPay}
							/>
						</SafeAreaView>
					</KeyboardAvoidingView>
				</Modal>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	toggleView: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: 200,
		backgroundColor: 'rgba(0,0,0,0.8)'
	},
	dialog: {
		height: 450
	},
	dialogBg: {
		backgroundColor: colors.overlayPurple
	},
	dialogWrap: {
		position: 'relative',
		paddingHorizontal: 10,
		paddingTop: 70,
		height: "100%",
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
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
	},
	headerText: {
		marginTop: 10,
		fontWeight: 'bold',
		fontSize: 32,
		lineHeight: 32,
		paddingTop: 20,
		color: colors.purple
	},
	view: {
		paddingVertical: 10,
		alignItems: 'center'
	},
	transparentBtn: {
		backgroundColor: colors.white,
		color: colors.purple,
		borderWidth: 1,
		marginTop: 20,
		marginBottom: 10,
		borderColor: colors.purple
	},
	detailText: {
		fontSize: 14,
		color: colors.purple,
		textAlign: 'center'
	},
	switchView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	roundBtn: {
		marginBottom: 10,
		borderWidth: 1,
		borderColor: colors.purple
	},
	description: {
		color: colors.bodyText,
		fontSize: 10,
		textAlign: 'center',
		marginTop: 10
	},
	switch: {
		borderColor: colors.purple,
	},
	switchText: {
		color: colors.purple
	},
	toggleBg: {
		backgroundColor: colors.overlayPurple
	},
	label: {
		color: colors.bodyText,
		fontSize: 12,
		paddingTop: 10
	},
	input: {
		backgroundColor: colors.white,
		color: colors.purple
	},
	bottomView: {
		marginHorizontal: 20,
		marginBottom: 45
	}
});

export default SendPayment 
