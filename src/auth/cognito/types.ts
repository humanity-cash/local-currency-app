import { CognitoUser } from "amazon-cognito-identity-js"

/**Shared between Custoemr and Business */
export interface CognitoSharedUserAttributes {
	'custom:basicCustomerV'?: string,
	'custom:basicBusinessV'?: string,
	'custom:consent'?: string
}

/**Customer */
export interface CognitoCustomerAttributes {
	'custom:personal.avatar': string,
	'custom:personal.tag': string,
	'custom:personal.address1': string,
	'custom:personal.address2': string,
	'custom:personal.city': string,
	'custom:personal.state': string,
	'custom:personal.postalCode': string,
	'custom:personal.firstName': string,
	'custom:personal.lastName': string
}

/**Business */
export interface CognitoBusinessAttributes {
	"custom:business.story": string,
	"custom:business.tag": string,
	"custom:business.avatar": string,
	"custom:business.type": string,
	"custom:business.rbn": string,
	"custom:business.industry": string,
	"custom:business.ein": string,
	"custom:business.address1": string,
	"custom:business.address2": string,
	"custom:business.city": string,
	"custom:business.state": string,
	"custom:business.postalCode": string,
	"custom:business.phoneNumber"?: string,
	"custom:owner.firstName": string,
	"custom:owner.lastName": string,
	"custom:owner.address1": string,
	"custom:owner.address2": string,
	"custom:owner.city": string,
	"custom:owner.state": string,
	"custom:owner.postalCode": string
}

export interface CognitoCustomerDwollaAttributes {
	'custom:personal.dwollaId'?: string,
	'custom:personal.resourceUri'?: string
}

export interface CognitoBusinessDwollaAttributes {
	'custom:business.dwollaId': string,
	'custom:business.resourceUri': string
}

export type CognitoError = any

export type BaseResponse<T> = { user?: CognitoUser | null, success: boolean, data: { error: string } | T }

export type CognitoResponse<T> = Promise<BaseResponse<T>>
