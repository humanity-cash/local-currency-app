import { IWallet } from "@humanity.cash/types";
import { AxiosPromiseResponse, ITransaction, IEvent, FundingSource } from "src/api/types";
import { MiniTransaction } from "src/utils/types";
import moment from 'moment';
import { profilePictureUrl } from "src/utils/common";

const formatTransactionValue = (value: number | string): string => {
  return String((Number(value) / 1000000000000000000).toFixed(2));
};

export const formatDeposits = (
  response: AxiosPromiseResponse<[]>
): MiniTransaction[] => {
  return response?.data?.map((tx: any) => {
    return {
      transactionHash: tx.transactionHash,
      blockNumber: tx.blockNumber,
      timestamp: tx.timestamp * 1000,
      fromName: tx.fromName,
      type: "Deposit",
      toName: tx.toName,
      value: formatTransactionValue(tx.value),
      fromUserId: tx.fromUserId
    };
  });
};

export const formatWithdrawals = (
  response: AxiosPromiseResponse<[]>
): MiniTransaction[] => {
  return response?.data?.map((tx: any) => {
    return {
      transactionHash: tx.transactionHash,
      blockNumber: tx.blockNumber,
      timestamp: tx.timestamp * 1000,
      toName: tx.toName,
      fromName: tx.fromName,
      type: "Withdraw",
      value: formatTransactionValue(tx.value),
      fromUserId: tx.fromUserId
    };
  });
};

export const formatTransactions = (
  res: AxiosPromiseResponse
): MiniTransaction[] => {
  if (!res.data) return [];

  const list = res.data as ITransaction[];
  return list.map((tx) => {
    return {
      transactionHash: tx.transactionHash,
      blockNumber: tx.blockNumber,
      timestamp: tx.timestamp * 1000,
      toName: tx.toName,
      fromName: tx.fromName,
      type: tx.type,
      value: formatTransactionValue(tx.value),
      fromUserId: tx.fromUserId,
      image: tx.type === "IN" ? profilePictureUrl(tx.fromDwollaUserId) : profilePictureUrl(tx.toDwollaUserId)
    };
  });
};

export const fundingSource = (res: AxiosPromiseResponse): FundingSource => {
  if (!res.data) return {visible: false, bank: undefined, needMicroDeposit: false};

  const sources = res.data.body?._embedded["funding-sources"]

  if (sources?.length > 0) {
    for (let i = 0; i < sources.length; i++) {
      const source = sources[i];
      if (source.type === "bank") {
        return {
          visible: !source["_links"]["verify-micro-deposits"],
          bank: {
            bankName: source.bankName,
            bankAccountType: source.bankAccountType,
            createdAt: moment(source.created).format("h:mm A, MMM D, YYYY"),
            name: source.name,
          },
          needMicroDeposit: !!source["_links"]["verify-micro-deposits"] || !!source["_links"]["micro-deposits"]
        }
      }
    }
  } else {
    return {visible: false, bank: undefined, needMicroDeposit: false};
  }
  
  return {visible: false, bank: undefined, needMicroDeposit: false};
};

export const userData = (res: AxiosPromiseResponse): IWallet => {
  if (!res.data)
    return {
      totalBalance: 0,
      availableBalance: 0,
      userId: "",
      createdTimestamp: 0,
      address: "",
      createdBlock: "",
    };

  const list = res.data as IWallet[];
  return list[0];
};

export const eventDatas = (res: AxiosPromiseResponse): IEvent[] => {
  if (!res.data) return [];

  const list = res.data as IEvent[];
  return list.filter((event) => {
    return !event.closed;
  });
};

export const formatContent = (res: AxiosPromiseResponse) => {
  if (!res?.data) return [];
  //@ts-ignore
  const list = res?.data?.map((d: any) => {
    if (d.image.includes(".tif.svg")) {
      return { ...d, image: `` };
    }
    return { ...d, image: `${d.image}?w=500` };
  });

  return list;
};
