import { BusinessBasicVerification, CustomerBasicVerification, DwollaInfo } from './types';

export const buisnessBasicVerificationInitialState: BusinessBasicVerification = {
	story: "",
	tag: "",
	avatar: "",
	type: "",
	owner: {
		firstName: "",
		lastName: "",
		address1: "",
		address2: "",
		city: "",
		state: "",
		postalCode: "",
	},
	registeredBusinessName: "",
	industry: "",
	ein: "",
	address1: "",
	address2: "",
	city: "",
	state: "",
	postalCode: "",
}

export const customerBasicVerificationInitialState: CustomerBasicVerification = {
	type: "",
	tag: "",
	avatar: "",
	firstName: "",
	lastName: "",
	address1: "",
	address2: "",
	city: "",
	state: "",
	postalCode: "",
}

export const dwollaInfoInitialState: DwollaInfo = {
	dwollaId: "",
	resourceUri: "",
}

export const signInInitialState = {
	email: "esraa+000006@humanity.cash",
	password: "HumanityCash1122@",
}

export const signUpInitialState = {
	email: "esraa+000006@humanity.cash",
	password: "HumanityCash1122@",
	confirmPassword: "HumanityCash1122@",
}
