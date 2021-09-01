import { MerchantTransactionType } from "src/utils/types";

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