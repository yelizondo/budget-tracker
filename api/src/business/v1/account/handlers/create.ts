import { Decimal } from "@prisma/client/runtime/library";
import { AccountDTO, BudgetDTO } from "../../../../library/DTOs";
import { ReturnCodes } from "../../../../library/enums";
import { LogicResult } from "../../../../library/interfaces";
import prisma from "../../../../library/utils/prisma";

export async function create(accountDTO: AccountDTO): Promise<LogicResult<AccountDTO>> {
    try {
        // Check if account type exists
        const accountType = await prisma.accountType.findUnique({
            where: { AccountTypeId: accountDTO.AccountTypeId }
        });

        if (!accountType) {
            return { code: ReturnCodes.AccountsAccountTypeIdNotFound, data: null }
        }

        // Check if budget exists
        const budget = await prisma.budget.findUnique({
            where: { BudgetId: accountDTO.BudgetId }
        });

        if (!budget) {
            return { code: ReturnCodes.AccountsBudgetIdNotFound, data: null }
        }

        // Create new account
        const newAccount = await prisma.account.create({
            data: {
                Name: accountDTO.Name as string,
                Balance: accountDTO.Balance as Decimal,
                AccountTypeId: accountDTO.AccountTypeId as number,
                BudgetId: accountDTO.BudgetId as number,
                IsActive: true,
                IsDeleted: false
            }
        });
        //TODO: If if has balances > 0, then assign it to ReadyToAssign

        return {
            code: ReturnCodes.Success,
            data: { ...newAccount}
        }
    } catch(error:any) {
        return { code: ReturnCodes.UnexpectedError, data: null }
    }
}