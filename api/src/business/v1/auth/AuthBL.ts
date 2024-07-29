import { UserDTO } from "../../../library/DTOs";
import { PermissionActionsEnum, ReturnCodes } from "../../../library/enums";
import { GenerateTokenResult, LogicResult, TokenPayload } from "../../../library/interfaces";
import { generateToken } from "../../../library/utils";
import prisma from "../../../library/utils/prisma";
import bcrypt from 'bcryptjs';

export class AuthBL {
    static signup = async (userDTO: UserDTO) : Promise<LogicResult<{ newUser: UserDTO }>> => {
        try {
            const existingUser = await prisma.user.findUnique({
                where: { Email: userDTO.Email }
            });

            if (existingUser) {
                return { code: ReturnCodes.UserEmailAlreadyExists, data: null };
            }

            // Hash user password
            const hashedPassword = await bcrypt.hash(userDTO.Password as string, 10);

            const newUser = await prisma.user.create({
                data: {
                    Name: userDTO.Name as string,
                    Email: userDTO.Email as string,
                    Password: hashedPassword
                }
            });

            const newUserDTO: UserDTO = {
                UserId: newUser.UserId,
                Name: newUser.Name,
                Email: newUser.Email,
            }

            return {
                code: ReturnCodes.Success,
                data: {
                    newUser: newUserDTO
                }
            }
        } catch (error: any) {
            return { code: ReturnCodes.UnexpectedError, data: null}
        }
    }

    static login = async (userDTO: UserDTO): Promise<LogicResult<{ user:UserDTO, token: string, expiresIn: number}>> => {
        try {
            const user = await prisma.user.findUnique({
                where: { Email: userDTO.Email }
            })

            if (!user) {
                return {
                    code: ReturnCodes.InvalidUserEmail,
                    data: null
                }
            }

            const isPasswordEqual = await bcrypt.compare(userDTO.Password as string, user.Password);

            if (!isPasswordEqual) {
                return {
                    code: ReturnCodes.InvalidUserPassword,
                    data: null
                }
            }

            const userAccessTypes: string[] = [
                PermissionActionsEnum.Read,
                PermissionActionsEnum.Write,
                PermissionActionsEnum.Update,
                PermissionActionsEnum.Delete
            ];

            // gen token
            const token: GenerateTokenResult = generateToken({
                userId: user.UserId,
                name: user.Name,
                accessTypes: userAccessTypes
            } as TokenPayload);

            const fetchedUserDTO: UserDTO = user;
            delete fetchedUserDTO.Password;

            return {
                code: ReturnCodes.Success,
                data: {
                    user: fetchedUserDTO,
                    token: token.token,
                    expiresIn: token.exp
                }
            }

        } catch (error:any) {
            console.error(error);
            return {
                code: ReturnCodes.UnexpectedError,
                data: null
            }
        }
    }
}