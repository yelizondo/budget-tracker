import { ControllerRoute } from "../../../library/interfaces";
import { createAccount } from "./handlers/createAccount";
import { getBudgetAccounts } from "./handlers/getBudgetAccounts";

export class AccountController {
    static createAccount: ControllerRoute = createAccount;
    static getBudgetAccounts: ControllerRoute = getBudgetAccounts;
}