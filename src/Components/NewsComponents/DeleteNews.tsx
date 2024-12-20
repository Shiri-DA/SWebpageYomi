import {useEffect, useState} from "react";
import {handleGeneratedError} from "../../Helpers/ErrorHandler";
import {useDeleteAPI} from "../../Hooks/useDeleteAPI";
import { toast} from "react-toastify";

type Props = {}

const DeleteNews = (props: Props) => {
    const [newsId, setNewsId] = useState<number>(0);
    // Hook to manage de API call
    const {status, loading, error, deleteData} = useDeleteAPI();
    const baseAPIUrl : string = process.env.REACT_APP_API_URL as string;
    const newNewsAPIUrl : string = process.env.REACT_APP_API_NEWS_BASE_URL as string;
    const deleteNewsAPIUrl : string = process.env.REACT_APP_API_NEWS_DELETE as string;

    const handleSubmit = () => {
        // Checks that it is a valid number
        if(newsId < 1) {
            handleGeneratedError(new Error(`The news ID cannot be empty.`));
            return;
        }
        console.log(`${baseAPIUrl}${newNewsAPIUrl}`);

        // API call with custom hook
        deleteData(`${baseAPIUrl}${newNewsAPIUrl}${deleteNewsAPIUrl}`, newsId)

        // Reset variables
        setNewsId(0);
    }

    useEffect(() => {
        // The API responds with 204 if erased with exit
        if(status === 204) {
            toast.success("Successfully deleted news!");
        }
    }, [status]);

    return(
        <div>
            <h3>Delete News</h3>
            <div>
                <ul>
                    <li><label>
                        News ID
                        <input
                            type="number"
                            value={newsId}
                            name="newsId"
                            onChange={e => setNewsId(Number(e.target.value))}
                        />
                    </label>

                    </li>
                </ul>
            </div>
            <div>
                <button name={"delete"} onClick={handleSubmit} disabled={loading}>
                    {loading ? "Deleting..." : "Delete the News"}
                </button>
            </div>
        </div>
    )
}

export default DeleteNews;