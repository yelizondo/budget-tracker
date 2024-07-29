import { BudgetDTO } from "../../../../library/DTOs";
import { ReturnCodes } from "../../../../library/enums";
import { LogicResult } from "../../../../library/interfaces";
import prisma from "../../../../library/utils/prisma";

export async function updateBudget(budgetDTO: BudgetDTO): Promise<LogicResult<BudgetDTO>> {
    try {
        const updatedBudget = await prisma.budget.update({
            where: {
                BudgetId: budgetDTO.BudgetId as number
            },
            data: {
                Name: budgetDTO.Name,
                UpdatedAt: new Date()
            }
        });

        return {
            code: ReturnCodes.Success, data: {
                BudgetId: updatedBudget.BudgetId,
                Name: updatedBudget.Name,
                CreateAt: updatedBudget.CreatedAt,
                UpdatedAt: updatedBudget.UpdatedAt
            }
        }
    } catch (error:any) {
        return { code: ReturnCodes.UnexpectedError, data: null }
    }
}