import { useEffect, useState } from "react";
import { BarCodeScanner } from 'expo-barcode-scanner';

const useCameraPermission = (): boolean => {
	const [hasPermission, setHasPermission] = useState<boolean>(false);

	useEffect(() => {
		async function requestPermissionsAsync() {
			const {status} = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		}

		requestPermissionsAsync();
	}, []);

	return hasPermission;
};

export default useCameraPermission;