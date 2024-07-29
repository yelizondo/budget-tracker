import { ControllerRoute } from "../../../library/interfaces";
import { createAccount } from "./handlers/createAccount";

export class AccountController {
    static createAccount: ControllerRoute = createAccount;
}