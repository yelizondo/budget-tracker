import { Decimal } from "@prisma/client/runtime/library";

export interface AccountDTO {
    AccountId?: number;
    AccountTypeId?: number;
    BudgetId?: number;
    Name?: string;
    Balance?: Decimal;
    IsActive?: Boolean;
    IsDeleted?: Boolean;
    CreateAt?: Date;
    UpdatedAt?: Date;
}