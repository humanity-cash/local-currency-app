import moment from "moment";
import * as ImagePicker from 'expo-image-picker';
import { ImageResult, manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import Toast from "react-native-toast-message";
import { MiniTransaction, ToastType, TransactionType } from "src/utils/types";

const fee = 0.015;

export const makeId = (): string => Math.random().toString(36).substring(7);

export const formatValue = (value: number): string => {
    const strFormat = value.toFixed(2);
    const [firstPart, secondPart] = strFormat.split(".");
    return (
        firstPart.replace(/\B(?=(\d{3})+(?!\d))/g, "'") +
            (secondPart ? "," + secondPart : "")
    );
};

export const getBerksharePrefix = (type: TransactionType | string): string => {
    if (
        type === TransactionType.SALE ||
        type === TransactionType.RETURN ||
    type === TransactionType.IN ||
type === TransactionType.DEPOSIT
    ) {
        return "+ B$";
    } else {
        return "- B$";
    }
};

export const prefixCustomerName = (name: string): string => {
    if (name.startsWith("@")) {
        return name;
    } else {
        return `@${name}`;
    }
};

export const showToast = (
    type: ToastType,
    text1: string,
    text2: string,
    visibilityTime?: number
): void => {
    Toast.show({
        type,
        text1,
        text2,
        visibilityTime: visibilityTime ?? 5000
    });
};

export const calcFee = (amount: number): number => {
    return amount * fee;
};

export const sortTxByTimestamp = (txs: MiniTransaction[]): MiniTransaction[] =>
    txs.sort((a: MiniTransaction, b: MiniTransaction) => {
    if (moment(a.timestamp).isAfter(b.timestamp)) return -1;
    else if (moment(a.timestamp).isBefore(b.timestamp)) return 1;
    else return 0;
});

export const compressImage = async (uri: string, size: { width: number, height: number }): Promise<ImageResult> =>  {
    const result = await manipulateAsync(
        uri,
        [{ resize: size }],
        { compress: 0.7, format: SaveFormat.JPEG }
    );

    // type: `image/${format}`, 
    return  { 
        ...result 
    };
};

export const profilePictureUrl = (id: string): string => 
    `https://profile-picture-user.imgix.net/${id}.jpeg?w=512&time=${Date.now()}`

    export const buildImageFormData = async (uri: string, size = { width: 100, height: 100 }): Promise<FormData> => {
    const compressed = await compressImage(uri, size);
    const data = new FormData();
    //@ts-ignore
    data.append('file', compressed);
    data.append('content_type', 'image/jpeg');

    return data;
}

export const imagePickerConfig: ImagePicker.ImagePickerOptions = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    aspect: [4, 3],
    quality: 0,
};
