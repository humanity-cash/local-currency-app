import { AxiosPromiseResponse } from "src/api/types";

export const isSuccessResponse = (response: AxiosPromiseResponse) => {
	if (response.status >= 200 && response.status <= 299) {
		return true
	} else return false
}
