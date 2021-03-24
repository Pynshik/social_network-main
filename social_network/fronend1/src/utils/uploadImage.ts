import {axios} from "../core/axios";

interface UploadImageReturnPropsInterface {
    height: number;
    size: number;
    url: string;
    width: number;
}

export const uploadImage = async (image: File): Promise<UploadImageReturnPropsInterface> => {
    const formData = new FormData();
    formData.append('image', image);

    const { data } = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data;   
}