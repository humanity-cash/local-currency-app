import { AxiosPromiseResponse } from "src/api/types";

export const isSuccessResponse = (response: AxiosPromiseResponse): boolean => {
    console.log("🚀 ~ file: http.ts ~ line 5 ~ isSuccessResponse ~ response.status", response.status)
	if (response.status >= 200 && response.status <= 299) {
		return true
	} else return false
}

export const delay = (n: number) => {
	return new Promise(function (resolve) {
		setTimeout(resolve, n * 1000);
	});
}
