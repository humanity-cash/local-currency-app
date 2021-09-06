import { useEffect } from "react";
import { createStore, useStore } from "react-hookstore";
import { BarCodeScanner } from 'expo-barcode-scanner';

const storeId = "CAMERA_PERMISSION_RECORD";

type CameraPermissionState = {
	status: boolean
};

const store = createStore<CameraPermissionState>(storeId, {
	status: false
});
let loaded = false;

const useMarketEntry = (): boolean => {
	const [details] = useStore<CameraPermissionState>(storeId);

	useEffect(() => {
		async function getCameraPermission() {
			if (!loaded) {
				try {
					const {status} = await BarCodeScanner.requestPermissionsAsync();
					store.setState({status: status === 'granted'});
				} catch (error) {
					// Error saving data
				}
				loaded = true;
			}
		}

		getCameraPermission();
	}, []);

	return details.status;
};

export default useMarketEntry;