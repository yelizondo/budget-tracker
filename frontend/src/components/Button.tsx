import React from 'react';
import { ButtonDTO } from '../library/DTOs';
import { TERipple } from 'tw-elements-react';
import { ButtonStyleEnums, ButtonTypeEnums } from '../library/enums';

export const Button: React.FC<ButtonDTO> = ({
  title,
  type = ButtonTypeEnums.Button,
  style = ButtonStyleEnums.Default,
  onClick
}) => {
  const defaultStyle = `
    inline-block rounded text-xs font-medium uppercase leading-normal
    transition duration-150 ease-in-out px-6 pb-2 pt-2.5 text-grey-600
    mx-3 my-1
  `;
  const styles = {
    default: `${defaultStyle} bg-gc-secondary hover:bg-blue-400`,
    alert: `${defaultStyle} bg-gc-accent hover:bg-red-700`,
    warning: `${defaultStyle} bg-gc-warning hover:bg-orange-500`,
  }

  return <>
    <TERipple rippleColor="white">
      <button
        className={styles[style]}
        type={type}
        onClick={onClick}
      >
        {title}
      </button>
    </TERipple>
  </>;
};