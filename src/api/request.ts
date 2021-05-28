import axios from 'axios'

const CORE_API_URL = "http://localhost:3000"
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
})

interface Body {
   [key: string]: any;
} 
type Query = string
type Path = string
type UserId = string

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

const _getRequest = (query: Query) => () => httpRequest.get(query)
const _postRequest = (path: Path, body: Body) => () => httpRequest.post(path, {data: body})
const _deleteRequest = (path: Path, body: Body) => () => httpRequest.post(path, {data: body})

const getRequest = (query: Query) => ErrorHandler(_getRequest(query))
const postRequest = (path: Path, body: Body) => ErrorHandler(_postRequest(path, body))
const deleteRequest = (path: Path, body: Body) => ErrorHandler(_deleteRequest(path, body))

const ErrorHandler = async (requestHandler: Function) => {
  try {
    const response = requestHandler()
    return response
  } catch (err) {
    console.log('err in request', (err.toJSON()))  
  }
}

export const Requests = {
  get: {
    user:(request: UserId) => getRequest(`/user?userId=${request}`),
    health: () => getRequest('/health'),
    authorize: (request: UserId) => getRequest(`/authorize?userId=${request}`),
    settle: (request: UserId) => getRequest(`/settle?userId=${request}`),
  },
  post: {
    user:(request: NewUser) => postRequest('/user', request),
    authorize:(request: AuthorizationRequest)=> postRequest('/authorize', request),
    settle:(request: SettlementRequest) => postRequest('/settle', request),
    reconcile: () =>  postRequest('/reconcile', {})
  }
}