import { BudgetDTO, UserDTO } from "../../../../library/DTOs";
import { ReturnCodes } from "../../../../library/enums";
import { LogicResult } from "../../../../library/interfaces";
import prisma from "../../../../library/utils/prisma";


export async function getUserBudgets(userDTO: UserDTO): Promise<LogicResult<BudgetDTO[]>> {
    try {

        const user = await prisma.user.findUnique({
            select: {
                Budgets: {
                    select: {
                        Budget: true
                    }
                }
            },
            where: { UserId: userDTO.UserId }
        });

        const budgets: BudgetDTO[] = user?.Budgets.map(budgetAssignment => ({
            BudgetId: budgetAssignment.Budget.BudgetId,
            Name: budgetAssignment.Budget.Name,
            CreatedAt: budgetAssignment.Budget.CreatedAt,
            UpdatedAt: budgetAssignment.Budget.UpdatedAt,
        })) || [];

        return { code: ReturnCodes.Success, data: budgets }
    } catch (error: any) {
        return { code: ReturnCodes.UnexpectedError, data: null }
    }
}