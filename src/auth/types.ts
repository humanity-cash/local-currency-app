export interface UserAttributes {
	profilePicture?: string
	tag?: string
	address1?: string
	address2?: string
	city?: string
	state?: string
	postalCode?: string
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