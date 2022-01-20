import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { BusinessBasicVerification, CustomerBasicVerification } from "./types";

export const buildCompleteBusinessVerificationObject = (
  update: BusinessBasicVerification
): any => {
  return {
    story: update.story,
    tag: update.tag,
    avatar: update.avatar,
    type: update.type,
    "owner.firstName": update.owner.firstName,
    "owner.lastName": update.owner.lastName,
    "owner.address1": update.owner.address1,
    "owner.address2": update.owner.address2,
    "owner.city": update.owner.city,
    "owner.state": update.owner.state,
    "owner.postalCode": update.owner.postalCode,
    rbn: update.registeredBusinessName,
    industry: update.industry,
    ein: update.ein,
    address1: update.address1,
    address2: update.address2,
    city: update.city,
    state: update.state,
    postalCode: update.postalCode,
    phoneNumber: update.phoneNumber,
  };
};

export const buildCompleteCustomerVerificationObject = (
  update: CustomerBasicVerification
): any => {
  return {
    avatar: update.avatar,
    tag: update.tag,
    firstName: update.firstName,
    lastName: update.lastName,
    address1: update.address1,
    address2: update.address2,
    city: update.city,
    state: update.state,
    postalCode: update.postalCode,
  };
};

export const buildUserAttribute = (
  name: string,
  value: string
): CognitoUserAttribute =>
  new CognitoUserAttribute({ Name: name, Value: value });

export const buildSignUpAttributeList = (
  email: string
): CognitoUserAttribute[] => {
  const attributeEmail = buildUserAttribute("email", email.trim());
  return [attributeEmail];
};

export const convertAttributesArrayToObject = (attributes: any): any => {
  const newObject: any = {};
  for (let i = 0; i < attributes.length; i++) {
    newObject[attributes[i].Name] = attributes[i].Value;
  }

  return newObject;
};
