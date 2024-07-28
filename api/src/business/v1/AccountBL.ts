import { AccountDTO } from "../../library/DTOs";
import { ReturnCodes } from "../../library/enums";
import { LogicResult } from "../../library/interfaces";

export class AccountBL {
	static create = async (accountDTO: AccountDTO): Promise<LogicResult<{ newAccount: AccountDTO }>> => {
		try {
			return { code: ReturnCodes.Success, data: null }
		} catch(error:any) {
			return { code: ReturnCodes.UnexpectedError, data: null }
		}
	}
}