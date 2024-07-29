import { AccountBL } from "./account/AccountBL";
import { AuthBL } from "./auth/AuthBL";
import { BudgetBL } from "./budget/BudgetBL";

export class BusinessV1 {
    static AuthBL = AuthBL;
    static BudgetBL = BudgetBL;
    static AccountBL = AccountBL; 
}