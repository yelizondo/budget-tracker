import { LocalStorageSessionDTO, UserDTO } from "../DTOs";
import { LocalStorageEnums } from "../enums";

export class LocalStorageHandler {
    static setUserSession (user: UserDTO, token: string) {
        const session: LocalStorageSessionDTO = {
            user: { UserId: user.UserId },
            token
        };
        localStorage.setItem(LocalStorageEnums.SESSION, JSON.stringify(session));
    };

    static getUserSession (): LocalStorageSessionDTO {
        const rawSession = localStorage.getItem(LocalStorageEnums.SESSION);
        if (!rawSession) {
            return { user: {}, token: '' };
        }
        const userSession = JSON.parse(rawSession);

        return {
            user: userSession.user,
            token: userSession.token
        };
    };

    static clearUserSession = (): void => {
        localStorage.removeItem(LocalStorageEnums.SESSION);
    }
}