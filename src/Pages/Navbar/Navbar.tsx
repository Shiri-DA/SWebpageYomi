import {data} from "react-router";
import {useAuth} from "../../Context/useAuth";


export const Navbar = () => {
    const { isLoggedIn, user, logout } = useAuth();

    return (
        <div>
            {isLoggedIn() ? (
                <div>
                    <a
                        onClick={logout}
                    >
                    Logout
                    </a>
                </div>
            ) : (
                <div>
                    <a
                        href="/login"
                    >
                    Login
                    </a>
                </div>
            )
            }
        </div>
    )
}