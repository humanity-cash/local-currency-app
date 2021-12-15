import React, { useState } from "react";
import { IEvent, UserId, EventId } from '../api/types';
import { deleteEvent as deleteEventApi, userEvents } from '../api/events'

export const EventsContext = React.createContext<IState>({} as IState);

//@ts-ignore
interface IState {
	events: IEvent[],
	updateEvents: (u: IEvent[]) => void,
	getEvents: (userId: UserId) => void,
	deleteEvent: (userId: UserId, eventId: EventId) => void
}

export const EventsProvider: React.FunctionComponent = ({ children }) => {
	const [events, setEvents] = useState<IEvent[]>([]);
	const updateEvents = (events: IEvent[]) => setEvents(events);

	const getEvents = async (userId: UserId) => {
		const ret = await userEvents(userId)
		updateEvents(ret)
	}

	const deleteEvent = async (userId: UserId, eventId: EventId) => {
		const ret = await deleteEventApi(userId, eventId)
		if(ret) {
			setEvents(events.filter(item => {return item.dbId != eventId}))
		}
	}
 
	const state: IState = {
		events,
		updateEvents,
		getEvents,
		deleteEvent
	}

	return (
		<EventsContext.Provider value={state}>{children}</EventsContext.Provider>
	);
};