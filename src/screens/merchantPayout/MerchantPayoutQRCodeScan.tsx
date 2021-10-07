import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Text } from 'react-native-elements';
import { useCameraPermission } from 'src/hooks';
import { Header, CancelBtn } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { viewBase } from "src/theme/elements";
import { BarCodeScanner } from 'expo-barcode-scanner';
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

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
	switchView: {
		flex: 1, 
		justifyContent: 'center', 
		alignItems: 'center'
	}
});

const MerchantPayoutQRCodeScan = (): JSX.Element => {
	const navigation = useNavigation();
	const hasPermission = useCameraPermission();
	const [isScanned, setIsScanned] = useState<boolean>(false);

	useEffect(() => {
		setTimeout(() => {
			navigation.navigate(Routes.MERCHANT_PAYOUT_PENDING);
		}, 2000);
	}, []);

	const handleBarCodeScanned = (data: HandleScaned) => {
		setIsScanned(true);
		navigation.navigate(Routes.MERCHANT_PAYOUT_PENDING);
	}

	if (hasPermission === false) {
		return <Text>{Translation.OTHER.NO_CAMERA_PERMISSION}</Text>;
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
				</View>
			</View>
		</View>
	);
}

export default MerchantPayoutQRCodeScan