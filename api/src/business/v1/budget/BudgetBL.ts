import { AccountDTO, BudgetDTO, UserDTO } from "../../../library/DTOs";
import { ReturnCodes } from "../../../library/enums";
import { LogicResult } from "../../../library/interfaces";
import prisma from "../../../library/utils/prisma";
import { createUserBudget } from "./handlers/createUserBudget";
import { getUserBudgets } from "./handlers/getUserbudgets";
import { updateBudget } from "./handlers/updateBudget";

export class BudgetBL {
	static createUserBudget = createUserBudget;
	static getUserBudgets = getUserBudgets;
	static updateBudget = updateBudget
}