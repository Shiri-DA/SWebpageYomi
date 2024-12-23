import {useGetAPIByParams} from "../../Hooks/useGetAPI";
import {handleAxiosError, handleGeneratedError} from "../../Helpers/ErrorHandler";
import RetrieveNews from "./retrieveNews";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {NewsModel} from "../../Models/NewsModel";

const baseAPIUrl = "https://api.example.com";
const baseNewsAPIUrl = "/news";

jest.mock("../../Hooks/useGetAPI");
jest.mock("../../Helpers/ErrorHandler");

describe("RetrieveNews Component", () => {
    beforeEach(() => {
        process.env.REACT_APP_API_URL = baseAPIUrl;
        process.env.REACT_APP_API_NEWS_BASE_URL = baseNewsAPIUrl;
        (useGetAPIByParams as jest.Mock).mockReturnValue({
            data: null,
            loading: false,
            error: null,
            getData: jest.fn()
        });

        (handleAxiosError as jest.Mock).mockClear();
        (handleGeneratedError as jest.Mock).mockClear();
    });

    test("should render the component", () => {
        render(<RetrieveNews />);
        expect(screen.getByText(/retrieve news/i)).toBeInTheDocument();
        expect(screen.getByText(/url/i)).toBeInTheDocument();
        expect(screen.getByText(/get news/i)).toBeInTheDocument();
    });

    test("should call getData with correct arguments and displays data", async () => {
        const mockGetData = jest.fn();
        const mockNews: NewsModel = {
            id: 1,
            headline: "headline1",
            url: "url1",
            creationDate: "2024-12-19",
            reviewed: false
        };
        (useGetAPIByParams as jest.Mock).mockReturnValue({
            data:mockNews,
            loading: false,
            error: null,
            getData: mockGetData
        });

        render(<RetrieveNews />);
        fireEvent.change(screen.getByLabelText(/url/i), { target: {value: "url1"}});
        fireEvent.click(screen.getByText(/get news/i));

        await waitFor(() => {
            expect(mockGetData).toHaveBeenCalledWith(
                `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_NEWS_BASE_URL}`,
                {url: "url1"})
        });

        await waitFor(() => {expect(mockGetData).toBeCalledTimes(1)});
        await waitFor(() => {expect(screen.getByLabelText(/url/i)).toHaveValue("")});
        expect(screen.getByText('Searched news')).toBeInTheDocument();
        expect(screen.getByText(`Retrieved News ID: ${mockNews.id}`)).toBeInTheDocument();
        expect(screen.getByText(`Retrieved News URL: ${mockNews.url}`)).toBeInTheDocument();
        expect(screen.getByText(`Retrieved News Date: ${mockNews.headline}`)).toBeInTheDocument();
        expect(screen.getByText(`Retrieved News URL: ${String(mockNews.reviewed)}`)).toBeInTheDocument();
    });

    test("should display an error if field are empty", async () => {
        const mockError = new Error("URL param cannot be null");
        render(<RetrieveNews />);
        fireEvent.change(screen.getByLabelText(/url/i), { target: {value: "   "}});
        fireEvent.click(screen.getByText(/get news/i));
        await waitFor(() => {
            expect(handleGeneratedError).toHaveBeenCalledWith(mockError)
        });
    });

    test("should handle API error response", async () => {
        const getData = jest.fn();
        const error = new Error("API Error");
        (useGetAPIByParams as jest.Mock).mockReturnValue({
            data: null,
            loading: false,
            error,
            getData
        });

        render(<RetrieveNews />);
        fireEvent.change(screen.getByLabelText(/url/i), {target: {value:"url1"}});
        fireEvent.click(screen.getByText(/get news/i));

        await waitFor(() => {
            expect(handleAxiosError).toHaveBeenCalledWith(error);
        })
    });

})