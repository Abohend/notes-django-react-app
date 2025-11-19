import Form from "../components/Form";
import { LOGIN_FORM } from "../constants.js";

function Login() {
    return <Form route="/api/token" method={LOGIN_FORM} />;
}

export default Login;
