export interface APIPostResponse<T> {
    data: T | null;
    error: Error | null;
    loading: boolean;
    postData: (url: string, postData: object) => Promise<void>;
}