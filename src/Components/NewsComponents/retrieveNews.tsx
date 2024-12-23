import {useEffect, useState} from "react";
import {useGetAPIByParams} from "../../Hooks/useGetAPI";
import {handleAxiosError, handleGeneratedError} from "../../Helpers/ErrorHandler";
import {NewsModel} from "../../Models/NewsModel";


const RetrieveNews = () => {
    const [url, setUrl] = useState<string>("");
    // Hook to manage API call
    const {data, error, loading, getData} = useGetAPIByParams<NewsModel>();
    const baseAPIUrl : string = process.env.REACT_APP_API_URL as string;
    const newNewsAPIUrl : string = process.env.REACT_APP_API_NEWS_BASE_URL as string;

    const handleSubmit = () => {
        // Check if url is empty or blank
        if(url.trim() === "") {
            handleGeneratedError(new Error("URL param cannot be null"));
            return;
        }

        // API call with custom hook
        getData(`${baseAPIUrl}${newNewsAPIUrl}`, {url:url});

        // Reset variables
        setUrl("");
    }

    // Handles Axios Error
    useEffect(() => {
        if(error) {
            handleAxiosError(error)
        }
    }, [error]);


    return(
        <div>
            <h3>Retrieve news</h3>
            <div>
                <label>
                    URL
                    <input
                        type="text"
                        value={url}
                        name="newsURL"
                        onChange={e => setUrl(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <button name={"get"} onClick={handleSubmit} disabled={loading}>
                    {loading ? "Retrieving" : "Get News"}
                </button>
            </div>
            <div>
                {data ? (
                    <div>Searched news
                        <p>Retrieved News ID: {data.id}</p>
                        <p>Retrieved News URL: {data.url}</p>
                        <p>Retrieved News Date: {data.headline}</p>
                        <p>Retrieved News URL: {String(data.reviewed)}</p>
                    </div>
                ) : (
                    <p>No data</p>
                )}
            </div>
        </div>
    )
}

export default RetrieveNews;