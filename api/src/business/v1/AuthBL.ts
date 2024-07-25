import { UserDTO } from "../../library/DTOs";
import { ReturnCodes } from "../../library/enums";
import { LogicResult } from "../../library/interfaces";
import prisma from "../../library/utils/prisma";
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
}