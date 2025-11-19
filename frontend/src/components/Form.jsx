import { ACCESS_TOKEN, LOGIN_FORM, REFRESH_TOKEN } from "../constants";
import api from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        username: "",
        password: "",
        nonField: "",
    });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const name = method === LOGIN_FORM ? "Login" : "Register";

    async function handleSubmit(e) {
        e.preventDefault();
        setErrors({ username: "", password: "", nonField: "" });
        setLoading(true);

        try {
            const res = await api.post(route, { username, password });

            if (res.status === 200 || res.status === 201) {
                if (method === LOGIN_FORM) {
                    localStorage.setItem(ACCESS_TOKEN, res.data.access);
                    localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                    navigate("/");
                } else {
                    navigate("/login");
                }
            } else {
                alert("Something went wrong!!");
                console.log(res);
            }
        } catch (err) {
            const data = err.response?.data;
            const newErrors = { username: "", password: "", nonField: "" };

            if (!data) {
                console.log(err);
            } else if (typeof data === "string") {
                newErrors.nonField = data;
            } else {
                if (data.username) {
                    newErrors.username = Array.isArray(data.username)
                        ? data.username.join(" ")
                        : String(data.username);
                }
                if (data.password) {
                    newErrors.password = Array.isArray(data.password)
                        ? data.password.join(" ")
                        : String(data.password);
                }
                if (data.non_field_errors) {
                    newErrors.nonField = Array.isArray(data.non_field_errors)
                        ? data.non_field_errors.join(" ")
                        : String(data.non_field_errors);
                }
                if (data.detail) {
                    newErrors.nonField = String(data.detail);
                }
            }

            setErrors(newErrors);
            console.log(err);
            console.log(data);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>{name}</h1>

            {errors.nonField && (
                <div style={{ color: "red" }}>{errors.nonField}</div>
            )}

            <input
                required
                type="text"
                value={username}
                placeholder="Username"
                onChange={(e) => {
                    setUsername(e.target.value);
                    // if (errors.username) setErrors(prev => ({ ...prev, username: "" }));
                }}
            />
            {errors.username && (
                <div style={{ color: "red" }}>{errors.username}</div>
            )}

            <input
                required
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => {
                    setPassword(e.target.value);
                    // if (errors.password) setErrors(prev => ({ ...prev, password: "" }));
                }}
            />
            {errors.password && (
                <div style={{ color: "red" }}>{errors.password}</div>
            )}

            <button disabled={loading || !username || !password} type="submit">
                {loading ? "Loading ..." : name}
            </button>
        </form>
    );
}

export default Form;
