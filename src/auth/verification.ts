export const isCustomerVerified = (userAttrs: any): boolean => {
	let verified = false;
	for (let i = 0; i < userAttrs?.length; i++) {
		if (userAttrs[i].Name === "custom:basicCustomerV") {
			verified = Boolean(userAttrs[i].Value);
			break;
		}
	}

	return verified;
}

export const isBusinessVerified = (userAttrs: any): boolean => {
	let verified = false;
	for (let i = 0; i < userAttrs?.length; i++) {
		if (userAttrs[i].Name === "custom:basicBusinessV") {
			verified = Boolean(userAttrs[i].Value);
			break;
		}
	}

	return verified;
}