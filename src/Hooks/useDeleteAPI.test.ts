import {renderHook, act, waitFor} from "@testing-library/react";
import { useDeleteAPI } from "./useDeleteAPI";
import { APIDeleteResponse } from "../Models/APICalls";
const axios = require("axios"); // Use CommonJS require


jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("useDeleteAPI", () => {
    it("should handle successful delete request", async () => {
        mockedAxios.delete.mockResolvedValue({ status: 204 });

        const { result } = renderHook(() => useDeleteAPI());

        await act(async () => {
            result.current.deleteData("https://api.example.com/", 1);
        });

        await waitFor(() => {expect(result.current.status).toBe(204)});
        await waitFor(() => {expect(result.current.loading).toBe(false)});
        await waitFor(() => {expect(result.current.error).toBe(null)});
    });

    it("should handle failed delete request", async () => {
        const error = new Error("Network Error");
        mockedAxios.delete.mockRejectedValue(error);

        const { result } = renderHook(() => useDeleteAPI());

        await act(async () => {
            result.current.deleteData("https://api.example.com/", 1);
        });

        await waitFor(() => {expect(result.current.status).toBe(null)});
        await waitFor(() => {expect(result.current.loading).toBe(false)});
        await waitFor(() => {expect(result.current.error).toBe(error)});
    });

    it("should set loading state correctly", async () => {
        mockedAxios.delete.mockResolvedValue({ status: 204 });

        const { result } = renderHook(() => useDeleteAPI());

        act(() => {
            result.current.deleteData("https://api.example.com/", 1);
        });

        expect(result.current.loading).toBe(true);

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });
    });
});