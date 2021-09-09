export type BirthDate = {
  day: string;
  month: string;
  year: string;
};

export type OnboardingState = {
  authorization: AuthorizationDetails;
  statuses: Status;
  personalDetails: PersonalDetails;
  businessDetails: BusinessDetails;
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

export enum BusinessType {
  SOLE_PROPRIETORSHIP = "Sole Proprietorship",
  CORPORATION = "Corporation",
  LLC = "LLC",
  PARTNERSHIP = "Partnership",
  NON_PROFIT = "Non-profit"
}

export enum Industry {
  ARTS_ENTERTAINMENT = "Arts & entertainment",
  COMMUNICATION_EDUCATION = "Communication & education",
  FOOD_DRINK = "Food & drink",
  HEALTH_WELLNESS = "Health & wellness",
  LODGING = "Lodging",
  SHOPPING = "Shopping",
  SERVICES = "Services"
}

export type BusinessDetails = {
  avatar: string;
  businessname: string;
  businessStory: string;
  businessType: BusinessType;
  registeredBusinessname: string;
  industry: Industry;
  ein: string;
  phoneNumber: string;
  password: string;
  email: string;
  addressLine: string;
  addressLine2: string;
  zipCode: string;
  city: string;
  country: string;
};

export type BusinessDetailsErrors = {
  businessname?: string;
  businessType?: string;
  ein?: string;
};

export type BusinessAddressErrors = {
  addressLine?: string;
  addressLine2?: string;
  zipCode?: string;
  city?: string;
  country?: string;
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

export type MyTransactionItem = {
  transactionId: number,
	avatar: string,
	name: string,
  type: string,
	amount: string,
	date: string
}

export enum MerchantTransactionType {
  SALE = 'Sale',
	RETURN = 'Return',
	CASH_OUT = 'Cash out',
	TRANSFER = 'Transfer',
  DONATION = 'Donation',
  CUSTOMER_RETURN = 'Customer return',
  PURCHASEMENT = 'Purchasement'
}

export const TransactionTypes = {
  'Sale': 'Customer sale',
  'Return': 'Return',
  'Cash out': 'Cash out',
  'Transfer': 'Transfer',
  'Donation': 'Donation',
  'Customer return': 'Customer return',
  'Purchasement': 'Purchasement'
}

export type MerchantTransactionItem = {
  transactionId: string,
  type: MerchantTransactionType,
  amount: number,
  date: string
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

export interface AccordionEntry {
	title: string,
	content: string,
  style?: IMap,
  textColor?: string;
}

export interface FaqData extends AccordionEntry {
  type?: string
}