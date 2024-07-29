import { ControllerRoute } from "../../../library/interfaces";
import { login } from "./handlers/login";
import { signup } from "./handlers/signup";

export class AuthController {
    static signup: ControllerRoute = signup;
    static login: ControllerRoute = login;
}