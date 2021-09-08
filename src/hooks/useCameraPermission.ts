import { useEffect, useState } from "react";
import { BarCodeScanner } from 'expo-barcode-scanner';

const useCameraPermission = (): boolean => {
	const [status, setStatus] = useState<boolean>(false);

	useEffect(() => {
		async () => {
			const {status} = await BarCodeScanner.requestPermissionsAsync();
			setStatus(status === 'granted');
		}
	}, []);

	return status;
};

export default useCameraPermission;