import React, { ReactNode, useContext, useState} from "react";
import { AuthContext } from './AuthContext';
import { APIResponseDTO, AuthContextDTO, LocalStorageSessionDTO, UserDTO } from "../../library/DTOs";
import { AuthService, UserService } from "../../services";
import { LocalStorageHandler } from "../../library/utils";
import { useNavigate } from "react-router-dom";

export const AuthContextProvider: React.FC<{ children: ReactNode}> = ({ children }) => {

    const [user, setUser] = useState<UserDTO>({});
    const navigate = useNavigate();

    //#region Login
    const login = (loginData: UserDTO): Promise<any> => {
        return AuthService.login(loginData)
        .then(result => {
            if (result?.result?.user && result?.result?.token) {

                setUser(result.result.user);

                LocalStorageHandler.setUserSession(result.result.user, result.result.token);

                navigate('/');

                return Promise.resolve({
                    message: result?.message
                });
            }
            return Promise.reject({
                message: 'Error inesperado. Contacte Oficinas'
            });
        });
    };
    //#endregion

    //#region Logout
    const logout = () => {
        LocalStorageHandler.clearUserSession();
        setUser({});
        navigate('/auth/login', { replace: true});
    };
    //#endregion

    //#region Fetch User
    const fetchUser = (session: LocalStorageSessionDTO): Promise<boolean> => {
        return UserService.getUser(session.user)
        .then((result:APIResponseDTO) => {
            if (!result) {
                return Promise.reject(false);
            }

            setUser(result.result);

            return Promise.resolve(true);
        });
    };
    //#endregion

    const contextValues: AuthContextDTO = {
        user,
        login,
        logout,
        fetchUser
    };

    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);