import React, { ReactNode, useContext, useState} from "react";
import { SpinnerContext } from './SpinnerContext';
import { SpinnerContextDTO } from "../../library/DTOs";

export const SpinnerContextProvider: React.FC<{ children: ReactNode}> = ({ children }) => {

    const [ showSpinner, setShowSpinner] = useState<boolean>(false);

    const contextValues: SpinnerContextDTO = {
        showSpinner,
        setShowSpinner
    };

    return (
        <SpinnerContext.Provider value={contextValues}>
            {children}
        </SpinnerContext.Provider>
    );
};

export const useSpinnerContext = () => useContext(SpinnerContext);