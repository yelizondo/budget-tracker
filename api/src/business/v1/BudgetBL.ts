import { AccountDTO, BudgetDTO, UserDTO } from "../../library/DTOs";
import { ReturnCodes } from "../../library/enums";
import { LogicResult } from "../../library/interfaces";
import prisma from "../../library/utils/prisma";

export class BudgetBL {
	static createUserBudget = async (budgetDTO: BudgetDTO, userDTO: UserDTO): Promise<LogicResult<{ newBudget: BudgetDTO }>> => {
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

	static getUserBudgets = async (userDTO: UserDTO): Promise<LogicResult<BudgetDTO[]>> => {
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

	static updateBudget = async (budgetDTO: BudgetDTO): Promise<LogicResult<BudgetDTO>> => {
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
}