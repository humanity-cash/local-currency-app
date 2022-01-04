import { getRequest, deleteRequest } from "./base";
import { UserId, EventId, IEvent } from "./types";
import { eventDatas } from "./formatters/index";

export const userEvents = async (userId: UserId): Promise<IEvent[]> => {
  try {
    const response = await getRequest(`/users/${userId}/notifications`);

    return eventDatas(response);
  } catch (error) {
    console.log("Error in getDeposits", error);
    return [];
  }
};

export const deleteEvent = async (
  userId: UserId,
  notificationId: EventId
): Promise<boolean> => {
  try {
    await deleteRequest(`/users/${userId}/notifications/${notificationId}`, {});
    return true;
  } catch (error) {
    console.log("Error in getDeposits", error);
    return false;
  }
};
