import {
	BusinessAddressErrors,
	BusinessDetails,
	BusinessDetailsErrors, CreditCardDetails, CreditCardDetailsErrors,
	PersonalAddressErrors,
	PersonalDetails,
	PersonalDetailsErrors
} from "./types";

const creditCardNumberValidation = (number: string) => {
	const aeCardNo = /^(?:3[47][0-9]{13})$/; // american express
	const vCardNo = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/; // visa
	const mCardNo = /^(?:5[1-5][0-9]{14})$/; // mastercard
	const dCardNo = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/; // discover
	const dcCardNo = /^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/; // diners club
	const jcbCardNo = /^(?:(?:2131|1800|35\d{3})\d{11})$/; // JCB

	return (number.match(aeCardNo) ||
		number.match(vCardNo) ||
		number.match(mCardNo) ||
		number.match(dCardNo) ||
		number.match(dcCardNo) ||
		number.match(jcbCardNo)
	);
}

export const validateCreditCard = (creditCardDetails: CreditCardDetails) => {
	const { number, expireMonth, expireYear, cvc } = creditCardDetails;
	const errors: CreditCardDetailsErrors = {};

	if (!creditCardNumberValidation(number)) {
		errors.number = 'Credit card number is invalid';
	}

	const monthNumber = parseInt(expireMonth);
	if (monthNumber > 12 || monthNumber < 1) {
		errors.date = 'Date is invalid';
	}

	if (cvc.length !== 3) {
		errors.cvc = 'CVC is invalid'
	}

	console.log('errors', errors);
	return { errors, valid: Object.keys(errors).length === 0 };

}

export const validateProfileForm = (personalDetails: PersonalDetails) => {
	const { username } = personalDetails;
	const errors: PersonalDetailsErrors = {};
	if (username === '') {
		errors.username = 'SORRY, THAT NAME IS ALREADY TAKEN';
	}
	return { errors, valid: Object.keys(errors).length === 0 };
}

export const validateAddressForm = (personalDetails: PersonalDetails) => {
	const { addressLine, addressLine2, zipCode, city, country } = personalDetails;
	const errors: PersonalAddressErrors = {};
	// TODO: add eventual validation of address form
	return { errors, valid: Object.keys(errors).length === 0 };
}

export const validateDetailsForm = (personalDetails: PersonalDetails) => {
	const { firstname, lastname } = personalDetails;
	const errors: PersonalDetailsErrors = {};
	if (firstname === '') {
		errors.firstname = 'Firstname needs to be specified';
	}
	if (lastname === '') {
		errors.lastname = 'Lastname needs to be specified';
	}
	return { errors, valid: Object.keys(errors).length === 0 };
}

export const validateBusinessProfileForm = (businessDetails: BusinessDetails) => {
	const { businessname } = businessDetails;
	const errors: BusinessDetailsErrors = {};
	if (businessname === '') {
		errors.businessname = 'SORRY, THAT NAME IS ALREADY TAKEN';
	}
	return { errors, valid: Object.keys(errors).length === 0 };
}

export const validateBusinessAddressForm = (businessDetails: BusinessDetails) => {
	const { addressLine, addressLine2, zipCode, city, country } = businessDetails;
	const errors: BusinessAddressErrors = {};
	// TODO: add eventual validation of address form
	return { errors, valid: Object.keys(errors).length === 0 };
}

export const validateBusinessDetailsForm = (businessDetails: BusinessDetails) => {
	const { registeredBusinessname, industry, businessType, ein } = businessDetails;
	const errors: BusinessDetailsErrors = {};
	if (registeredBusinessname === '') {
		errors.businessname = 'Registered businessname needs to be specified';
	}
	if (ein === '') {
		errors.ein = 'EIN needs to be specified';
	}
	return { errors, valid: Object.keys(errors).length === 0 };
}

const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})");
const emailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const isPasswordValid = (p: string): boolean => passwordRegex.test(p)

export const isEmailValid = (e: string): boolean => emailValidation.test(e)
