import { create } from "./handlers/create";
import { getBudgetAccounts } from "./handlers/getBudgetAccounts";

export class AccountBL {
	static create = create;
	static getBudgetAccounts = getBudgetAccounts;
}