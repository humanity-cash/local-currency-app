import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, CancelBtn } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { viewBase } from "src/theme/elements";
import { BarCodeScanner } from 'expo-barcode-scanner';

type MerchantReturnQRCodeScanProps = {
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
	}
});

const MerchantReturnQRCodeScan = (props: MerchantReturnQRCodeScanProps) => {
	const [isPermissionSelected, setIsPermissionSelected] = useState<boolean>(false);
	const [hasPermission, setHasPermission] = useState<boolean>(false);
	const [isScanned, setIsScanned] = useState<boolean>(false);

	useEffect(() => {
		(async () => {
			const {status} = await BarCodeScanner.requestPermissionsAsync();
			setIsPermissionSelected(true);
			setHasPermission(status === 'granted');
		})();
	}, []);
	
	const handleBarCodeScanned = (data: HandleScaned) => {
		setIsScanned(true);
		props.navigation.navigate('MerchantReturn')
	}

	if (isPermissionSelected === false) {
		return <Text>Requesting for camera permission</Text>;
	}

	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
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
					rightComponent={<CancelBtn text="Close" color={colors.white} onClick={() => props.navigation.navigate('MerchantDashboard')} />}
				/>
			</View>
		</View>
	);
}

export default MerchantReturnQRCodeScan