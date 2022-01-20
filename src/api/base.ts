import axios, { AxiosResponse } from "axios";
import { IMap } from "../utils/types";
import envs from "./../config/env";

const httpRequest = axios.create({
  baseURL: envs.CORE_API_URL,
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

const ErrorHandler = async (
  requestHandler: () => HttpResponse
): HttpResponse => {
  try {
    const response: AxiosResponse = await requestHandler();
    return response;
  } catch (err) {
    const config = err?.config;
    const message = err?.message;
    const response = err?.response;
    console.log("~ error.response.data", response?.data);
    console.error(
      `API request failed: '${message}'`,
      `internal error: '${response?.data?.message}'`,
      `method: '${config?.method?.toUpperCase()}'`,
      `endpoint: '${config?.baseURL + config?.url}'`,
      "request:",
      config?.data ? JSON.parse(config?.data) : ""
    );

    return err.toJSON().message;
  }
};
