import { ReturnCodes } from "../enums";

export interface LogicResult<T> {
    data: T | null,
    code: ReturnCodes
}