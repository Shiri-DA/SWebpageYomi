import axios from "axios";
import {handleError} from "../Helpers/ErrorHandler";
import {UserProfileToken} from "../Models/User";

const api : string = (process.env["API_URL "] as string);

export const loginApi =
    async (username: string, password : string) => {
    try {
        const data = await axios.post<UserProfileToken>
            (api + "account/login", {username, password});
        return data;
    } catch (error) {
        handleError(error);
    }
};