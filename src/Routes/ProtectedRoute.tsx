import {useLocation} from "react-router";
import {useAuth} from "../Context/useAuth";
import {Navigate} from "react-router-dom";

type Props = {children: React.ReactNode}

const ProtectedRoute = ({children}: Props) => {
    const localtion = useLocation();
    const {isLoggedIn} = useAuth();
    return isLoggedIn() ?
        (<>{children}</>) :
        (<Navigate to={"/login"} state={{from: localtion}} replace/>)

}

export default ProtectedRoute;