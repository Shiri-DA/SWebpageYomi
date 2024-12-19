import {useEffect, useState} from "react";
import {NewsModel} from "../../Models/NewsModel";
import {usePostAPI} from "../../Hooks/usePostAPI";
import {handleAxiosError} from "../../Helpers/ErrorHandler";


type Props = {};

const AddNews = (props : Props) => {
    const [headline, setHeadline] = useState("");
    const [creationDate, setCreationDate] = useState("");
    const [url, setUrl] = useState("");
    // Hook to manage the API call
    const {data, loading, error, postData} = usePostAPI<NewsModel>();
    // API urls
    const baseAPIUrl : string = process.env.REACT_APP_API_URL as string;
    const newNewsAPIUrl : string = process.env.REACT_APP_API_POST_NEW_NEWS as string;

    const handleSubmit = () => {
        //  Check all inputs are filled
        if (headline === "" || creationDate === "" || url === "") {
            // TODO: Popup (or other?) requiring input
            console.log(new Error("All fields are required"));
            return;
        }

        // Create the object
        const newNews: NewsModel = {
            headline,
            creationDate,
            url,
        }

        // Call the API with the custom hook
        postData(`${baseAPIUrl}${newNewsAPIUrl}`, newNews);

        setHeadline("");
        setCreationDate("");
        setUrl("");
    }

    // Handle success post
    useEffect(() => {
        // TODO: Popup (or other?) with all the info of the new news
        if(data) {
            console.log(data);
        }
    }, [data]);

    // Handle error post
    useEffect(() => {
        if(error) {
            handleAxiosError(error)
        }
    }, [error]);

    return(
        <div>
            <h2>Add New News</h2>
            <div>
                <ul>
                    <li><label>
                        Headline
                        <input
                            type="text"
                            value={headline}
                            name="headline"
                            onChange={e => setHeadline(e.target.value)}
                            required={true}
                        />
                    </label></li>
                    <li><label>
                        Creation Date
                        <input
                            type="date"
                            value={creationDate}
                            name="creationDate"
                            onChange={e => setCreationDate(e.target.value)}
                            required={true}
                        />
                    </label></li>
                    <li><label>
                        Url
                        <input
                            type="string"
                            value={url}
                            name="url"
                            onChange={e => setUrl(e.target.value)}
                            required={true}
                        />
                    </label></li>
                </ul>
            </div>
            <div>
                <button onClick={handleSubmit} disabled={loading}>
                    {loading ? "Adding..." : "Create New News"}
                </button>
            </div>
        </div>
    )
}



export default AddNews;