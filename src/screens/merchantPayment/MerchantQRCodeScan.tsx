import React, { ReactElement, useEffect, useState } from 'react';
import { StyleSheet, View, Switch } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, CancelBtn, Dialog, Button } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, wrappingContainerBase, viewBase, dialogViewBase } from "src/theme/elements";
import { BarCodeScanner } from 'expo-barcode-scanner';
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

type MerchantQRCodeScanProps = {
	navigation?: any,
	route?: any,
}

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
	dialogFooter: {
		// padding: 20,
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
	separator: {
		borderTopWidth: 1, 
		borderTopColor: colors.darkGreen, 
		marginBottom: 10, 
		marginTop: 10
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
	}
});

type PaymentConfirmProps = {
	visible: boolean,
	onConfirm: ()=>void,
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
						<Text style={styles.detailText}>choose to round up and directly donate to the Community Chest Fund which provides scholarships & grants to people in the area.</Text>
					</View>
				</View>
				<View style={styles.dialogFooter}>
					<Button
						type="transparent"
						title="Pay B$14.34"
						style={styles.roundBtn}
						onPress={() => props.onConfirm()}
					/>
					<Button
						type="purple"
						title="Round up to B$ 15.00"
						onPress={() => props.onConfirm()}
					/>
					<Text style={styles.description}>*THE ROUND UP IS A NON REFUNABLE DONATION.</Text>
				</View>
			</View>
		</Dialog>
	)
}

const MerchantQRCodeScan = (props: MerchantQRCodeScanProps): ReactElement => {
	const [isPermissionSelected, setIsPermissionSelected] = useState<boolean>(false);
	const [hasPermission, setHasPermission] = useState<boolean>(false);
	const [isScanned, setIsScanned] = useState<boolean>(false);
	const [isEnabled, setIsEnabled] = useState<boolean>(false);
	const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState<boolean>(false);

  	const toggleSwitch = () => {
		setIsEnabled(previousState => !previousState);
		if (!isEnabled) {
			setIsEnabled(previousState => !previousState);
			props.navigation.navigate("MerchantRequest");
		}
	}

	useEffect(() => {
		setTimeout(() => {
			setIsPaymentDialogOpen(true);
		}, 2000);
	}, []);

	useEffect(() => {
		(async () => {
			const {status} = await BarCodeScanner.requestPermissionsAsync();
			setIsPermissionSelected(true);
			setHasPermission(status === 'granted');
		})();
	}, []);
	
	const handleBarCodeScanned = (data: HandleScaned) => {
		console.log(data);
		setIsScanned(true);
		setIsPaymentDialogOpen(true);
	}

	if (isPermissionSelected === false) {
		return <Text>Requesting for camera permission</Text>;
	}

	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	const onPayConfirm = () => {
		setIsPaymentDialogOpen(false);
		props.navigation.navigate(Routes.MERCHANT_PAYMENT_PENDING);
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
					rightComponent={<CancelBtn text={Translation.BUTTON.CLOSE} color={colors.white} onClick={() => props.navigation.navigate(Routes.MERCHANT_DASHBOARD)} />}
				/>
				<View style={styles.switchView}>
					<Switch
						ios_backgroundColor="#3e3e3e"
						onValueChange={toggleSwitch}
						value={isEnabled}
					/>
				</View>
			</View>
			{ isPaymentDialogOpen && <PaymentConfirm visible={isPaymentDialogOpen} amount={14.34} onConfirm={onPayConfirm} /> }
		</View>
	);
}

export default MerchantQRCodeScan