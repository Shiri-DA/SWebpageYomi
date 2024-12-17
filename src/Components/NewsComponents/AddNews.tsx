import {useState} from "react";

type Props = {};

const AddNews = (props : Props) => {
    const [headline, setHeadline] = useState("");
    const [creationDate, setCreationDate] = useState("");
    const [url, setUrl] = useState("");

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
                        />
                    </label></li>
                    <li><label>
                        Creation Date
                        <input
                            type="date"
                            value={creationDate}
                            name="creationDate"
                            onChange={e => setCreationDate(e.target.value)}
                        />
                    </label></li>
                    <li><label>
                        Url
                        <input
                            type="string"
                            value={url}
                            name="url"
                            onChange={e => setUrl(e.target.value)}
                        />
                    </label></li>
                </ul>
            </div>
        </div>
    )
}



export default AddNews;