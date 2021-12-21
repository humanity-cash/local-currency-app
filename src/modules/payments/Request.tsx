import { IWallet } from '@humanity.cash/types';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import { DwollaAPI } from 'src/api';
import { useBrightness } from "src/hooks";
import { Dialog } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { dialogViewBase } from "src/theme/elements";
import { PaymentMode, SECURITY_ID } from "src/utils/types";

const styles = StyleSheet.create({
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

type RequestPaymentInput = {
	visible: boolean
	onClose: () => void
	onSuccess: (amount: number) => void
	isOpenAmount: boolean
	amount?: number
	ownerName: string
	recieverId: string
	walletData: { availableBalance: number }
	updateWalletData:(i: IWallet) => void
}

const RequestPayment = (props: RequestPaymentInput): JSX.Element => {
	const { recieverId, walletData, updateWalletData } = props;
	const { hasPermission, setMaxBrightness, setDefaultBrightness } = useBrightness();
	const [initBalance] = useState<number>(walletData.availableBalance);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	const addressStr = JSON.stringify({
		securityId: SECURITY_ID,
		to: recieverId,
		amount: props.amount,
		mode: props.isOpenAmount ? PaymentMode.OPEN_AMOUNT : PaymentMode.SELECT_AMOUNT
	});

	useEffect(() => {
		const timerId = setInterval(async () => {
			if (recieverId) {
				const userWallet: IWallet = await DwollaAPI.loadWallet(recieverId)
				updateWalletData(userWallet);
			}
		}, 1000);

		return () => clearInterval(timerId);
	}, [props.visible]);

	useEffect(() => {
		if (hasPermission) {
			setMaxBrightness();
		}
	}, [hasPermission]);

	useEffect(() => {
		if (walletData?.availableBalance) {
			if (walletData?.availableBalance > initBalance) {
				onSuccess()
			}
		}
	}, [walletData?.availableBalance])

	const onClose = () => {
		setDefaultBrightness();
		props.onClose();
	}

	const onSuccess = async () => {
		if (!isSuccess) {
			setIsSuccess(true);
			setDefaultBrightness();
			props.onSuccess(walletData.availableBalance - initBalance);
		}
	}

	return (
		<Dialog visible={props.visible} onClose={onClose} backgroundStyle={styles.dialogBg} style={styles.dialog}>
			<View style={dialogViewBase}>
				<View style={styles.dialogWrap}>
					<View style={styles.ownerInfo}>
						<Image
							source={require("../../../assets/images/feed1.png")}
							style={styles.image}
						/>
						<Text style={styles.ownerName}>{props.ownerName}</Text>
					</View>
					<QRCode
						value={addressStr}
						size={200}
					/>
					{!props.isOpenAmount && <Text style={styles.amount}>B$ {props.amount?.toFixed(2)}</Text>}
				</View>
			</View>
		</Dialog>
	)
}

export default RequestPayment;