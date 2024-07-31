import { createUserBudget } from "./handlers/createUserBudget";
import { getUserBudgets } from "./handlers/getUserBudgets";
import { updateBudget } from "./handlers/updateBudget";

export class BudgetBL {
	static createUserBudget = createUserBudget;
	static getUserBudgets = getUserBudgets;
	static updateBudget = updateBudget
}