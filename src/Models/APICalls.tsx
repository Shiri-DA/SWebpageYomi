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