import { getRequest } from './base';
import { UserId } from './types';

export const userEvents = async (userId: UserId): Promise<any> => {
	try {
		const response = await getRequest(`/users/${userId}/notifications`);

		return response;
	} catch (error) {
		console.log("Error in getDeposits", error)
		return [];
	}
};
