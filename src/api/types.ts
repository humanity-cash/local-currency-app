import { AxiosResponse } from "axios";

export type UserId = string;
export type EventId = string;
export type AxiosPromiseResponse<T = unknown> = AxiosResponse<T>;

export interface BaseUser {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface IUser {
  consent: boolean;
  verifiedCustomer: boolean;
  verifiedBusiness: boolean;
  email: string;
  customer?: Customer;
  business?: Business;
  dbId: string; //ObjectId
}

type DwollaId = string;

export interface Business {
  story: string;
  tag: string;
  avatar: string;
  type: string;
  rbn: string;
  industry: string;
  ein: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  phoneNumber: string;
  dwollaId?: DwollaId;
  resourceUri?: string;
  owner: BaseUser;
}

export interface Customer extends BaseUser {
  avatar: string;
  tag: string;
  dwollaId?: DwollaId;
  resourceUri?: string;
}

export interface IUserRequest {
  email: string;
  consent: boolean;
  type: string; // 'customer' | 'business';
  business?: Business;
  customer?: Customer;
}

export interface IWallet {
  totalBalance: number;
  availableBalance: number;
  userId: string;
  address: string;
  createdBlock: string;
}

export interface IDepositRequest {
  amount: string;
}

export interface IMicroDepositRequest {
  amount1: string;
  amount2: string;
}

export interface IWithdrawalRequest {
  amount: string;
}

export interface ITransactionRequest {
  roundUpAmount?: string;
  toUserId: string;
  amount: string;
  comment: string;
}

export interface IHealthResponse {
  blockNumber: number;
  chainId: number;
  nodeInfo: string;
  token: string;
  walletCount: string;
  owner: string;
  walletFactory: string;
}

export interface IDepositResponse {
  transactionHash: string;
  blockNumber: number;
  timestamp: number;
  userId: string;
  value: string;
  operator: string;
}

export interface IWithdrawalResponse {
  transactionHash: string;
  blockNumber: number;
  timestamp: number;
  userId: string;
  value: string;
  operator: string;
}

export interface ITransaction {
  transactionHash: string;
  blockNumber: number;
  timestamp: number;
  fromDwollaUserId: string;
  toDwollaUserId: string;
  fromUserId: string;
  toName: string;
  fromName: string;
  fromAddress: string;
  toUserId: string;
  toAddress: string;
  type: "IN" | "OUT" | "Deposit" | "Withdraw";
  value: string;
  image?: string;
}

export interface IOperatorResponse {
  operator: string;
  totalDeposits: string;
  totalWithdrawals: string;
  currentOutstanding: string;
  deposits: IDepositResponse[];
  withdrawals: IWithdrawalResponse[];
}

export interface IEvent {
  userId: UserId;
  timestamp: number;
  message: string;
  closed: boolean;
  level: string;
  dbId: string;
}

export interface FeedItemProps {
  textTitle: string;
  text: string;
  image: string;
  contentType: string
}

export interface IBank {
  bankName: string;
  bankAccountType: string;
  createdAt: string;
  name: string;
}
export interface FundingSource {
  visible: boolean,
  bank: IBank | undefined,
  needMicroDeposit: boolean
}
