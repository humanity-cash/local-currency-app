import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useContext, useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { TransactionsAPI } from 'src/api';
import { ITransactionRequest } from 'src/api/types';
import { BUTTON_TYPES } from 'src/constants';
import { UserContext, WalletContext } from 'src/contexts';
import { useCameraPermission } from 'src/hooks';
import * as Routes from 'src/navigation/constants';
import DataLoading from 'src/screens/loadings/DataLoading';
import { BackBtn, BorderedInput, Button, CancelBtn, Dialog, Header, Modal, ModalHeader, ToggleButton } from "src/shared/uielements";
import { loadPersonalTransactions } from 'src/store/transaction/transaction.actions';
import { colors } from "src/theme/colors";
import { baseHeader, dialogViewBase, modalViewBase, underlineHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import { calcFee, showToast } from 'src/utils/common';
import { PaymentMode, QRCodeEntry, SECURITY_ID, ToastType } from 'src/utils/types';
import { isQRCodeValid } from 'src/utils/validation';

type HandleScaned = {
	type: string,
	data: string,
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
        paddingVertical: 10
    },
	headerText: {
        marginTop: 10,
        fontSize: 32,
        lineHeight: 40,
        paddingTop: 20
    },
	description: {
		color: colors.bodyText,
		fontSize: 10,
		textAlign: 'center',
		marginTop: 10
	},
	view: {
		paddingVertical: 10,
		alignItems: 'center'
	},
	transparentBtn: {
		backgroundColor: 
		colors.white, 
		borderWidth: 1, 
		marginTop: 20,
		marginBottom: 10
	},
	detailView: {
		flexDirection: 'row', 
		justifyContent: 'space-between'
	},
	detailText: {
		fontSize: 14,
	},
	switchView: {
		flex: 1, 
		justifyContent: 'center', 
		alignItems: 'center'
	},
	switch: {
		borderColor: colors.darkGreen,
	},
	switchText: {
		color: colors.darkGreen
	},
	label: { 
		color: colors.text, 
		fontSize: 12,
		paddingTop: 10
	},
	bottomView: {
		padding: 20,
		paddingBottom: 45
	}
});

type PaymentConfirmProps = {
	visible: boolean,
	onConfirm: (isRoundUp: boolean) => void,
	onCancel: () => void,
	payInfo: QRCodeEntry
}

const PaymentConfirm = (props: PaymentConfirmProps) => {
	const { user } = useContext(UserContext);

	const firstName = user?.customer?.firstName;
	const lastName = user?.customer?.lastName;
	const amountCalcedFee = props.payInfo.amount;

	return (
		<Dialog visible={props.visible} onClose={props.onCancel} style={styles.dialog}>
			<View style={dialogViewBase}>
				<View style={styles.dialogWrap}>
                    <View style={styles.ownerInfo}>
                        <Image
                            source={require("../../../assets/images/feed1.png")}
                            style={styles.image}
                        />
                        <Text style={styles.ownerName}>{firstName + ' ' + lastName}</Text>
                    </View>

					<Text style={styles.headerText}>B$ {amountCalcedFee.toFixed(2)}</Text>
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
						type={BUTTON_TYPES.DARK_GREEN}
						title={`Round up to B$ ${Math.ceil(amountCalcedFee).toFixed(2)}`}
						onPress={() => props.onConfirm(true)}
					/>
					<Text style={styles.description}>{Translation.PAYMENT.NOT_REFUNABLE_DONATION}</Text>
				</View>
			</View>
		</Dialog>
	)
}

type LowAmountProps = {
	visible: boolean,
	onConfirm: () => void,
	onCancel: () => void
}

