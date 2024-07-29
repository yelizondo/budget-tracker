import { AccountController } from "./accounts/AccountController";
import { AuthController } from "./auth/AuthController";
import { BudgetController } from "./budget/BudgetController";

export class ControllersV1 {
    static AccountController = AccountController;
    static AuthController = AuthController;
    static BudgetController = BudgetController;
}