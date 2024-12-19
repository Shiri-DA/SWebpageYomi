import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddNews from "./AddNews";
import { usePostAPI } from "../../Hooks/usePostAPI";
import { handleAxiosError } from "../../Helpers/ErrorHandler";

jest.mock("../../Hooks/usePostAPI");
jest.mock("../../Helpers/ErrorHandler");

describe("AddNews", () => {
    beforeEach(() => {
        (usePostAPI as jest.Mock).mockReturnValue({
            data: null,
            loading: false,
            error: null,
            postData: jest.fn(),
        });

        (console.log as jest.Mock) = jest.fn();
        (handleAxiosError as jest.Mock).mockClear();
    });

    test("renders the component", () => {
        render(<AddNews />);
        expect(screen.getByText("Add New News")).toBeInTheDocument();
    });

    test("displays an error if fields are empty", () => {
        render(<AddNews />);
        fireEvent.click(screen.getByText("Create New News"));
        expect(console.log).toHaveBeenCalledWith(new Error("All fields are required"));
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
        (usePostAPI as jest.Mock).mockReturnValue({
            data: { headline: "Test Headline" },
            loading: false,
            error: null,
            postData,
        });

        const consoleSpy = jest.spyOn(console, "log").mockImplementation();

        render(<AddNews />);
        fireEvent.change(screen.getByLabelText("Headline"), { target: { value: "Test Headline" } });
        fireEvent.change(screen.getByLabelText("Creation Date"), { target: { value: "2024-12-19" } });
        fireEvent.change(screen.getByLabelText("Url"), { target: { value: "http://example.com" } });
        fireEvent.click(screen.getByText("Create New News"));

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith({ headline: "Test Headline" });
        });

        consoleSpy.mockRestore();
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