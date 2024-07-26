import { ButtonDTO } from "./ButtonDTO";

export type AlertPopupContextDTO = {
    showPopup: boolean;
    setShowPopup: (showPopup: boolean) => void;
    showAlertPopup: (title: string, description: string, options:Array<ButtonDTO>) => void;
    title: string;
    description: string;
    options: Array<ButtonDTO>;
};