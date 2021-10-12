import Toast from 'react-native-toast-message';
import { MerchantTransactionType, ToastType } from "src/utils/types";

const fee = 0.015;

export const makeId = (): string => Math.random().toString(36).substring(7);

export const formatValue = (value: number): string => {
	const strFormat = value.toFixed(2);
	const [firstPart, secondPart] = strFormat.split('.');
	return firstPart.replace(/\B(?=(\d{3})+(?!\d))/g, "'") + (secondPart ? "," + secondPart : "");
}

export const getBerksharePrefix = (type: MerchantTransactionType): string => {
	if (type === MerchantTransactionType.SALE || type === MerchantTransactionType.RETURN) {
		return "+ B$";
	} else {
		return "- B$";
	}
}

export const showToast = (type: ToastType, text1: string, text2: string): void => {
	Toast.show({
		type,
		text1,
		text2,
	  });
}

export const calcFee = (amount: number): number => {
	return amount * fee;
}