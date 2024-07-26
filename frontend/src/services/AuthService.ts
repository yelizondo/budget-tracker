import { UserDTO } from "../library/DTOs";
import { APIHandler } from "../library/utils";

export class AuthService {
    static async login(loginDTO: UserDTO) {
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
}