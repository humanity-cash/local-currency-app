import { FeedItemProps } from "src/api/types";
import { getRequest } from "./base";

export const getFeedContent = async (): Promise<FeedItemProps[]> => {
  try {
    const response = await getRequest("/content?random=6");
    if (response?.data?.length > 0) {
      const data = response?.data.map((d: any) => {
        if (d.image.includes(".tif.svg")) {
          return { ...d, image: `` };
        }
        return { ...d, image: `${d.image}` };
      });

      return data;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getMonthOfTheBusiness = async (): Promise<FeedItemProps[]> => {
  try {
    const response = await getRequest("/content?type=FeaturedBusiness");
    if (response?.data?.length > 0) {
      const data = response?.data.map((d: any) => {
        if (d.image.includes(".tif.svg")) {
          return { ...d, image: `` };
        }
        return { ...d, image: `${d.image}` };
      });

      return data;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};
