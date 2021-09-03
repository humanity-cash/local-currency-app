import { REQUIRED_BASIC_DETAILS } from "src/auth/types";

export const completedEmailVerification = (userAttrs: any) => {
	let verified = false;
	for (let i = 0; i < userAttrs?.length; i++) {
		if (userAttrs[i].Name === "email_verified") {
			verified = Boolean(userAttrs[i].Value);
		}
	}
	return verified;
};

/** Should probably think about a more serious validation, or maybe not */
export const completedBasicDetails = (userAttrs: any) => {
	if(!userAttrs || !userAttrs?.length) return false;
	const basicDetails = userAttrs.filter((attr: any) => REQUIRED_BASIC_DETAILS.indexOf(attr.Name) > -1);
	if (!basicDetails.length) return false;
	if (basicDetails.length < 6) return false;
	return true;
};

export const completedAllVerifications = (userAttrs: any) => {
	const isEmailVerfied = completedEmailVerification(userAttrs);
	const isBasicDetailsCompleted = completedBasicDetails(userAttrs);

	return {
		isEmailVerfied,
		isBasicDetailsCompleted,
		isVerified: isEmailVerfied && isBasicDetailsCompleted,
	};
}
