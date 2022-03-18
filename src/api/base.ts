import axios, { AxiosResponse } from "axios";
import { IMap } from "../utils/types";
import envs from "./../config/env";
import { CognitoUserSession } from "amazon-cognito-identity-js";
import { BaseResponse } from "src/auth/types";
import { getSession, tokenIsExpired } from "src/auth/cognito";
import { getFromLocalStorage } from "src/auth/localStorage";

const httpRequest = axios.create({
  baseURL: envs.CORE_API_URL,
});

httpRequest.interceptors.request.use(async function (config) {
    
    const tokenExpiry = await getFromLocalStorage("@tokenExpiry");
    const expired = tokenIsExpired(tokenExpiry);
    
    if(expired){
      const session: BaseResponse<CognitoUserSession | undefined> = await getSession();
      const accessToken = session?.data?.getAccessToken();
      config.headers.authorization = accessToken?.getJwtToken();
    }
    else{
      const token = await getFromLocalStorage("@token");
      config.headers.authorization = token;
    }
    return config;
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

type HttpResponse = Promise<AxiosResponse>;

const _getRequest = (query: Query): HttpResponse => httpRequest.get(query);
const _postRequest = (path: Path, body: Body): HttpResponse =>
  httpRequest.post(path, body);
const _putRequest = (path: Path, body: Body): HttpResponse =>
  httpRequest.put(path, body);
const _deleteRequest = (path: Path, body: Body): HttpResponse =>
  httpRequest.delete(path, body);

export const getRequest = (query: Query): HttpResponse => _getRequest(query);
export const postRequest = (path: Path, body: Body): HttpResponse =>
  _postRequest(path, body);
export const putRequest = (path: Path, body: Body): HttpResponse =>
  _putRequest(path, body);
export const deleteRequest = (path: Path, body: Body): HttpResponse =>
  _deleteRequest(path, body);

// const ErrorHandler = async (
//   requestHandler: () => HttpResponse
// ): HttpResponse => {
//   try {
//     const response: AxiosResponse = await requestHandler();
//     return response;
//   } catch (err) {
//     const config = err?.config;
//     const message = err?.message;
//     const response = err?.response;
//     console.log("~ error.response.data", response?.data);
//     console.error(
//       `API request failed: '${message}'`,
//       `internal error: '${response?.data?.message}'`,
//       `method: '${config?.method?.toUpperCase()}'`,
//       `endpoint: '${config?.baseURL + config?.url}'`,
//       "request:",
//       config?.data ? JSON.parse(config?.data) : ""
//     );

//     return err.toJSON().message;
//   }
// };
