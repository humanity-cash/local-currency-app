import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Text } from 'react-native-elements';
import { useCameraPermission } from 'src/hooks';
import { AuthContext } from 'src/auth';
import { Header, CancelBtn, Dialog, Button, ToggleButton, Modal, ModalHeader, BorderedInput, BackBtn } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { viewBase, dialogViewBase, modalViewBase, wrappingContainerBase, underlineHeaderB } from "src/theme/elements";
import { BarCodeScanner } from 'expo-barcode-scanner';
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { BUTTON_TYPES } from 'src/constants';
import { QRCodeEntry, SECURITY_ID, PaymentMode, ToastType, LoadingScreenTypes } from 'src/utils/types';
import { UserAPI } from 'src/api';
import { ITransactionRequest } from 'src/api/types';
import { calcFee, showToast } from 'src/utils/common';
import { isQRCodeValid } from 'src/utils/validation';
import { loadBusinessWallet } from 'src/store/wallet/wallet.actions';
import { updateLoadingStatus } from 'src/store/loading/loading.actions';
import { loadBusinessTransactions } from 'src/store/transaction/transaction.actions';
import { useDispatch } from 'react-redux';
import { WalletState } from 'src/store/wallet/wallet.reducer';
import { useSelector } from 'react-redux';
import { AppState } from 'src/store';

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
        // alignSelf: 'center',
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
		padding: 20,
		paddingBottom: 45
	}
});

type PaymentConfirmProps = {
	visible: boolean,
	onConfirm: (isRoundUp: boolean) => void,
	onCancel: () => void,
	payInfo: QRCodeEntry,
}

const PaymentConfirm = (props: PaymentConfirmProps) => {
	const { userAttributes } = useContext(AuthContext);

	const firstName = userAttributes?.["custom:owner.firstName"];
    const lastName = userAttributes?.["custom:owner.lastName"];
	const amountCalcedFee = props.payInfo.amount + calcFee(props.payInfo.amount);

	return (
		<Dialog visible={props.visible} onClose={props.onCancel} backgroundStyle={styles.dialogBg} style={styles.dialog}>
			<View style={dialogViewBase}>
				<View style={styles.dialogWrap}>
                    <View style={styles.ownerInfo}>
                        <Image
                            source={require("../../../assets/images/feed1.png")}
                            style={styles.image}
                        />
                        <Text style={styles.ownerName}>{firstName + ' ' + lastName}</Text>
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
						title={`Round up to B$ ${Math.ceil(amountCalcedFee).toFixed(2)}`}
						onPress={() => props.onConfirm(true)}
					/>
					<Text style={styles.description}>{Translation.PAYMENT.NOT_REFUNABLE_DONATION}</Text>
				</View>
			</View>
		</Dialog>
	)
}

