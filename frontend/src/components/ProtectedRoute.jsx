import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [jwtToken, setJwtToken] = useState(localStorage.getItem(ACCESS_TOKEN));

    useEffect(() => {
        const checkToken = async () => {
            if (!jwtToken) {
                setIsAuthorized(false);
                return;
            }

            const expDate = jwtDecode(jwtToken).exp * 1000;
            if (expDate < Date.now()) {
                // refresh the token
                try {
                    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
                    // call api to get the new token
                    const res = await api.post("/api/token/refresh", {
                        refresh: refreshToken,
                    });
                    if (res.status === 200) {
                        const newAccess = res.data.access;
                        setJwtToken(newAccess);
                        localStorage.setItem(ACCESS_TOKEN, newAccess);
                        setIsAuthorized(true);
                    }
                    else {
                        setIsAuthorized(false);
                    }
                } catch (err) {
                    console.log(err);
                    setIsAuthorized(false);
                }
            } else {
                setIsAuthorized(true);
            }
        };
        checkToken();
    }, [jwtToken]);

    if (isAuthorized === null) {
        return <h1>Loading...</h1>;
    }
    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
