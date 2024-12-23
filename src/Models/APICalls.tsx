import {AxiosRequestConfig} from "axios";

export interface APIPostResponse<T> {
    data: T | null;
    error: Error | null;
    loading: boolean;
    postData: (url: string, postData: object) => Promise<void>;
}

export interface APIDeleteResponse {
    status: number | null;
    loading: boolean;
    error: Error | null;
    deleteData: (url: string, id: number) => Promise<void>;
}

export interface APIGetResponse<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    getData:  (url: string, params?: Record<string, any>,
               config?: AxiosRequestConfig) => Promise<void>;
}