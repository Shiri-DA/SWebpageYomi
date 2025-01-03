import { useDeleteAPI } from "../../Hooks/useDeleteAPI";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import DeleteNews from "./DeleteNews";
import { handleAxiosError, handleGeneratedError } from "../../Helpers/ErrorHandler";
import { NewsModel } from "../../Models/NewsModel";
import { toast } from "react-toastify";

const baseAPIUrl = "https://api.example.com";
const baseNewsAPIUrl = "/news";
const deleteNewsAPIUrl = "/delete";

jest.mock("../../Hooks/useDeleteAPI");
jest.mock("../../Helpers/ErrorHandler");
jest.mock("react-toastify");

describe("DeleteNews Component", () => {
    const mockToastSuccess = toast.success as jest.Mock;

    beforeEach(() => {
        process.env.REACT_APP_API_URL = baseAPIUrl;
        process.env.REACT_APP_API_NEWS_BASE_URL = baseNewsAPIUrl;
        process.env.REACT_APP_API_NEWS_DELETE = deleteNewsAPIUrl;
        (useDeleteAPI as jest.Mock).mockReturnValue({
            status: null,
            loading: false,
            error: null,
            deleteData: jest.fn(),
        });
        mockToastSuccess.mockClear();
    });

    test("should render the component", () => {
        render(<DeleteNews data={null} />);
        expect(screen.getByText("Delete News")).toBeInTheDocument();
        expect(screen.getByLabelText("News ID")).toBeInTheDocument();
        expect(screen.getByText("Delete the News")).toBeInTheDocument();
    });

    test("should call deleteData with correct arguments", async () => {
        const mockDeleteData = jest.fn();
        (useDeleteAPI as jest.Mock).mockReturnValue({
            status: null,
            loading: false,
            error: null,
            deleteData: mockDeleteData,
        });

        render(<DeleteNews data={{ id: 1, headline: "Test Headline", url: "Test URL", creationDate: "2024-12-24", reviewed: false }} />);
        fireEvent.change(screen.getByLabelText("News ID"), { target: { value: 1 } });
        fireEvent.click(screen.getByText("Delete the News"));

        await waitFor(() => { expect(mockDeleteData).toBeCalledTimes(1); });
        await waitFor(() => {
            expect(mockDeleteData).toHaveBeenCalledWith(`${baseAPIUrl}${baseNewsAPIUrl}${deleteNewsAPIUrl}`, 1);
        });
    });

    test("should display an error if news ID is less than 1", () => {
        const mockHandleGeneratedError = handleGeneratedError as jest.Mock;
        mockHandleGeneratedError.mockClear();

        render(<DeleteNews data={null} />);
        fireEvent.change(screen.getByLabelText("News ID"), { target: { value: "0" } });
        fireEvent.click(screen.getByText("Delete the News"));

        expect(mockHandleGeneratedError).toHaveBeenCalledWith(new Error("The news ID cannot be empty."));
    });

    test("should set loading state correctly", async () => {
        (useDeleteAPI as jest.Mock).mockReturnValue({
            status: null,
            loading: true,
            error: null,
            deleteData: jest.fn(),
        });

        render(<DeleteNews data={null} />);
        fireEvent.change(screen.getByLabelText("News ID"), { target: { value: "1" } });
        fireEvent.click(screen.getByText(/deleting.../i));

        expect(screen.getByText("Deleting...")).toBeInTheDocument();
    });

    test("handles API error response", async () => {
        const error = new Error("API Error");
        (useDeleteAPI as jest.Mock).mockReturnValue({
            status: null,
            loading: false,
            error,
            deleteData: jest.fn(),
        });

        render(<DeleteNews data={null} />);
        fireEvent.change(screen.getByLabelText("News ID"), { target: { value: "1" } });
        fireEvent.click(screen.getByText("Delete the News"));

        await waitFor(() => { expect(handleAxiosError).toHaveBeenCalledWith(error); });
    });

    test("should display success message on successful deletion", async () => {
        (useDeleteAPI as jest.Mock).mockReturnValue({
            status: 204,
            loading: false,
            error: null,
            deleteData: jest.fn(),
        });

        render(<DeleteNews data={null} />);
        await waitFor(() => { expect(mockToastSuccess).toHaveBeenCalledWith("Successfully deleted news!"); });
    });
});