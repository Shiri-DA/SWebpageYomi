import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddNews from "./AddNews";
import { usePostAPI } from "../../Hooks/usePostAPI";
import { handleAxiosError, handleGeneratedError } from "../../Helpers/ErrorHandler";
import { toast } from "react-toastify";
import {NewsModel} from "../../Models/NewsModel";

jest.mock("../../Hooks/usePostAPI");
jest.mock("../../Helpers/ErrorHandler");
jest.mock("react-toastify");

describe("AddNews", () => {
    beforeEach(() => {
        (usePostAPI as jest.Mock).mockReturnValue({
            data: null,
            loading: false,
            error: null,
            postData: jest.fn(),
        });

        (handleAxiosError as jest.Mock).mockClear();
        (handleGeneratedError as jest.Mock).mockClear();
        (toast.success as jest.Mock).mockClear();
    });

    test("renders the component", () => {
        render(<AddNews />);
        expect(screen.getByText("Add New News")).toBeInTheDocument();
    });

    test("displays an error if fields are empty", async () => {
        render(<AddNews />);
        fireEvent.click(screen.getByText("Create New News"));
        await waitFor(() => {
            expect(handleGeneratedError).toHaveBeenCalledWith(new Error("All fields are required"));
        });
    });

    test("calls postData with correct data", async () => {
        const postData = jest.fn();
        (usePostAPI as jest.Mock).mockReturnValue({
            data: null,
            loading: false,
            error: null,
            postData,
        });

        render(<AddNews />);
        fireEvent.change(screen.getByLabelText("Headline"), { target: { value: "Test Headline" } });
        fireEvent.change(screen.getByLabelText("Creation Date"), { target: { value: "2024-12-19" } });
        fireEvent.change(screen.getByLabelText("Url"), { target: { value: "http://example.com" } });
        fireEvent.click(screen.getByText("Create New News"));

        await waitFor(() => {
            expect(postData).toHaveBeenCalledWith(
                `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_POST_NEW_NEWS}`,
                { headline: "Test Headline", creationDate: "2024-12-19", url: "http://example.com" }
            );
            expect(screen.getByLabelText("Headline")).toHaveValue("");
            expect(screen.getByLabelText("Creation Date")).toHaveValue("");
            expect(screen.getByLabelText("Url")).toHaveValue("");
        });
    });

    test("handles API success response", async () => {
        const postData = jest.fn();
        const testData: NewsModel = {
            id: 1,
            headline: "Test Headline",
            creationDate: "2024-12-19",
            url: "http://example.com"
        };
        (usePostAPI as jest.Mock).mockReturnValue({
            data: testData,
            loading: false,
            error: null,
            postData,
        });

        render(<AddNews />);
        fireEvent.change(screen.getByLabelText("Headline"), { target: { value: "Test Headline" } });
        fireEvent.change(screen.getByLabelText("Creation Date"), { target: { value: "2024-12-19" } });
        fireEvent.change(screen.getByLabelText("Url"), { target: { value: "http://example.com" } });
        fireEvent.click(screen.getByText("Create New News"));

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith(`The news has been added successfully.\n 
            This is the object created:\n 
            ${testData.id}, \n${testData.headline}, \n${testData.creationDate}, \n${testData.url}`);
        });


    });

    test("handles API error response", async () => {
        const postData = jest.fn();
        const error = new Error("API Error");
        (usePostAPI as jest.Mock).mockReturnValue({
            data: null,
            loading: false,
            error,
            postData,
        });

        render(<AddNews />);
        fireEvent.change(screen.getByLabelText("Headline"), { target: { value: "Test Headline" } });
        fireEvent.change(screen.getByLabelText("Creation Date"), { target: { value: "2024-12-19" } });
        fireEvent.change(screen.getByLabelText("Url"), { target: { value: "http://example.com" } });
        fireEvent.click(screen.getByText("Create New News"));

        await waitFor(() => {
            expect(handleAxiosError).toHaveBeenCalledWith(error);
        });
    });
});