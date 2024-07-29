import { FieldValidationError, checkSchema, validationResult } from 'express-validator';
import { ControllerRoute } from "../../../../library/interfaces/ControllerRoute";
import { NextFunction, Request, Response } from 'express';
import { APIResponse, LogicResult } from '../../../../library/interfaces';
import { ReturnCodes } from '../../../../library/enums';
import { getErrorMessage } from '../../../../library/utils';
import { AuthBL } from '../../../../business/v1';
import { UserDTO } from '../../../../library/DTOs';

export const login: ControllerRoute = {
        validation: checkSchema({
            Email: {
                in: ['body'],
                normalizeEmail: true,
                isEmail: {
                    bail: true
                }
            },
            Password: {
                in: ['body'],
                notEmpty: {
                    bail: true
                },
            }
        }),

        action: async (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                const validationErrors: FieldValidationError[] = errors.array() as FieldValidationError[];
                const errorMessage = validationErrors.map(error => `[ ${error.path} : ${error.msg} <${error.value}> ]`).join(', ');

                console.error(`Validation error: ${errorMessage}`);

                const apiResponse: APIResponse = {
                    code: ReturnCodes.UnexpectedError,
                    message: 'Unexpected Error',
                    result: errorMessage
                };

                return res.status(400).json(apiResponse);
            }

            try {
                const logicResult:
                    LogicResult<{ user: UserDTO, token: string, expiresIn: number }> = await AuthBL.login(req.body);

                if (logicResult.code != ReturnCodes.Success) {
                    const apiResponse: APIResponse = {
                        code: logicResult.code,
                        message: getErrorMessage(logicResult.code),
                        result: logicResult.data
                    };

                    const statusCode =
                        logicResult.code == ReturnCodes.InvalidUserEmail || logicResult.code == ReturnCodes.InvalidUserPassword
                        ? 400 : 500;

                    return res.status(statusCode).json(apiResponse);
                }

                const apiResponse: APIResponse = {
                    code: logicResult.code,
                    message: getErrorMessage(logicResult.code),
                    result: logicResult.data
                };

                return res.status(200).json(apiResponse);
            } catch (error: any) {
                const apiResponse: APIResponse = {
                    code: ReturnCodes.UnexpectedError,
                    message: getErrorMessage(ReturnCodes.UnexpectedError),
                    result: error 
                };
                
                console.error(`[Login] ${error.toString()}`);

                return res.status(500).json(apiResponse);
            }
        }
    }
