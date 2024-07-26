import React from "react";
import { useSpinnerContext } from "../contexts";
import { SpinnerContextDTO } from "../library/DTOs";

export const Spinner: React.FC<{}> = ({}) => {
    const spinnerContext = useSpinnerContext();
    const { showSpinner } = spinnerContext as SpinnerContextDTO;
    return (
      <>
        { showSpinner ? (
          <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen z-50">
            {/* Overlay with a semi-transparent background */}
            <div className="fixed inset-0 bg-black opacity-0"></div>
            
            {/* Centered spinner */}
            <div className="relative">
              <div
                className={`
                  inline-block h-12 w-12 animate-[spinner-grow_0.75s_linear_infinite]
                  rounded-full bg-current align-[-0.125em] opacity-0 text-gc-secondary
                  motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]
                `}
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            </div>
          </div>
        ): (<></>)}
      </>
    );
  };