const MerchantQRCodeScan = (): JSX.Element => {
	const navigation = useNavigation();
	const { businessDwollaId } = useContext(AuthContext);
	const dispatch = useDispatch();
	const hasPermission = useCameraPermission();
	const [isScanned, setIsScanned] = useState<boolean>(false);
	const [isPaymentDialog, setIsPaymentDialog] = useState<boolean>(false);
	const [isOpenPayment, setIsOpenPayment] = useState<boolean>(false);
	const [openAmount, setOpenAmount] = useState<string>("");
	const [state, setState] = useState<QRCodeEntry>({
		securityId: SECURITY_ID,
		to: "",
		amount: 0,
		mode: PaymentMode.SELECT_AMOUNT
	});
	const [goNext, setGoNext] = useState<boolean>(false);

	const { businessWallet } = useSelector((state: AppState) => state.walletReducer) as WalletState;

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
			showToast(ToastType.ERROR, "Whooops, something went wrong.", "Invalide QRCode");
		}
	};

	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	const onPayConfirm = async (isRoundUp: boolean) => {
		setIsPaymentDialog(false);
		setIsScanned(false);
		const amountCalcedFee = state.amount + calcFee(state.amount);

		if (businessWallet.availableBalance <= state.amount) {
			showToast(ToastType.ERROR, "Whoooops. You cannot the payment.", "You have too little funds available. Please load up your balance first.");
			return;
		}

		if (businessDwollaId) {
			const request: ITransactionRequest = {
				toUserId: state.to,
				amount: isRoundUp ? Math.ceil(amountCalcedFee).toString() : amountCalcedFee.toString(),
				comment: ''
			};

			dispatch(updateLoadingStatus({
				isLoading: true,
				screen: LoadingScreenTypes.PAYMENT_PENDING
			}));
			const response = await UserAPI.transferTo(businessDwollaId, request);
			if (response.data) {
				await dispatch(loadBusinessWallet(businessDwollaId));
				await dispatch(loadBusinessTransactions(businessDwollaId));
				navigation.navigate(Routes.MERCHANT_PAYMENT_SUCCESS);
			} else {
				showToast(ToastType.ERROR, "Failed", "Whooops, something went wrong.");
				navigation.navigate(Routes.MERCHANT_DASHBOARD);
			}
			dispatch(updateLoadingStatus({
				isLoading: false,
				screen: LoadingScreenTypes.PAYMENT_PENDING
			}));
		} else {
			showToast(ToastType.ERROR, "Failed", "Whooops, something went wrong.");
		}
	};

	const handleOpenPay = async () => {
		setIsOpenPayment(false);
		// check balance
		if (businessWallet.availableBalance <= state.amount) {
			showToast(ToastType.ERROR, "Whoooops. You cannot the payment.", "You have too little funds available. Please load up your balance first.");
			return;
		}

		if (businessDwollaId) {
			const request: ITransactionRequest = {
				toUserId: state.to,
				amount: openAmount,
				comment: ''
			};

			dispatch(updateLoadingStatus({
				isLoading: true,
				screen: LoadingScreenTypes.PAYMENT_PENDING
			}));
			const response = await UserAPI.transferTo(businessDwollaId, request);
			if (response.data) {
				await dispatch(loadBusinessWallet(businessDwollaId));
				await dispatch(loadBusinessTransactions(businessDwollaId));
				navigation.navigate(Routes.MERCHANT_PAYMENT_SUCCESS);
			} else {
				showToast(ToastType.ERROR, "Whooops, something went wrong.", "Connection failed");
			}
			dispatch(updateLoadingStatus({
				isLoading: false,
				screen: LoadingScreenTypes.PAYMENT_PENDING
			}));
		} else {
			showToast(ToastType.ERROR, "Whooops, something went wrong.", "Connection failed");
		}
	}

	const onClose = () => {
		setIsPaymentDialog(false);
		setIsOpenPayment(true);
		setIsScanned(false);
		navigation.navigate(Routes.MERCHANT_DASHBOARD);
	};

	return (
		<View style={viewBase}>
			<View style={styles.container}>
				<BarCodeScanner
					onBarCodeScanned={isScanned ? undefined : handleBarCodeScanned}
					style={StyleSheet.absoluteFillObject}
				/>
			</View>
			<View style={styles.toggleView}>
				<Header
					rightComponent={<CancelBtn text={Translation.BUTTON.CLOSE} color={colors.white} onClick={() => navigation.navigate(Routes.MERCHANT_DASHBOARD)} />}
				/>
				<View style={styles.switchView}>
					<ToggleButton
						value={true}
						onChange={()=>navigation.navigate(Routes.MERCHANT_REQUEST)}
						activeText="Pay"
						inActiveText="Receive"
						style={styles.switch}
						textStyle={styles.switchText}
						circleStyle={styles.toggleBg}
					/>
				</View>
			</View>
			{ isPaymentDialog && <PaymentConfirm visible={isPaymentDialog} payInfo={state} onConfirm={onPayConfirm} onCancel={onClose} /> }
			{ isOpenPayment && (
				<Modal visible={isOpenPayment}>
					<View style={ modalViewBase }>
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
									keyboardType="number-pad"
									placeholder="Amount"
									prefix="B$"
									style={styles.input}
									textStyle={styles.switchText}
									value={openAmount}
									onChange={(name: string, amount: string) => setOpenAmount(amount)}
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

export default MerchantQRCodeScan