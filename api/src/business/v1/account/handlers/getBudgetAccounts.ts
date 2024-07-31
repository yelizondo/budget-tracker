import { AccountDTO, BudgetDTO } from "../../../../library/DTOs";
import { ReturnCodes } from "../../../../library/enums";
import { LogicResult } from "../../../../library/interfaces";
import prisma from "../../../../library/utils/prisma";

export async function getBudgetAccounts(budgetDTO: BudgetDTO): Promise<LogicResult<AccountDTO[]>> {
    try {
        const budget = await prisma.budget.findUnique({
            select: {
                Accounts: true
            },
            where: { BudgetId: budgetDTO.BudgetId }
        }); 

        const accounts: AccountDTO[] = budget?.Accounts.map(accountAssignment => ({
            AccountId: accountAssignment.AccountId,
            BudgetId: accountAssignment.BudgetId,
            Name: accountAssignment.Name,
            Balance: accountAssignment.Balance,
            IsActive: accountAssignment.IsActive,
            IsDeleted: accountAssignment.IsDeleted,
            CreatedAt: accountAssignment.CreatedAt,
            UpdatedAt: accountAssignment.UpdatedAt,
        })) || [];

        return { code: ReturnCodes.Success, data: accounts } 
    } catch (error:any) {
        return { code: ReturnCodes.UnexpectedError, data: null } 
    }
}