import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import {HomePage} from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import News from "../Pages/News/News";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([{
    path: "/",
    element: <App/>,
    children: [
        {path: "", element: <HomePage />},
        {path: "login", element: <LoginPage/>},
        // {path: "news", element: <ProtectedRoute><News/></ProtectedRoute>}
        {path: "news", element: <News />}
    ]
}])