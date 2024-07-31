import { ReactNode } from "react";
import { ButtonTypeEnums, ButtonStyleEnums } from "../enums";

export type ButtonDTO = {
    title?: string;
    icon?: ReactNode;
    type?: ButtonTypeEnums;
    style?: ButtonStyleEnums;
    onClick: () => void;
};