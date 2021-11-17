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
	tag: "Esraa",
	avatar: "",
	firstName: "Esraa",
	lastName: "Jbara",
	address1: "Address 1",
	address2: "Address 2",
	city: "City",
	state: "MA",
	postalCode: "1232123",
}

export const dwollaInfoInitialState: DwollaInfo = {
	dwollaId: "",
	resourceUri: "",
}

export const signInInitialState = {
	email: "esraa+7771@humanity.cash",
	password: "HumanityCash1122@",
}

export const signUpInitialState = {
	email: "esraa+8282@humanity.cash",
	password: "HumanityCash1122@",
	confirmPassword: "HumanityCash1122@",
}
