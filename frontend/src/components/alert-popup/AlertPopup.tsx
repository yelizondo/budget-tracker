import React, { useState } from "react";

import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter
} from 'tw-elements-react';

import { X } from 'lucide-react';

import { useAlertPopupContext } from "../../contexts";
import { AlertPopupContextDTO, ButtonDTO } from "../../library/DTOs";
import { Button } from "../";
import { ButtonStyleEnums } from "../../library/enums";

export const AlertPopup: React.FC<{}> = ({}) => {
    const context = useAlertPopupContext();
    const { showPopup, setShowPopup, title, description, options } = context as AlertPopupContextDTO;

    return <div>
      <TEModal show={showPopup} setShow={setShowPopup}>
        <TEModalDialog>
          <TEModalContent>
            <TEModalHeader>
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                {title}
              </h5>
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setShowPopup(false)}
                aria-label="Close"
              >
                <X />
              </button>
            </TEModalHeader>
            <TEModalBody>{description}</TEModalBody>
            <TEModalFooter
              className="py-1"
            >
              {
                options.map((button:ButtonDTO) => (
                  <Button
                    key={button.title}
                    title={button.title}
                    onClick={ () => { button.onClick(); setShowPopup(false); }}
                    style={ button.style }
                  />
              ))}
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>;
}