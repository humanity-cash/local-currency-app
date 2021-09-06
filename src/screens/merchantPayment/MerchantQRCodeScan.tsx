import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Text } from 'react-native-elements';
import { useCameraPermission } from 'src/hooks';
import { Header, CancelBtn, Dialog, Button, ToggleButton } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, wrappingContainerBase, viewBase, dialogViewBase } from "src/theme/elements";
import { BarCodeScanner } from 'expo-barcode-scanner';
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { BUTTON_TYPES } from 'src/constants';

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
	bottomView: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		width: '100%',
		height: 200,
		backgroundColor: 'rgba(0,0,0,0.8)'
	},
	headerText: {
		fontSize: 25,
		color: colors.purple,
		textAlign: 'center'
	},
	dialog: {
		height: 450
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
	amount: number,
}

const PaymentConfirm = (props: PaymentConfirmProps) => {

	return (
		<Dialog visible={props.visible} onClose={()=>props.onConfirm()} style={styles.dialog}>
			<View style={dialogViewBase}>
				<View style={wrappingContainerBase}>
					<View style={ baseHeader }>
						<Text h1 style={styles.headerText}> B$ { props.amount } </Text>
					</View>
					<View>
						<Text style={styles.detailText}>or</Text>
						<Text style={styles.detailText}>{Translation.PAYMENT.CHOOSE_ROUND_UP}</Text>
					</View>
				</View>
				<View>
					<Button
						type={BUTTON_TYPES.TRANSPARENT}
						title="Pay B$14.34"
						style={styles.roundBtn}
						onPress={() => props.onConfirm()}
					/>
					<Button
						type={BUTTON_TYPES.PURPLE}
						title="Round up to B$ 15.00"
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
	const hasPermission = useCameraPermission();
	const [isScanned, setIsScanned] = useState<boolean>(false);
	const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState<boolean>(false);

	useEffect(() => {
		setTimeout(() => {
			setIsPaymentDialogOpen(true);
		}, 2000);
	}, []);
	
	const handleBarCodeScanned = (data: HandleScaned) => {
		console.log(data);
		setIsScanned(true);
		setIsPaymentDialogOpen(true);
	}

	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	const onPayConfirm = () => {
		setIsPaymentDialogOpen(false);
		navigation.navigate(Routes.MERCHANT_PAYMENT_PENDING);
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
			{ isPaymentDialogOpen && <PaymentConfirm visible={isPaymentDialogOpen} amount={14.34} onConfirm={onPayConfirm} /> }
		</View>
	);
}

export default MerchantQRCodeScan