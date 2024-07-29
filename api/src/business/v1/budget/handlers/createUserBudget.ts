import { BudgetDTO, UserDTO } from "../../../../library/DTOs";
import { ReturnCodes } from "../../../../library/enums";
import { LogicResult } from "../../../../library/interfaces";
import prisma from "../../../../library/utils/prisma";

export async function createUserBudget(budgetDTO: BudgetDTO, userDTO: UserDTO): Promise<LogicResult<{ newBudget: BudgetDTO }>> {
    try {
        const result = await prisma.$transaction( async (prisma) => {
            const newBudget = await prisma.budget.create({
                data: {
                    Name: budgetDTO.Name as string
                }
            });

            const newBudgetUserRelation = await prisma.budgetXUser.create({
                data: {
                    BudgetId: newBudget.BudgetId,
                    UserId: userDTO.UserId as number,
                    AssignedBy: userDTO.UserId?.toString() as string
                }
            });
            
            return { newBudget, newBudgetUserRelation };
        });

        return {
            code: ReturnCodes.Success,
            data: {
                newBudget: {...result.newBudget}
            }
        }

    } catch(error:any) {
        return { code: ReturnCodes.UnexpectedError, data: null }
    }
}