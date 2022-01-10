import moment from "moment";
import Toast from "react-native-toast-message";
import { MiniTransaction, ToastType, TransactionType } from "src/utils/types";

const fee = 0.015;

export const makeId = (): string =>
  Math.random()
    .toString(36)
    .substring(7);

export const formatValue = (value: number): string => {
  const strFormat = value.toFixed(2);
  const [firstPart, secondPart] = strFormat.split(".");
  return (
    firstPart.replace(/\B(?=(\d{3})+(?!\d))/g, "'") +
    (secondPart ? "," + secondPart : "")
  );
};

export const getBerksharePrefix = (type: TransactionType | string): string => {
  if (
    type === TransactionType.SALE ||
    type === TransactionType.RETURN ||
    type === TransactionType.IN ||
    type === TransactionType.DEPOSIT
  ) {
    return "+ B$";
  } else {
    return "- B$";
  }
};

export const prefixCustomerName = (name: string): string => {
  if (name.startsWith("@")) {
    return name;
  } else {
    return `@${name}`;
  }
};

export const showToast = (
  type: ToastType,
  text1: string,
  text2: string
): void => {
  Toast.show({
    type,
    text1,
    text2
  });
};

export const calcFee = (amount: number): number => {
  return amount * fee;
};

export const sortTxByTimestamp = (txs: MiniTransaction[]): MiniTransaction[] =>
  txs.sort((a: MiniTransaction, b: MiniTransaction) => {
    if (moment(a.timestamp).isAfter(b.timestamp)) return -1;
    else if (moment(a.timestamp).isBefore(b.timestamp)) return 1;
    else return 0;
  });
