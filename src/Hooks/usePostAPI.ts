import {useState} from "react";
import axios, {AxiosResponse} from "axios";
import {APIPostResponse} from "../Models/APICalls";


export const usePostAPI = <T>(): APIPostResponse<T> => {
    const [data, setData] = useState<T|null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const postData = async (url: string, postDate: object) => {
        setLoading(true);
        setError(null);
        try {
            const response : AxiosResponse<T> = await axios.post(url, postDate);
            setData(response.data);
        } catch (error) {
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    }

    return {data, loading, error, postData};
}