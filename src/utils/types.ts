export type BirthDate = {
  day: string;
  month: string;
  year: string;
};

export type OnboardingState = {
  authorization: AuthorizationDetails;
  statuses: Status;
  personalDetails: PersonalDetails;
  terms: Terms;
  loggedIn: boolean;
};

export type AuthorizationDetails = {
  pin: string;
  pinInput: string;
  touchID: boolean;
};

export type PersonalDetails = {
  countryOfResidence: string;
  avatar: string;
  username: string;
  phoneCountry: string;
  story: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  emailVerified: boolean;
  addressLine: string;
  addressLine2: string;
  zipCode: string;
  city: string;
  country: string;
};

export type PersonalDetailsErrors = {
  firstname?: string;
  lastname?: string;
  username?: string;
  nationality?: string;
  dateOfBirth?: string;
};

export type PersonalAddressErrors = {
  addressLine?: string;
  addressLine2?: string;
  zipCode?: string;
  city?: string;
  country?: string;
};

export type Status = {
  personalDetails: boolean;
  cashAdded: boolean;
  terms: boolean;
  verifyId: boolean;
  notifications: boolean;
  serverVerified: boolean;
};

export type Terms = {
  terms: boolean;
  privacy: boolean;
  banking: boolean;
} & IMap;

export type PaymentState = {
  amount: string;
  status: boolean;
  type: "creditCard" | "deposit" | "";
  selected: CreditCardDetails;
  cards: CreditCardDetails[];
  withdrawDetails: WithdrawPaymentDetails;
};

export type CreditCardDetails = {
  id: string;
  number: string;
  expireMonth: string;
  expireYear: string;
  cvc: string;
};

export type CreditCardDetailsErrors = {
  number?: string;
  date?: string;
  cvc?: string;
};

export type WithdrawPaymentDetails = {
  number: string;
  ownerName: string;
};

export type Wallet = {
  amount: number;
  reservationAmount: number;
  transactions: Transaction[];
  reservations: Transaction[];
  minimum: WalletMinimum;
  details: WalletDetails;
};

export type WalletDetails = {
  walletId: string;
  iban: string;
};

export type Route = {
  current: string;
};

export type Order = {
  id: string;
  name: string;
  type: OrderType;
  quantity: number;
  price: number;
  expires?: Date;
  created: Date;
  status: StatusType;
};

export enum OrderType {
  BUY = "buy",
  SELL = "sell",
}

export enum StatusType {
  PROGRESS = "inprogress",
  COMPLETE = "complete",
  PARTIALLY = "partially",
}

export type Share = {
  id: string;
  marketEntryId: string;
  name: string;
  changeRate: number;
  diff: Growth;
  quantity: number;
  price: number;
  yield: number;
};

export enum Growth {
  INCREASE = "increase",
  DECRESE = "decrease",
}

export type MarketEntry = {
  id: string;
  name: string;
  price: number;
  description: string[];
  changeRate: number;
  diff: Growth;
  nominalValue: number;
  dividend: number;
  tradedShares: number;
  tradedValue: number;
  totalShares: number;
  companyValue: number;
  offered: ShareEntry[];
  wanted: ShareEntry[];
  files: DocumentFile[];
};

export type ShareEntry = {
  type: OrderType;
  price: number;
  quantity: number;
};

export type DocumentFile = {
  name: string;
  filename: any;
};

export enum FilterType {
  TOP_GAINS = "topGains",
  TOP_LOSS = "topLoss",
  TOP_DIVIDED = "topDivided",
  TOP_TRADE = "topTrade",
}

export type GraphDataset = {
  date: Date;
  value: number;
};

export type Message = {
  id: string;
  title: string;
  text: string[];
  created: Date;
  unread: boolean;
};

export type OrderTransaction = {
  id: string;
  title?: string;
  price: number;
  shares: number;
  type: TransactionType;
  created: Date;
};

export type BalanceTransaction = {
  id: string;
  title?: string;
  price: number;
  account: string;
  type: TransactionType;
  created: Date;
};

export type WalletMinimum = {
  amount: number;
  number: string;
  expireMonth: string;
  expireYear: string;
  cvc: string;
  enabled: boolean;
};

export type Transaction = OrderTransaction | BalanceTransaction;

export enum TransactionType {
  BUY = "buy",
  SELL = "sell",
  WITHDRAW = "withdraw",
  ADDCASH = "addcash",
  RESERVATION = "reservation",
}

export type Notification = {
  message: string;
  redirect: string;
};

export type ModalStatusBar = {
  show: boolean;
  styles: { backgroundColor?: string };
  bar?: "light-content";
};

export type DialogStatus = {
  visible: boolean;
};

export interface IMap {
  [key: string]: any;
}

export interface Bank {
  id: string;
  name: string;
  icon: string;
}

export type MerchantCategory = {
  id: string;
  name: string;
  merchants: MerchantEntry[];
}

export type MerchantEntry = {
  title: string;
  description: string;
  image: string;
  addressLine1: string;
  addressLine2: string;
  phone: string;
}
