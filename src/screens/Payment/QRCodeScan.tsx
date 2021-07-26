import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Button, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, CancelBtn } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import { BarCodeScanner } from 'expo-barcode-scanner';

type QRCodeScanProps = {
	navigation?: any,
	route?: any,
	// onClose: () => void
}

type HandleScaned = {
	type: string,
	data: string,
}

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40
	},
	bottomView: {
		padding: 20,
	},
});

const QRCodeScan = (props: QRCodeScanProps) => {
	const [hasPermission, setHasPermission] = useState(null || false);
	const [scanned, setScanned] = useState(false);

	const askForCameraPermission = () => {
		(async () => {
			const {status} = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status == 'granted');
		})
	}

	useEffect(() => {
		props.navigation.navigate("PaymentPending");
		// askForCameraPermission();
	});
	
	const handleBarCodeScanned = (data: HandleScaned) => {
		setScanned(true);
	}

	return (
		<View style={viewBase}>
			<Header
				rightComponent={<CancelBtn text="Close" onClick={() => props.navigation.navigate('Dashboard')} />}
			/>
			<View>
				{ hasPermission === null && (
					<Text>Requesting for camera permission</Text>
				)}
				{ !hasPermission && (
					<Text>Requesting for camera permission</Text>
				)}
				{ hasPermission && (
					<BarCodeScanner
						onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
						style={StyleSheet.absoluteFillObject}
					/>
				)}
				{scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
			</View>
		</View>
	);
}

export default QRCodeScan