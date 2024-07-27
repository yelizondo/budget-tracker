import React, { ReactNode, useContext, useState} from "react";
import { AlertPopupContext } from './AlertPopupContext';
import { AlertPopupContextDTO, ButtonDTO } from "../../library/DTOs";
import { ButtonStyleEnums } from "../../library/enums";

export const AlertPopupContextProvider: React.FC<{ children: ReactNode}> = ({ children }) => {

    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [options, setOptions] = useState<Array<ButtonDTO>>([]);

    const showAlertPopup = (
        title: string,
        description: string,
        options:Array<ButtonDTO> = []
    ): void => {
        options.unshift({
            title: 'CANCEL',
            onClick: () => {},
            style: ButtonStyleEnums.Warn
        });

        setShowPopup(true);
        setTitle(title);
        setDescription(description);
        setOptions(options);
    };

    const contextValues: AlertPopupContextDTO = {
        showPopup,
        setShowPopup,
        showAlertPopup,
        title,
        description,
        options
    };

    return (
        <AlertPopupContext.Provider value={contextValues}>
            {children}
        </AlertPopupContext.Provider>
    );
};

export const useAlertPopupContext = () => useContext(AlertPopupContext);