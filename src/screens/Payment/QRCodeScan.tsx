import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Switch, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, CancelBtn, Dialog, Button } from "src/shared/uielements";
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
	infoText: {
		fontWeight: 'bold',
		fontSize: 14
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
	visible: boolean,
	onConfirm: ()=>void,
	amount: number,
}

const PaymentConfirm = (props: PaymentConfirmProps) => {

	return (
		<Dialog visible={props.visible} onClose={()=>props.onConfirm()}>
			<View style={dialogViewBase}>
				<View style={wrappingContainerBase}>
					<View style={ baseHeader }>
						<Text h1 style={styles.headerText}> B$ { props.amount } </Text>
					</View>
					<View style={styles.view}>
						<View style={styles.detailView}>
							<Text style={styles.detailText}>{Translation.LABEL.TRANSACTION_ID}</Text>
							<Text style={styles.infoText}>05636826HDI934</Text>
						</View>
						<View style={styles.detailView}>
							<Text style={styles.detailText}>{Translation.COMMON.TYPE}</Text>
							<Text style={styles.infoText}>PURCHASE</Text>
						</View>
						<View style={styles.detailView}>
							<Text style={styles.detailText}>{Translation.COMMON.DATE}</Text>
							<Text style={styles.infoText}>4:22, JUN 17, 2021</Text>
						</View>
					</View>
				</View>
				<View style={styles.dialogFooter}>
					<Button
						type={BUTTON_TYPES.DARK_GREEN}
						title={Translation.BUTTON.CONFIRM}
						onPress={() => props.onConfirm()}
					/>
				</View>
			</View>
		</Dialog>
	)
}

type FeeConfirmProps = {
	visible: boolean,
	onConfirm: () => void,
	onCancel: () => void,
	amount: number,
}

const FeeConfirm = (props: FeeConfirmProps) => {

	return (
		<Dialog visible={props.visible} onClose={() => props.onCancel()}>
			<View style={dialogViewBase }>
				<ScrollView style={wrappingContainerBase}>
					<View style={ baseHeader }>
						<Text h1> B$ { props.amount } </Text>
					</View>
					<View style={styles.view}>
						<View style={styles.detailView}>
							<Text style={styles.detailText}>COMMUNITY CHEST</Text>
							<Text style={styles.infoText}>B$ 0.66</Text>
						</View>
						<View style={styles.detailView}>
							<Text style={styles.detailText}>DORY & GINGER</Text>
							<Text style={styles.infoText}>B$ 14.34</Text>
						</View>
						<View style={styles.separator}></View>
						<View style={styles.detailView}>
							<Text style={styles.detailText}>TOTAL</Text>
							<Text style={styles.infoText}>B$ 15.00</Text>
						</View>
					</View>
				</ScrollView>

				<View style={{...styles.dialogFooter, flexDirection: 'row'}}>
					<Button
						type={BUTTON_TYPES.DARK_GREEN}
						style={{backgroundColor: colors.white, borderWidth: 1, flex: 1, marginRight: 10}}
						title="No, thanks"
						onPress={() => props.onCancel()}
					/>
					<Button
						type={BUTTON_TYPES.DARK_GREEN}
						title={Translation.BUTTON.CONFIRM}
						onPress={() => props.onConfirm()}
					/>
				</View>
			</View>
		</Dialog>
	)
}

const QRCodeScan = (): JSX.Element => {
	const navigation = useNavigation();
	const [hasPermission, setHasPermission] = useState<boolean>(null || false);
	const [isScanned, setIsScanned] = useState<boolean>(false);
	const [isEnabled, setIsEnabled] = useState<boolean>(false);
	const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState<boolean>(false);
	const [isFeeDialogOpen, setIsFeeDialogOpen] = useState<boolean>(false);

  	const toggleSwitch = () => {
		setIsEnabled(previousState => !previousState);
		if (!isEnabled) {
			setIsEnabled(previousState => !previousState);
			navigation.navigate(Routes.PAYMENT_REQUEST);
		}
	}

	useEffect(() => {
		(async () => {
			const {status} = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);
	
	const handleBarCodeScanned = (data: HandleScaned) => {
		console.log(data);
		setIsScanned(true);
		setIsPaymentDialogOpen(true);
	}

	if (hasPermission === null) {
		return <Text>{Translation.OTHER.REQUEST_CAMERA_PERMISSION}</Text>;
	}

	if (hasPermission === false) {
		return <Text>{Translation.OTHER.NO_CAMERA_PERMISSION}</Text>;
	}

	const onPayConfirm = () => {
		setIsPaymentDialogOpen(false);
		setIsFeeDialogOpen(true);
	}

	const onFeeConfirm = () => {
		setIsFeeDialogOpen(false);
		navigation.navigate(Routes.PAYMENT_PENDING);
	}

	const onCancle = () => {
		setIsFeeDialogOpen(false);
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
					rightComponent={<CancelBtn text={Translation.BUTTON.CLOSE} color={colors.white} onClick={() => navigation.goBack()} />}
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
			{ isFeeDialogOpen && <FeeConfirm visible={isFeeDialogOpen} amount={0.66} onConfirm={onFeeConfirm} onCancel={onCancle} /> }
		</View>
	);
}

export default QRCodeScan