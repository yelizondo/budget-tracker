import { ButtonTypeEnums, ButtonStyleEnums } from "../enums";

export type ButtonDTO = {
    title: string;
    type?: ButtonTypeEnums;
    style?: ButtonStyleEnums;
    onClick: () => void;
};