import axios from "axios";
import {NewsModel} from "../Models/NewsModel";
import {act, renderHook, waitFor} from "@testing-library/react";
import {useGetAPIByParams} from "./useGetAPI";

const MockAdapter = require("axios-mock-adapter");

const mock = new MockAdapter(axios);

describe("useGetAPI hook", () => {
    afterEach(() => {
        mock.reset()
    });

    test("should post data and return response", async () => {
        const mockData: NewsModel = {
            id: 1,
            headline: "Headline 1",
            creationDate: new Date(2024,2,4).toString(),
            url: "url1",
            reviewed: false
        }
        mock.onGet("https://api.exaple.com/data", { params: { url:"url1" } }).reply(200, mockData);

        const { result } = renderHook(() => useGetAPIByParams<NewsModel>());

        act(() => {
            result.current.getData("https://api.exaple.com/data",
                {url:"url1"});
        })

        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.data).toEqual(mockData);
        expect(result.current.error).toBeNull();

    });

    test("should handle fetch error", async () => {
        const mockError = new Error("Network Error");
        mock.onGet("https://api.exaple.com/data", { params: { url:"url1" } })
            .networkError();

        const { result } = renderHook(() => useGetAPIByParams<NewsModel>());

        act(() => {
            result.current.getData("https://api.exaple.com/data",
                {url:"url1"});
        })

        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.error).toEqual(mockError);
        expect(result.current.data).toBeNull();
    })
})