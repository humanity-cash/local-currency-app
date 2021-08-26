export interface UserAttributes {
	'custom:profilePicture'?: string
	'custom:tag'?: string
	'custom:address1'?: string
	'custom:address2'?: string
	'custom:city'?: string
	'custom:state'?: string
	'custom:postalCode'?: string
}

export interface UpdateUserAttributesInput {
	update: UserAttributes
}

export interface SignInInput {
	email: string
	password: string
}

export interface SignUpInput {
	email: string
	password: string
}

export interface ConfirmEmailVerificationCodeInput {
	email: string
	code: string
}

export type CognitoResponse<T> = Promise<{ success: boolean, data: { error: string } | T }>
export type CogResponse<T> = { success: boolean, data: { error: string } | T }
