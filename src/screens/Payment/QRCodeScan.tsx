import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Switch, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import { useDialogStatus } from "src/hooks";
import { Header, CancelBtn, Dialog, Button } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, wrappingContainerBase, viewBase, dialogViewBase } from "src/theme/elements";
import { BarCodeScanner } from 'expo-barcode-scanner';

type QRCodeScanProps = {
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
		padding: 20,
	},
	headerText: {
		fontSize: 25,
		color: colors.darkRed,
	},
	view: {
		padding: 10,
	},
	detailView: {
		flexDirection: 'row', 
		justifyContent: 'space-between'
	},
	detailText: {
		fontSize: 14,
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
	}
});

type PaymentConfirmProps = {
	onConfirm: ()=>void,
	amount: number,
}

function PaymentConfirm(props: PaymentConfirmProps) {

	return (
		<Dialog>
			<View style={dialogViewBase}>
				<ScrollView style={wrappingContainerBase}>
					<View style={ baseHeader }>
						<Text h1 style={styles.headerText}> B$ { props.amount } </Text>
					</View>
					<View style={styles.view}>
						<View style={styles.detailView}>
							<Text style={styles.detailText}>TRANSACTION ID</Text>
							<Text style={{...styles.detailText, fontWeight: 'bold'}}>05636826HDI934</Text>
						</View>
						<View style={styles.detailView}>
							<Text style={styles.detailText}>TYPE</Text>
							<Text style={{...styles.detailText, fontWeight: 'bold'}}>PURCHASE</Text>
						</View>
						<View style={styles.detailView}>
							<Text style={styles.detailText}>DATE</Text>
							<Text style={{...styles.detailText, fontWeight: 'bold'}}>4:22, JUN 17, 2021</Text>
						</View>
					</View>
				</ScrollView>
				<View style={styles.dialogFooter}>
					<Button
						type="darkGreen"
						title="Confirm"
						onPress={() => props.onConfirm()}
					/>
				</View>
			</View>
		</Dialog>
	)
}

type FeeConfirmProps = {
	onConfirm: () => void,
	onCancel: () => void,
	amount: number,
}

function FeeConfirm(props: FeeConfirmProps) {

	return (
		<Dialog>
			<View style={dialogViewBase }>
				<ScrollView style={wrappingContainerBase}>
					<View style={ baseHeader }>
						<Text h1> B$ { props.amount } </Text>
					</View>
					<View style={styles.view}>
						<View style={styles.detailView}>
							<Text style={styles.detailText}>COMMUNITY CHEST</Text>
							<Text style={{...styles.detailText, fontWeight: 'bold'}}>B$ 0.66</Text>
						</View>
						<View style={styles.detailView}>
							<Text style={styles.detailText}>DORY & GINGER</Text>
							<Text style={{...styles.detailText, fontWeight: 'bold'}}>B$ 14.34</Text>
						</View>
						<View style={styles.separator}></View>
						<View style={styles.detailView}>
							<Text style={styles.detailText}>TOTAL</Text>
							<Text style={{...styles.detailText, fontWeight: 'bold'}}>B$ 15.00</Text>
						</View>
					</View>
				</ScrollView>

				<View style={{...styles.dialogFooter, flexDirection: 'row'}}>
					<Button
						type="darkGreen"
						style={{backgroundColor: colors.white, borderWidth: 1, flex: 1, marginRight: 10}}
						title="No, thanks"
						textStyle={{color: colors.darkGreen}}
						onPress={() => props.onCancel()}
					/>
					<Button
						type="darkGreen"
						title="Confirm"
						style={{flex: 1}}
						onPress={() => props.onConfirm()}
					/>
				</View>
			</View>
		</Dialog>
	)
}

const QRCodeScan = (props: QRCodeScanProps) => {
	const [hasPermission, setHasPermission] = useState(null || false);
	const [scanned, setScanned] = useState(false);
	const [isEnabled, setIsEnabled] = useState(false);
	const [paymentDialog, setPaymentDialog] = useState(false);
	const [feeDialog, setFeeDialog] = useState(false);
	const { setDialogStatus } = useDialogStatus();

  	const toggleSwitch = () => {
		setIsEnabled(previousState => !previousState);
		if (!isEnabled) {
			props.navigation.navigate("PaymentRequest");
		}
	}

	useEffect(() => {
		(async () => {
			const {status} = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();

		setTimeout(() => {
			setPaymentDialog(true);
			setDialogStatus(true);
		}, 2000);
	}, []);
	
	const handleBarCodeScanned = (data: HandleScaned) => {
		setScanned(true);
	}

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}

	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	const onPayConfirm = () => {
		setPaymentDialog(false);
		setFeeDialog(true);
	}

	const onFeeConfirm = () => {
		setFeeDialog(false);
		setDialogStatus(false);
		props.navigation.navigate("PaymentPending");
	}

	const onCancle = () => {
		setFeeDialog(false);
		setDialogStatus(false);
		props.navigation.navigate("Dashboard");
	}

	return (
		<View style={viewBase}>
			<View style={styles.container}>
				<BarCodeScanner
					onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
					style={StyleSheet.absoluteFillObject}
				/>
			</View>
			<View style={styles.toggleView}>
				<Header
					rightComponent={<CancelBtn text="Close" color={colors.white} onClick={() => props.navigation.navigate('Dashboard')} />}
				/>
				<View style={styles.switchView}>
					<Switch
						ios_backgroundColor="#3e3e3e"
						onValueChange={toggleSwitch}
						value={isEnabled}
					/>
				</View>
			</View>
			<View style={styles.bottomView}></View>
			{ paymentDialog && <PaymentConfirm amount={14.34} onConfirm={onPayConfirm} /> }
			{ feeDialog && <FeeConfirm amount={0.66} onConfirm={onFeeConfirm} onCancel={onCancle} /> }
		</View>
	);
}

export default QRCodeScan