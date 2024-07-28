import { Decimal } from "@prisma/client/runtime/library";

export interface BudgetDTO {
    BudgetId?: number;
    Name?: string;
    CreateAt?: Date;
    UpdatedAt?: Date;
}