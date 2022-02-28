import { postRequest } from "./base";
import { AxiosPromiseResponse } from "./types";

export const uploadImageToS3 = async (data: FormData, userId: string) => {
    try {
        const IMAGE_UPLOAD_ENDPOINT 
            = 'https://container-service-1.hnt41uhh64h0q.eu-central-1.cs.amazonlightsail.com/upload';
        const request = {
            method: 'post',
            body: data,
            headers: {
                'Content-Type': 'multipart/form-data',
                'userId': userId
            },
        }
        const response = await fetch(IMAGE_UPLOAD_ENDPOINT, request);
        return response
    } catch(err) {
        console.log('err here')
        console.log(err)
    }
}

export const purgeImgix = async (
  id: string
): Promise<AxiosPromiseResponse> => {
  try {
    const response = await postRequest(`/users/${id}/cache/profilePicture`, {});
    return response;
  } catch (err) {
    return {} as any;
  }
};

