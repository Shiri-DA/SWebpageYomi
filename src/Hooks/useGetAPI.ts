import {useState} from "react";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {APIGetResponse} from "../Models/APICalls";


export const useGetAPIByParams = <T>(): APIGetResponse<T> => {
    const [data, setData] = useState<T|null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error|null>(null)

    const getData = async (
        url: string, params?: Record<string, any>, config?: AxiosRequestConfig) => {
        setLoading(true);
        setError(null);
        try {
            const response: AxiosResponse<T> = await axios.get(url, {params, ...config});
            setData(response.data);
        } catch (e) {
            setError(e as Error);
        } finally {
            setLoading(false);
        }
    }

    return {data, loading, error, getData}
}