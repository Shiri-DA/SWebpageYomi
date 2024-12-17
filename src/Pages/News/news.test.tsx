import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import News from "./News";

// Mock the components used inside News
// TODO: TDD activate each mock when creating the real componen
jest.mock("../../Components/NewsComponents/AddNews.tsx", () => () => <div>Add New News</div>);
// jest.mock("./EditComponent", () => () => <div>Edit News</div>);
// jest.mock("./DeleteComponent", () => () => <div>Delete News</div>);
//  jest.mock("./RetrieveComponent", () => () => <div>Retrieve News</div>);

describe("News Component", () => {

    test("renders News component with buttons", () => {
        const optionsList : string[] = ["Add", "Edit", "Delete", "Retrieve", "Retrieve"];
        render(<News />);
        expect(screen.getByText("NEWS")).toBeInTheDocument();
        optionsList.forEach(option => {
            expect(screen.getByText(option)).toBeInTheDocument();
        });
    });

    test("renders AddNews component when Add button is clicked", () => {
        render(<News />);
        fireEvent.click(screen.getByText("Add"));
        expect(screen.getByText("Add New News")).toBeInTheDocument();
    });

    // TODO: activate each test when real component created
    // test("renders EditComponent when Edit button is clicked", () => {
    //     render(<News />);
    //     fireEvent.click(screen.getByText("Edit"));
    //     expect(screen.getByText("Edit News")).toBeInTheDocument();
    // });

    // test("renders DeleteComponent when Delete button is clicked", () => {
    //     render(<News />);
    //     fireEvent.click(screen.getByText("Delete"));
    //     expect(screen.getByText("Delete Component")).toBeInTheDocument();
    // });

    // test("renders RetrieveComponent when Retrieve button is clicked", () => {
    //     render(<News />);
    //     fireEvent.click(screen.getByText("Retrieve"));
    //     expect(screen.getByText("Retrieve Component")).toBeInTheDocument();
    // });

    test("only one component is rendered at a time", () => {
        render(<News />);
        fireEvent.click(screen.getByText("Add"));
        expect(screen.queryByText("Edit Component")).not.toBeInTheDocument();
        expect(screen.queryByText("Delete Component")).not.toBeInTheDocument();
        expect(screen.queryByText("Retrieve Component")).not.toBeInTheDocument();

        // TODO: activate each event when component created
        // fireEvent.click(screen.getByText("Edit"));
        // expect(screen.queryByText("Add Component")).not.toBeInTheDocument();
        // expect(screen.queryByText("Delete Component")).not.toBeInTheDocument();
        // expect(screen.queryByText("Retrieve Component")).not.toBeInTheDocument();
        //
        // fireEvent.click(screen.getByText("Delete"));
        // expect(screen.queryByText("Add Component")).not.toBeInTheDocument();
        // expect(screen.queryByText("Edit Component")).not.toBeInTheDocument();
        // expect(screen.queryByText("Retrieve Component")).not.toBeInTheDocument();
        //
        // fireEvent.click(screen.getByText("Retrieve"));
        // expect(screen.queryByText("Add Component")).not.toBeInTheDocument();
        // expect(screen.queryByText("Edit Component")).not.toBeInTheDocument();
        // expect(screen.queryByText("Delete Component")).not.toBeInTheDocument();
    });
});
