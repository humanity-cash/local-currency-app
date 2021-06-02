/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios'

const CORE_API_URL = "http://localhost:3000"
const httpRequest = axios.create({
	baseURL: CORE_API_URL,
})

interface Body {
   [key: string]: any;
} 

type Query = string
type Path = string

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
type HttpResponse = Promise<AxiosResponse<any>>

const _getRequest = (query: Query) => 
  (): HttpResponse => httpRequest.get(query)
const _postRequest = (path: Path, body: Body) => 
  (): HttpResponse => httpRequest.post(path, body)
const _deleteRequest = (path: Path, body: Body) => 
  (): HttpResponse => httpRequest.delete(path, {data: body})

export const getRequest = (query: Query): Promise<any> => 
  ErrorHandler(_getRequest(query))
export const postRequest = (path: Path, body: Body): Promise<any> => 
  ErrorHandler(_postRequest(path, body))
export const deleteRequest = (path: Path, body: Body): Promise<any> => 
  ErrorHandler(_deleteRequest(path, body))

const ErrorHandler = async (requestHandler: () => HttpResponse): Promise<AxiosResponse<any> | undefined> => {
  try {
    const response: AxiosResponse<any> = await requestHandler()
    return response
  } catch (err) {
    const readbleError = err.toJSON().message
    console.log(`Http Request Error: ${readbleError}`)
    return readbleError
  }
}
