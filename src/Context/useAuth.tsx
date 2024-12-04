import {UserProfile} from "../Models/User";
import React, {ReactNode, useEffect} from "react";
import {useNavigate} from "react-router";
import {loginApi} from "../Services/AuthService";
import {toast} from "react-toastify";
import axios from "axios";

type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    loginUser: (username: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
}

type Props = { children: ReactNode };

const UserContext = React.createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({children}: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = React.useState<string | null>(null);
    const [user, setUser] = React.useState<UserProfile| null>(null);
    const [isReady, setIsReady] = React.useState<boolean>(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if(user && token) {
            setUser(JSON.parse(user));
            setUser(JSON.parse(token));
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        setIsReady(true);
    }, []);

    const loginUser = async (username: string, password: string) => {
        await loginApi(username, password)
        .then(res => {
            if (res) {
                localStorage.setItem("token", res?.data.token);
                const userObj = {
                    username: res?.data.username
                };
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(res?.data.token);
                setUser(userObj);
                toast.success("Login Successful!");
                navigate("/");
            }
        })
            .catch((err) => toast.warning("Server error"));
    };

    const isLoggedIn = () => {
        return !!user;
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken("");
        navigate("/");
    }

    return (
        <UserContext.Provider value={{loginUser, user, token, logout, isLoggedIn}}>
            {isReady ? children : null}
        </UserContext.Provider>
    )
}

export const useAuth = () => React.useContext(UserContext);