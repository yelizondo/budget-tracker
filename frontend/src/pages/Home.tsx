import React from "react";

import { useAlertPopupContext } from "../contexts";
import { AlertPopupContextDTO, ButtonDTO } from "../library/DTOs";
import { Button } from "../components";
import { ButtonStyleEnums, ButtonTypeEnums } from "../library/enums";

export function  Home () {
    const context = useAlertPopupContext();
    const { showAlertPopup } = context as AlertPopupContextDTO;
    return <>
      <Button
        title="Siguiente"
        onClick={() => showAlertPopup('hola','mundo', [
        ])}
        style={ButtonStyleEnums.Default}
        />
      <Button
        title="Cancelar"
        onClick={() => showAlertPopup('hola','mundo', [])}
        style={ButtonStyleEnums.Alert}
        />
      <Button
        title="Terminar"
        onClick={() => showAlertPopup('hola','mundo', [])}
        style={ButtonStyleEnums.Warn}
        />
    </>;
};