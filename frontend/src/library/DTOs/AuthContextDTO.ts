import { LocalStorageSessionDTO, UserDTO } from ".";

export type AuthContextDTO = {
    user: UserDTO;
    login: (loginData: UserDTO) => Promise<any>;
    signup: (newUserData: UserDTO) => Promise<any>;
    logout: () => void;
    fetchUser: (session: LocalStorageSessionDTO) => Promise<boolean>;
};