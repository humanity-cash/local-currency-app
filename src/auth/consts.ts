import { BusinessBasicVerification, CustomerBasicVerification, DwollaInfo } from './types';

export const buisnessBasicVerificationInitialState: BusinessBasicVerification = {
	story: "",
	tag: "",
	avatar: "",
	type: "business type",
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
	type: "personal",
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
	email: "esraa+4321@humanity.cash",
	password: "Twinpeaks1301@",
}

export const signUpInitialState = {
	email: "esraa+4321@humanity.cash",
	password: "Twinpeaks1301@",
	confirmPassword: "Twinpeaks1301@",
}
