import {NewsModel} from "../Models/NewsModel";
import {usePostAPI} from "./usePostAPI";
import { renderHook, act } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
const axios = require('axios'); // Use CommonJS require
const MockAdapter = require('axios-mock-adapter');

const mock = new MockAdapter(axios);

describe("usePostAPI hook", () => {
    afterEach(() => {
        mock.reset()
    });

    it("should post data and return response", async () => {
        const mockData: NewsModel = {
            id: 1,
            headline: "Headline 1",
            creationDate: new Date(2024,2,4).toString(),
            url: "url1",
            reviewed: false
        }
        mock.onPost("https://api.example.com/data").reply(200, mockData);

        const { result } = renderHook(() => usePostAPI<NewsModel>());

        act(() => {
            result.current.postData("https://api.example.com/data",
                {key: "value"});
        });

        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.data).toEqual(mockData);
        expect(result.current.error).toBeNull();
    })
})