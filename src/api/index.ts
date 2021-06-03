import { getRequest, postRequest } from "./base";

type UserId = string;

interface NewUser {
  userId: string;
}

interface AuthorizationRequest {
  userId: string;
  transactionId: string;
  authorizationAmount: number;
}

interface SettlementRequest {
  userId: string;
  transactionId: string;
  settlementAmount: number;
}

export default {
  get: {
    user: (request: UserId) => getRequest(`/user?userId=${request}`),
    health: () => getRequest("/health"),
    authorize: (request: UserId) => getRequest(`/authorize?userId=${request}`),
    settle: (request: UserId) => getRequest(`/settle?userId=${request}`),
  },
  post: {
    user: (request: NewUser) => postRequest("/user", request),
    authorize: (request: AuthorizationRequest) =>
      postRequest("/authorize", request),
    settle: (request: SettlementRequest) => postRequest("/settle", request),
    reconcile: () => postRequest("/reconcile", {}),
  },
};
