import { APIResponseDTO, UserDTO } from "../library/DTOs";
import { APIHandler } from "../library/utils";

export class AuthService {
    static async login(loginDTO: UserDTO): Promise<APIResponseDTO> {
        const endpoint = 'auth/login';
        try {
            const response = await APIHandler.request<any>(
                endpoint,
                'POST',
                loginDTO
            );

            return response;
        } catch (error) {
            throw error;
        }
    }

    static async signup(newUserData: UserDTO): Promise<APIResponseDTO> {
        const endpoint = 'auth/signup';
        try {
            const response = await APIHandler.request<any>(
                endpoint,
                'POST',
                newUserData
            );

            return response;
        } catch(error) {
            throw error;
        }
    }
}