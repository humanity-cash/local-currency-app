import { useNavigation } from '@react-navigation/native';
import React, { useState, useContext } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from 'react-native-elements';
import { useCameraPermission, usePersonalWallet } from 'src/hooks';
import { AuthContext } from 'src/auth';
import { Header, CancelBtn, Dialog, Button, ToggleButton } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, viewBase, dialogViewBase } from "src/theme/elements";
import { BarCodeScanner } from 'expo-barcode-scanner';
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { BUTTON_TYPES } from 'src/constants';
import { QRCodeEntry, SECURITY_ID, PaymentMode, ToastType } from 'src/utils/types';
import { UserAPI } from 'src/api';
import { ITransactionRequest } from 'src/api/types';
import { calcFee, showToast } from 'src/utils/common';

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
        alignSelf: 'center',
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 32,
        lineHeight: 32,
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
	}
});

type PaymentConfirmProps = {
	visible: boolean,
	onConfirm: (mode: boolean) => void,
	onCancel: () => void,
	payInfo: QRCodeEntry
}

const PaymentConfirm = (props: PaymentConfirmProps) => {
	const { userAttributes } = useContext(AuthContext);

	const firstName = userAttributes?.["custom:personal.firstName"];
    const lastName = userAttributes?.["custom:personal.lastName"];
	const amountCalcedFee = props.payInfo.amount - calcFee(props.payInfo.amount);

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
						onPress={() => props.onConfirm(true)}
					/>
					<Button
						type={BUTTON_TYPES.DARK_GREEN}
						title={`Round up to B$ ${props.payInfo.amount.toFixed(2)}`}
						onPress={() => props.onConfirm(false)}
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
	const { customerDwollaId } = useContext(AuthContext);
	const hasPermission = useCameraPermission();
	const { wallet } = usePersonalWallet();
	const [isScanned, setIsScanned] = useState<boolean>(false);
	const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState<boolean>(false);
	const [isLowAmountDialogOpen, setIsLowAmountDialogOpen] = useState<boolean>(false);
	const [state, setState] = useState<QRCodeEntry>({
		securityId: SECURITY_ID,
		to: "",
		amount: 0,
		mode: PaymentMode.SELECT_AMOUNT
	});

	const handleBarCodeScanned = (data: HandleScaned) => {
		try {
			setState(JSON.parse(data.data) as QRCodeEntry);
			setIsScanned(true);
			setIsPaymentDialogOpen(true);
		} catch (e) {
			showToast(ToastType.ERROR, "Failed", "Whooops, something went wrong.");
		}
	}

	if (hasPermission === false) {
		return <Text>{Translation.OTHER.NO_CAMERA_PERMISSION}</Text>;
	}

	const onPayConfirm = async (mode: boolean) => {
		setIsPaymentDialogOpen(false);

		const amountCalcedFee = state.amount - calcFee(state.amount);
		
		// check balance
		if (wallet.availableBalance <= state.amount) {
			setIsLowAmountDialogOpen(true);
		} else {
			if (customerDwollaId) {
				const request: ITransactionRequest = {
					toUserId: state.to,
					amount: mode ? amountCalcedFee.toString() : state.amount.toString(),
					comment: ''
				};
				const response = await UserAPI.transferTo(customerDwollaId, request);
				if (response.data) {
					navigation.navigate(Routes.PAYMENT_SUCCESS);
				} else {
					navigation.navigate(Routes.PAYMENT_FAILED);
				}
			} else {
				showToast(ToastType.ERROR, "Failed", "Whooops, something went wrong.");
			}
		}
	}

	const onLoadUp = () => {
		setIsLowAmountDialogOpen(false);
		setIsScanned(false);
		navigation.navigate(Routes.LOAD_UP);
	}

	const onCancle = () => {
		setIsPaymentDialogOpen(false);
		setIsLowAmountDialogOpen(false);
		setIsScanned(false);
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
			{ isPaymentDialogOpen && <PaymentConfirm visible={isPaymentDialogOpen} payInfo={state} onConfirm={(mode) => onPayConfirm(mode)} onCancel={onCancle} /> }
			{ isLowAmountDialogOpen && <LowAmount visible={isLowAmountDialogOpen} onConfirm={onLoadUp} onCancel={onCancle} /> }
		</View>
	);
}

export default QRCodeScan