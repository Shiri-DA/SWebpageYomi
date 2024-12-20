import {APIDeleteResponse} from "../Models/APICalls";
import {useState} from "react";
import axios from "axios";


export const useDeleteAPI = (): APIDeleteResponse => {
    const [status, setStatus] = useState<number|null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error|null>(null);

    const deleteData = async (url:string, id: number) => {
        setLoading(true);
        setError(null);
        setStatus(null);

        try{
            const response = await axios.delete(`${url}/${id}`);
            setStatus(response.status);
        } catch (error) {
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    }

    return {status, loading, error, deleteData}
}