const LowAmount = (props: LowAmountProps) => {

	return (
		<Dialog visible={props.visible} onClose={() => props.onCancel()}>
			<View style={dialogViewBase }>
				<View>
					<View style={ baseHeader }>
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

const QRCodeScan = (): JSX.Element => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { customerDwollaId } = useContext(UserContext);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const hasPermission = useCameraPermission();
	const [isScanned, setIsScanned] = useState<boolean>(false);
	const [isPaymentDialog, setIsPaymentDialog] = useState<boolean>(false);
	const [isLowAmountDialog, setIsLowAmountDialog] = useState<boolean>(false);
	const [isOpenPayment, setIsOpenPayment] = useState<boolean>(false);
	const [openAmount, setOpenAmount] = useState<string>("");
	const [goNext, setGoNext] = useState<boolean>(false);
	const { walletData } = useContext(WalletContext);
	const [state, setState] = useState<QRCodeEntry>({
		securityId: SECURITY_ID,
		to: "",
		amount: 0,
		mode: PaymentMode.SELECT_AMOUNT
	});

	useEffect(() => {
		setIsScanned(false);
	});

	useEffect(() => {
		setGoNext(Number(openAmount) > 0);
	}, [openAmount]);

	const handleBarCodeScanned = (data: HandleScaned) => {
		if (isQRCodeValid(data.data)) {
			const qrcodeData = JSON.parse(data.data) as QRCodeEntry;
			setState(qrcodeData);
			setIsScanned(true);
			if (qrcodeData.mode == PaymentMode.OPEN_AMOUNT) {
				setIsOpenPayment(true);
			} else {
				setIsPaymentDialog(true);
			}
		} else {
			showToast(ToastType.ERROR, "Whooops, something went wrong.", "Invalid QRCode!");
		}
	}

	if (hasPermission === false) {
		return <Text>{Translation.OTHER.NO_CAMERA_PERMISSION}</Text>;
	}

	const onPayConfirm = async (isRoundUp: boolean) => {
		setIsLoading(true);
		const amountCalcedFee = state.amount + calcFee(state.amount);
		setIsPaymentDialog(false);
		
		// check balance
		if (walletData?.availableBalance <= state.amount) {
			setIsLowAmountDialog(true);
		} else {
			if (customerDwollaId) {
				const request: ITransactionRequest = {
					toUserId: state.to,
					amount: isRoundUp ? Math.ceil(amountCalcedFee).toString() : amountCalcedFee.toString(),
					comment: ''
				};

				const response = await TransactionsAPI.transferTo(customerDwollaId, request);
				
				if (response.data) {
					// Update user info
					await dispatch(loadPersonalTransactions(customerDwollaId));
					navigation.navigate(Routes.PAYMENT_SUCCESS);
				} else {
					navigation.navigate(Routes.PAYMENT_FAILED);
				}
			} else {
				showToast(ToastType.ERROR, "Failed", "Whooops, something went wrong.");
			}
		}

		setIsLoading(false);
	}

	const onLoadUp = () => {
		setIsLowAmountDialog(false);
		navigation.navigate(Routes.LOAD_UP);
	}

	const handleOpenPay = async () => {
		setIsOpenPayment(false);
		// check balance
		if (walletData?.availableBalance <= state.amount) {
			setIsLowAmountDialog(true);
		} else {
			if (customerDwollaId) {
				const request: ITransactionRequest = {
					toUserId: state.to,
					amount: openAmount,
					comment: ''
				};

				setIsLoading(true)
				const response = await TransactionsAPI.transferTo(customerDwollaId, request);
				if (response.data) {
					await dispatch(loadPersonalTransactions(customerDwollaId));
					navigation.navigate(Routes.PAYMENT_SUCCESS);
				} else {
					navigation.navigate(Routes.PAYMENT_FAILED);
				}
				setIsLoading(false)
			} else {
				showToast(ToastType.ERROR, "Failed", "Whooops, something went wrong.");
			}
		}
	}

	const onCancle = () => {
		setIsPaymentDialog(false);
		setIsLowAmountDialog(false);
		setIsOpenPayment(false);
		navigation.navigate(Routes.DASHBOARD);
	}

	return (
		<View style={viewBase}>
			<DataLoading visible={isLoading} />
			<View style={styles.container}>
				<BarCodeScanner
					onBarCodeScanned={isScanned ? undefined : handleBarCodeScanned}
					style={StyleSheet.absoluteFillObject}
				/>
			</View>
			<View style={styles.toggleView}>
				<Header
					rightComponent={<CancelBtn text={Translation.BUTTON.CLOSE} color={colors.white} onClick={() => navigation.navigate(Routes.DASHBOARD)} />}
				/>
				<View style={styles.switchView}>
					<ToggleButton
						value={true}
						onChange={()=>navigation.navigate(Routes.PAYMENT_REQUEST)}
						activeText="Pay"
						inActiveText="Receive"
						style={styles.switch}
						textStyle={styles.switchText}
					/>
				</View>
			</View>
			{ isPaymentDialog && <PaymentConfirm visible={isPaymentDialog} payInfo={state} onConfirm={(mode) => onPayConfirm(mode)} onCancel={onCancle} /> }
			{ isLowAmountDialog && <LowAmount visible={isLowAmountDialog} onConfirm={onLoadUp} onCancel={onCancle} /> }
			{ isOpenPayment && (
				<Modal visible={isOpenPayment}>
					<View style={ modalViewBase }>
						<ModalHeader
							leftComponent={<BackBtn onClick={() => setIsOpenPayment(false)} />}
							rightComponent={<CancelBtn text="Close" onClick={onCancle} />}
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
					</View>
				</Modal>
			)}
		</View>
	);
}

export default QRCodeScan