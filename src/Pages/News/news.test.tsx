import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import News from "./News";

// Mock the components used inside News
jest.mock("../../Components/NewsComponents/AddNews", () => () => <div>Add New News</div>);
jest.mock("../../Components/NewsComponents/DeleteNews", () => () => <div>Delete News</div>);
jest.mock("../../Components/NewsComponents/RetrieveNews", () => (props: any) => (
    <div>
        Retrieve News
        <button onClick={() => {
            props.onRetrieve({ id: 1, headline: "Test Headline", url: "Test URL", creationDate: "2024-12-24", reviewed: false });
            props.switchToDelete();
        }}>
            Mock Get News
        </button>
    </div>
));

describe("News Component", () => {

    test("renders News component with buttons", () => {
        render(<News />);
        expect(screen.getByText("NEWS")).toBeInTheDocument();
        ["Add", "Edit", "Delete", "Retrieve"].forEach(option => {
            expect(screen.getByText(option)).toBeInTheDocument();
        });
    });

    test("renders AddNews component when Add button is clicked", () => {
        render(<News />);
        fireEvent.click(screen.getByText("Add"));
        expect(screen.getByText("Add New News")).toBeInTheDocument();
    });

    test("renders EditComponent when Edit button is clicked", () => {
        render(<News />);
        fireEvent.click(screen.getByText("Edit"));
        expect(screen.getByText("Edit Component")).toBeInTheDocument();
    });

    test("renders DeleteNews component when Delete button is clicked", () => {
        render(<News />);
        fireEvent.click(screen.getByText("Delete"));
        expect(screen.getByText("Delete News")).toBeInTheDocument();
    });

    test("renders RetrieveNews component when Retrieve button is clicked", () => {
        render(<News />);
        fireEvent.click(screen.getByText("Retrieve"));
        expect(screen.getByText("Retrieve News")).toBeInTheDocument();
    });

    test("transitions to DeleteNews component with data after RetrieveNews action", async () => {
        render(<News />);
        fireEvent.click(screen.getByText("Retrieve"));
        fireEvent.click(screen.getByText("Mock Get News"));

        await waitFor(() => {
            expect(screen.getByText("Delete News")).toBeInTheDocument();
        });
    });

    test("only one component is rendered at a time", () => {
        render(<News />);
        fireEvent.click(screen.getByText("Add"));
        expect(screen.queryByText("Edit Component")).not.toBeInTheDocument();
        expect(screen.queryByText("Delete News")).not.toBeInTheDocument();
        expect(screen.queryByText("Retrieve News")).not.toBeInTheDocument();

        fireEvent.click(screen.getByText("Edit"));
        expect(screen.queryByText("Add New News")).not.toBeInTheDocument();
        expect(screen.queryByText("Delete News")).not.toBeInTheDocument();
        expect(screen.queryByText("Retrieve News")).not.toBeInTheDocument();

        fireEvent.click(screen.getByText("Delete"));
        expect(screen.queryByText("Add New News")).not.toBeInTheDocument();
        expect(screen.queryByText("Edit Component")).not.toBeInTheDocument();
        expect(screen.queryByText("Retrieve News")).not.toBeInTheDocument();

        fireEvent.click(screen.getByText("Retrieve"));
        expect(screen.queryByText("Add New News")).not.toBeInTheDocument();
        expect(screen.queryByText("Edit Component")).not.toBeInTheDocument();
        expect(screen.queryByText("Delete News")).not.toBeInTheDocument();
    });
});