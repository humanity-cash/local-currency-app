import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./user";
import { EventsAPI } from "src/api";
import { UserType } from "src/auth/types";

export const EventsContext = React.createContext<IState>({} as IState);

//@ts-ignore
interface IState { }

export const EventsProvider: React.FunctionComponent = ({ children }) => {
	const { userType, customerDwollaId, businessDwollaId } = useContext(UserContext)
	const id = userType === UserType.Customer ? customerDwollaId : businessDwollaId
	const [isLoading, setLoading] = useState<boolean>(false);
	useEffect(() => {
		const handler = async () => {
			if (id) {
				const response = await EventsAPI.userEvents(id)
			}
		}
		handler()
	}, [userType])
	const state: IState = {};

	return (
		<EventsContext.Provider value={state}>{children}</EventsContext.Provider>
	);
};