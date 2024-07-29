import { ControllerRoute } from "../../../library/interfaces/ControllerRoute";
import { createUserBudget } from "./handlers/createUserBudget";
import { getUserBudgets } from "./handlers/getUserBudgets";
import { updateBudget } from "./handlers/updateBudget";

export class BudgetController {
    static createUserBudget: ControllerRoute = createUserBudget;
    static getUserBudgets: ControllerRoute = getUserBudgets;
    static updateBudget: ControllerRoute = updateBudget;
}