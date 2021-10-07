import React, { useState, useContext } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Text } from 'react-native-elements';
import { useCameraPermission } from 'src/hooks';
import { AuthContext } from 'src/auth';
import { Header, CancelBtn, Dialog, Button, ToggleButton } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { viewBase, dialogViewBase } from "src/theme/elements";
import { BarCodeScanner } from 'expo-barcode-scanner';
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { BUTTON_TYPES } from 'src/constants';
import { QRCodeEntry, PaymentMode, ToastType } from 'src/utils/types';
import { UserAPI } from 'src/api';
import { ITransactionRequest } from 'src/api/types';
import { calcFee, showToast } from 'src/utils/common';

type HandleScaned = {
	type: string,
	data: string,
}

const FEE = 0.15;

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
        alignSelf: 'center',
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
	}
});

type PaymentConfirmProps = {
	visible: boolean,
	onConfirm: () => void,
	onCancel: () => void,
	payInfo: QRCodeEntry,
}

const PaymentConfirm = (props: PaymentConfirmProps) => {
	const { userAttributes } = useContext(AuthContext);

	const firstName = userAttributes?.["custom:owner.firstName"];
    const lastName = userAttributes?.["custom:owner.lastName"];
	const amountCalcedFee = props.payInfo.amount - props.payInfo.amount * FEE;

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
						onPress={() => props.onConfirm()}
					/>
					<Button
						type={BUTTON_TYPES.PURPLE}
						title={`Round up to B$ ${props.payInfo.amount.toFixed(2)}`}
						onPress={() => props.onConfirm()}
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
	const hasPermission = useCameraPermission();
	const [isScanned, setIsScanned] = useState<boolean>(false);
	const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState<boolean>(false);
	const [state, setState] = useState<QRCodeEntry>({
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
			console.log("Something went wrong");
		}
	};

	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	const onPayConfirm = async () => {
		setIsPaymentDialogOpen(false);
		setIsScanned(false);
		const amountCalcedFee = state.amount - calcFee(state.amount);

		if (businessDwollaId) {
			const request: ITransactionRequest = {
				toUserId: businessDwollaId,
				amount: amountCalcedFee.toString(),
				comment: ''
			};
			const response = await UserAPI.transferTo(businessDwollaId, request);
			if (response.data) {
				navigation.navigate(Routes.MERCHANT_PAYMENT_SUCCESS);
			} else {
				showToast(ToastType.ERROR, "Failed", "Whooops, something went wrong.");
				navigation.navigate(Routes.MERCHANT_DASHBOARD);
			}
		}
	};

	const onClose = () => {
		setIsPaymentDialogOpen(false);
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
			{ isPaymentDialogOpen && <PaymentConfirm visible={isPaymentDialogOpen} payInfo={state} onConfirm={onPayConfirm} onCancel={onClose} /> }
		</View>
	);
}

export default MerchantQRCodeScan