import { useNavigation } from '@react-navigation/native';
import React, { useState, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from 'react-native-elements';
import { useCameraPermission } from 'src/hooks';
import { AuthContext } from 'src/auth';
import { Header, CancelBtn, Dialog, Button, ToggleButton } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, viewBase, dialogViewBase } from "src/theme/elements";
import { BarCodeScanner } from 'expo-barcode-scanner';
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { BUTTON_TYPES } from 'src/constants';
import { QRCodeEntry, SECURITY_ID, PaymentMode, ToastType, LoadingScreenTypes } from 'src/utils/types';
import { UserAPI } from 'src/api';
import { ITransactionRequest } from 'src/api/types';
import { calcFee, showToast } from 'src/utils/common';
import { isQRCodeValid } from 'src/utils/validation';

import { loadPersonalWallet } from 'src/store/wallet/wallet.actions';
import { loadPersonalTransactions } from 'src/store/transaction/transaction.actions';
import { updateLoadingStatus } from 'src/store/loading/loading.actions';
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
	bottomView: {
		padding: 20,
		paddingBottom: 45
	},
	loading: {
		position: 'absolute', 
		top: 0, 
		left: 0, 
		right: 0, 
		bottom: 0, 
		alignItems: 'center', 
		justifyContent: 'center', 
		backgroundColor: 'rgba(0, 0, 0, 0.4)'
	}

});

type PaymentConfirmProps = {
	visible: boolean,
	onConfirm: (isRoundUp: boolean) => void,
	onCancel: () => void,
	payInfo: QRCodeEntry
}

const PaymentConfirm = (props: PaymentConfirmProps) => {
	const { userAttributes } = useContext(AuthContext);

	const firstName = userAttributes?.["custom:personal.firstName"];
    const lastName = userAttributes?.["custom:personal.lastName"];
	// const amountCalcedFee = props.payInfo.amount + calcFee(props.payInfo.amount);
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
	const { customerDwollaId } = useContext(AuthContext);
	const hasPermission = useCameraPermission();
	const [isScanned, setIsScanned] = useState<boolean>(false);
	const [isPaymentDialog, setIsPaymentDialog] = useState<boolean>(false);
	const [isLowAmountDialog, setIsLowAmountDialog] = useState<boolean>(false);
	const [state, setState] = useState<QRCodeEntry>({
		securityId: SECURITY_ID,
		to: "",
		amount: 0,
		mode: PaymentMode.SELECT_AMOUNT
	});

	const { personalWallet } = useSelector((state: AppState) => state.walletReducer) as WalletState;

	useEffect(() => {
		setIsScanned(false);
	});

	const handleBarCodeScanned = (data: HandleScaned) => {
		if (isQRCodeValid(data.data)) {
			const qrcodeData = JSON.parse(data.data) as QRCodeEntry;
			setState(qrcodeData);
			setIsScanned(true);
			if (qrcodeData.mode == PaymentMode.OPEN_AMOUNT) {
				navigation.navigate(Routes.PAYMENT_RECEIVE_AMOUNT, qrcodeData)
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
		const amountCalcedFee = state.amount;	// + calcFee(state.amount);
		setIsPaymentDialog(false);
		
		// check balance
		if (personalWallet.availableBalance <= state.amount) {
			setIsLowAmountDialog(true);
		} else {
			if (customerDwollaId) {
				const request: ITransactionRequest = {
					toUserId: state.to,
					amount: isRoundUp ? Math.ceil(amountCalcedFee).toString() : amountCalcedFee.toString(),
					comment: ''
				};

				dispatch(updateLoadingStatus({
					isLoading: true,
					screen: LoadingScreenTypes.PAYMENT_PENDING
				}));
				const response = await UserAPI.transferTo(customerDwollaId, request);
				
				if (response.data) {
					// Update user info
					await dispatch(loadPersonalWallet(customerDwollaId));
					await dispatch(loadPersonalTransactions(customerDwollaId));
					navigation.goBack()
					navigation.navigate(Routes.PAYMENT_SUCCESS);
				} else {
					navigation.navigate(Routes.PAYMENT_FAILED);
				}
				dispatch(updateLoadingStatus({
					isLoading: false,
					screen: LoadingScreenTypes.PAYMENT_PENDING
				}));
			} else {
				showToast(ToastType.ERROR, "Failed", "Whooops, something went wrong.");
			}
		}
	}

	const onLoadUp = () => {
		setIsLowAmountDialog(false);
		navigation.navigate(Routes.LOAD_UP);
	}

	const onCancle = () => {
		setIsPaymentDialog(false);
		setIsLowAmountDialog(false);
		navigation.navigate(Routes.DASHBOARD);
	}

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
		</View>
	);
}

export default QRCodeScan