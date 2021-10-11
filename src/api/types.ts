import { AxiosResponse } from 'axios';

export type UserId = string;
export type AxiosPromiseResponse = AxiosResponse<unknown>;

export interface IUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    businessName?: string;
    ipAddress?: string;
    authUserId: string;
}

export interface IUserResponse {
    userId: string;
    address: string;
    balance: number;
    createdBlock: string;
}

export interface IDepositRequest {
    amount: string
}

export interface IWithdrawalRequest {
    amount: string;
}

export interface ITransactionRequest {
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
    blockNumber: number
    timestamp: string;
    userId: string;
    value: string;
    operator: string;
}

export interface IWithdrawalResponse {
    transactionHash: string;
    blockNumber: number,
    timestamp: string,
    userId: string;
    value: string;
    operator: string;
}

export interface ITransactionResponse {
    transactionHash: string;
    blockNumber: number,
    timestamp: string;
    fromUserId: string;
    fromAddress: string;
    toUserId: string;
    toAddress: string;
    value: string;
}

export interface IOperatorResponse {
    operator: string;
    totalDeposits: string;
    totalWithdrawals: string;
    currentOutstanding: string;
    deposits: IDepositResponse[];
    withdrawals: IWithdrawalResponse[];
}