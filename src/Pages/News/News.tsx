import React, {useState} from "react";
import AddNews from "../../Components/NewsComponents/AddNews";
import DeleteNews from "../../Components/NewsComponents/DeleteNews";
import RetrieveNews from "../../Components/NewsComponents/retrieveNews";
import {NewsModel} from "../../Models/NewsModel";

const optionsList: string[] = ["Add", "Edit", "Delete", "Retrieve"];

// Define placeholder components for each action until created and imported
const EditComponent = () => <div>Edit Component</div>;

const News = () => {
    // Tracks the component that is selected to render it
    const [activeComponent, setActiveComponent] = React.useState<string>("");
    const [news, setNews] = useState<NewsModel | null>(null);

    const onOptionClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        setActiveComponent(event.currentTarget.id);
    };

    return (
        <div>
            <h1>NEWS</h1>
            <ul>
                {optionsList.map((item: string, index: number): React.ReactElement => (
                    <li key={index}>
                        <button
                            id={item}
                            onClick={onOptionClick}
                        >
                            {item}
                        </button>
                    </li>
                ))}
            </ul>
            <div>
                {activeComponent === "Add" && <AddNews />}
                {activeComponent === "Edit" && <EditComponent />}
                {activeComponent === "Delete" && <DeleteNews data={news} />}
                {activeComponent === "Retrieve" && (
                    <RetrieveNews switchToDelete={() => setActiveComponent("Delete")}
                                  onRetrieve={(data: NewsModel) => {
                        setNews(data);
                    }} />)}
            </div>
        </div>
    );
};

export default News;