import { CognitoCustomerAttributes, CognitoBusinessAttributes, CognitoSharedUserAttributes, CognitoBusinessDwollaAttributes, CognitoCustomerDwollaAttributes } from './types';
import { CustomerBasicVerification, BusinessBasicVerification } from '../types';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

export const buildCompleteBusinessVerificationObject = (
	update: BusinessBasicVerification
): CognitoBusinessAttributes => {
	return ({
		"custom:business.story": update.story,
		"custom:business.tag": update.tag,
		"custom:business.avatar": update.avatar,
		"custom:business.type": update.type,
		"custom:owner.firstName": update.owner.firstName,
		"custom:owner.lastName": update.owner.lastName,
		"custom:owner.address1": update.owner.address1,
		"custom:owner.address2": update.owner.address2,
		"custom:owner.city": update.owner.city,
		"custom:owner.state": update.owner.state,
		"custom:owner.postalCode": update.owner.postalCode,
		"custom:business.rbn": update.registeredBusinessName,
		"custom:business.industry": update.industry,
		"custom:business.ein": update.ein,
		"custom:business.address1": update.address1,
		"custom:business.address2": update.address2,
		"custom:business.city": update.city,
		"custom:business.state": update.state,
		"custom:business.postalCode": update.postalCode,
		"custom:business.phoneNumber": update.phoneNumber,
	});
};

export const buildCompleteCustomerVerificationObject = (
	update: CustomerBasicVerification
): CognitoCustomerAttributes => {
	return ({
		"custom:personal.avatar": update.avatar,
		"custom:personal.tag": update.tag,
		"custom:personal.firstName": update.firstName,
		"custom:personal.lastName": update.lastName,
		"custom:personal.address1": update.address1,
		"custom:personal.address2": update.address2,
		"custom:personal.city": update.city,
		"custom:personal.state": update.state,
		"custom:personal.postalCode": update.postalCode,
	});
};

export const buildUserAttribute = (name: string, value: string): CognitoUserAttribute =>
	new CognitoUserAttribute({ Name: name, Value: value });

export const buildSignUpAttributeList = (email: string): CognitoUserAttribute[] => {
	const attributeEmail = buildUserAttribute('email', email.trim());
	return [attributeEmail];
}

export const buildUpdateUserAttributes = (update: CognitoCustomerAttributes | CognitoBusinessAttributes | CognitoSharedUserAttributes | CognitoBusinessDwollaAttributes | CognitoCustomerDwollaAttributes): CognitoUserAttribute[] => {
	if (!Object?.keys(update)?.length) return [];
	return Object.keys(update).map((name: string) =>
		//@ts-ignore
		buildUserAttribute(name, update[name])
	);
};