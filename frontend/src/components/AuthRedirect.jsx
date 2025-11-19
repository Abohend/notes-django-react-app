import { ACCESS_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

function AuthRedirect({children}) {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        if (jwtDecode(token).exp * 1000 > Date.now()) {
            return <Navigate to="/" replace/>
        }
    } catch(e) {
        console.log("Invalid token", e);
    }

    return children;
}

export default AuthRedirect;