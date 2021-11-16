import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "src/api/context";

export const Context = React.createContext({ customerDwollaId: "", businessDwollaId: "" });

export const Provider: React.FunctionComponent = ({ children }) => {
	const [customerDwollaId, setCustomerDwollaId] = useState("")
	const [businessDwollaId, setBusinessDwollaId] = useState("")
	const { user } = useContext(UserContext);
	const isVerifiedBusiness = user?.verifiedBusiness;
	const isVerifiedCustomer = user?.verifiedCustomer;

	const state = {
		businessDwollaId,
		customerDwollaId
	}
	useEffect(() => {
		if (isVerifiedBusiness) {
			setBusinessDwollaId(user?.business?.dwollaId || "")
		}
		if (isVerifiedCustomer) {
			setCustomerDwollaId(user?.customer?.dwollaId || "")
		}
	}, [isVerifiedCustomer, isVerifiedBusiness])

	return (
		<Context.Provider value={state}>{children}</Context.Provider>
	);
}

