import axios, { AxiosResponse } from "axios";
import { IMap } from "../utils/types";

const CORE_API_URL = "https://baklava.berkshares-api.keyko.rocks";
// const CORE_API_URL = "http://localhost:3000";
const httpRequest = axios.create({
  baseURL: CORE_API_URL,
});

type Body = IMap;
type Query = string;
type Path = string;

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

type HttpResponse = Promise<AxiosResponse<any>>;

const _getRequest = (query: Query) => (): HttpResponse =>
  httpRequest.get(query);
const _postRequest = (path: Path, body: Body) => (): HttpResponse =>
  httpRequest.post(path, body);
const _deleteRequest = (path: Path, body: Body) => (): HttpResponse =>
  httpRequest.delete(path, body);

export const getRequest = (query: Query): Promise<any> =>
  ErrorHandler(_getRequest(query));
export const postRequest = (path: Path, body: Body): Promise<any> =>
  ErrorHandler(_postRequest(path, body));
export const deleteRequest = (path: Path, body: Body): Promise<any> =>
  ErrorHandler(_deleteRequest(path, body));

const ErrorHandler = async (
  requestHandler: () => HttpResponse
): Promise<AxiosResponse<any> | undefined> => {
  try {
    const response: AxiosResponse<any> = await requestHandler();
    return response;
  } catch (err) {
    console.error(
      `API request failed: '${err.message}'`,
      `internal error: '${err.response.data.message}'`,
      `method: '${err.config.method.toUpperCase()}'`,
      `endpoint: '${err.config.baseURL + err.config.url}'`,
      "request:",
      JSON.parse(err.config.data)
    );

    return err.toJSON().message;
  }
};
