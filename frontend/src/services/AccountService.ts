import { APIResponseDTO, BudgetDTO } from "../library/DTOs";
import { APIHandler } from "../library/utils";

export class AccountService {
    static async getBudgetAccounts(budgetDTO: BudgetDTO): Promise<APIResponseDTO> {
        const endpoint = 'account/budgetAccounts';
        try {
            const response = await APIHandler.request<any>(
                endpoint,
                'GET',
                budgetDTO,
                true
            );

            return response;
        } catch (error) {
            throw error;
        }
    }
}