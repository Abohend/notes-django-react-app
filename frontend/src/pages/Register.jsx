import Form from "../components/Form";
import { REGISTER_FORM } from "../constants";

function Register() {
    return <Form route={"/api/user/register"} method={REGISTER_FORM} />;
}

export default Register;
