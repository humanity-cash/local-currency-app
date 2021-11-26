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
	tag: "adedee",
	avatar: "",
	firstName: "dededea",
	lastName: "deadeada",
	address1: "deadeada",
	address2: "deadada",
	city: "dedee",
	state: "CA",
	postalCode: "2121",
}

export const dwollaInfoInitialState: DwollaInfo = {
	dwollaId: "",
	resourceUri: "",
}
// email: "esraa+0000090101@humanity.cash",

export const signInInitialState = {
	email: "esraa+000009017231@humanity.cash",
	password: "HumanityCash1122@",
}

export const signUpInitialState = {
	email: "esraa+000009017231@humanity.cash",
	password: "HumanityCash1122@",
	confirmPassword: "HumanityCash1122@",
}
