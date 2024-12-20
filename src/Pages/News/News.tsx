import React from "react";
import AddNews from "../../Components/NewsComponents/AddNews";
import DeleteNews from "../../Components/NewsComponents/DeleteNews";

const optionsList: string[] = ["Add", "Edit", "Delete", "Retrieve"];

// Define placeholder components for each action until created and imported
const EditComponent = () => <div>Edit Component</div>;
const RetrieveComponent = () => <div>Retrieve Component</div>;

const News = () => {
    // Tracks the component that is selected to render it
    const [activeComponent, setActiveComponent] = React.useState<string>("");

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
                {activeComponent === "Delete" && <DeleteNews />}
                {activeComponent === "Retrieve" && <RetrieveComponent />}
            </div>
        </div>
    );
};

export default News;