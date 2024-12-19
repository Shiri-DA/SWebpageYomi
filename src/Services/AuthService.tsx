import axios from "axios";
import {handleAxiosError} from "../Helpers/ErrorHandler";
import {UserProfileToken} from "../Models/User";

const api : string = (process.env["REACT_APP_API_URL"] as string);

export const loginApi =
    async (username: string, password : string) => {
    try {
        const data = await axios.post<UserProfileToken>
            (api + "/authenticate", {username, password});
        return data;
    } catch (error) {
        handleAxiosError(error);
    }
};