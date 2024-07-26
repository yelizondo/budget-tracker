import { APIResponseDTO, UserDTO } from "../library/DTOs";
import { HTTPRequestEnums } from "../library/enums";
import { APIHandler } from "../library/utils";

export class UserService {
    static async getUser(userDTO: UserDTO): Promise<APIResponseDTO> {
        const endpoint = `users/${userDTO.UserId}`;
        try {
            const response = await APIHandler.request<any>(
                endpoint,
                HTTPRequestEnums.GET
            );

            return response;
        } catch (error) {
            throw error;
        }
    }
}