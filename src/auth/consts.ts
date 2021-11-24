import { BusinessBasicVerification, CustomerBasicVerification, DwollaInfo } from './types';

export const buisnessBasicVerificationInitialState: BusinessBasicVerification = {
	story: "Business Story",
	tag: "businesstag",
	avatar: "avatarrrara",
	type: "LLC",
	owner: {
		firstName: "owowname",
		lastName: "erwrwe",
		address1: "rewrwe",
		address2: "rwe",
		city: "rerew",
		state: "reqwrqew",
		postalCode: "123321",
	},
	registeredBusinessName: "aaalkol",
	industry: "bosos",
	ein: "12321",
	address1: "adsasada",
	address2: "aasds",
	city: "cici",
	state: "ssses",
	postalCode: "12321",
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
	email: "esraa+070705@humanity.cash",
	password: "HumanityCash1122@",
}

export const signUpInitialState = {
	email: "esraa+070705@humanity.cash",
	password: "HumanityCash1122@",
	confirmPassword: "HumanityCash1122@",
}
