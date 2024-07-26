import { UserDTO } from "./UserDTO";

export type LocalStorageSessionDTO = {
    user: UserDTO;
    token: string;
};