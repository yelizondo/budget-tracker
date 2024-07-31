import React from "react";

import { useAlertPopupContext } from "../contexts";
import { AlertPopupContextDTO } from "../library/DTOs";
import { AccountOverview, Button } from "../components";
import { ButtonStyleEnums } from "../library/enums";

export function  Home () {
  const context = useAlertPopupContext();
  const { showAlertPopup } = context as AlertPopupContextDTO;

  return <>
    <div className="bg-gray-50">
      <div>
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
      </div>
      <AccountOverview />
    </div>
  </>;
};