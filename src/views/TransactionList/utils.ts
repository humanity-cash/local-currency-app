import moment from "moment";
import { MiniTransaction, TransactionType } from "src/utils/types";
import { styles } from "./style";

const mappedTypes = {
  All: "All",
  "Incoming transactions": "IN",
  "Outgoing transactions": "OUT",
  "Load ups B$": "Deposit",
  "Cash out to USD": "Withdraw"
};

export const getStyle = (type: string) => {
  if (
    type === TransactionType.SALE ||
    type === TransactionType.RETURN ||
    type === TransactionType.IN ||
    type === TransactionType.DEPOSIT
  ) {
    return styles.plusText;
  } else {
    return styles.minusText;
  }
};

export interface FilterDataInput {
  data: MiniTransaction[];
  startDate: Date | undefined;
  endDate: Date | undefined;
  selectedType: string | undefined;
}

export const filterData = ({
  data,
  startDate,
  endDate,
  selectedType
}: FilterDataInput) => {
  const filtered = data?.reduce<MiniTransaction[]>((acc, curr) => {
    if (startDate) {
      // filter by startDate
      if (moment(curr?.timestamp).isBefore(moment(startDate))) {
        return acc;
      }
    }

    if (endDate) {
      // filter by endDate
      if (moment(curr?.timestamp).isAfter(moment(endDate).add(1, "day"))) {
        return acc;
      }
    }

    if (selectedType && selectedType !== "All") {
      // filter by transaction type
      //@ts-ignore
      if (curr?.type !== mappedTypes[selectedType]) {
        return acc;
      }
    }
    return [...acc, curr];
  }, []);

  return filtered;
};
