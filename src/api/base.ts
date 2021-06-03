import axios, { AxiosResponse } from "axios";
import { IMap } from "../utils/types";

const CORE_API_URL = "https://baklava.berkshares-api.keyko.rocks";
// const CORE_API_URL = "http://localhost:3000";
const httpRequest = axios.create({
  baseURL: CORE_API_URL,
  // url?: string;
  // method?: Method;
  // transformRequest?: AxiosTransformer | AxiosTransformer[];
  // transformResponse?: AxiosTransformer | AxiosTransformer[];
  // headers?: any;
  // params?: any;
  // paramsSerializer?: (params: any) => string;
  // data?: any;
  // timeout?: number;
  // timeoutErrorMessage?: string;
  // withCredentials?: boolean;
  // auth?: AxiosBasicCredentials;
  // responseType?: ResponseType;
});

type Body = IMap;
type Query = string;
type Path = string;
type UserId = string;

interface NewUser {
  userId: string;
}

export interface AuthorizationRequest {
  userId: string;
  transactionId: string;
  authorizationAmount: number;
}

export interface SettlementRequest {
  userId: string;
  transactionId: string;
  settlementAmount: number;
}

const _getRequest = (query: Query) => () => httpRequest.get(query);
const _postRequest = (path: Path, body: Body) => () =>
  httpRequest.post(path, body);
const _deleteRequest = (path: Path, body: Body) => () =>
  httpRequest.post(path, body);

export const getRequest = (query: Query) => ErrorHandler(_getRequest(query));
export const postRequest = (path: Path, body: Body) =>
  ErrorHandler(_postRequest(path, body));
export const deleteRequest = (path: Path, body: Body) =>
  ErrorHandler(_deleteRequest(path, body));

const ErrorHandler = async (requestHandler: () => Promise<AxiosResponse>) => {
  try {
    const response = await requestHandler();
    return response.data;
  } catch (err) {
    console.error(
      `API request failed: '${err.message}'`,
      `internal error: '${err.response.data.message}'`,
      `method: '${err.config.method.toUpperCase()}'`,
      `endpoint: '${err.config.baseURL + err.config.url}'`,
      "request:",
      JSON.parse(err.config.data)
    );
  }
};
