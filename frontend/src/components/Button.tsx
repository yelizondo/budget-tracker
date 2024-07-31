import React from 'react';
import { ButtonDTO } from '../library/DTOs';
import { TERipple } from 'tw-elements-react';
import { ButtonStyleEnums, ButtonTypeEnums } from '../library/enums';

export const Button: React.FC<ButtonDTO> = ({
  title,
  icon,
  type = ButtonTypeEnums.Button,
  style = ButtonStyleEnums.Default,
  onClick
}) => {
  const defaultStyle = `
    inline-block rounded-full text-xs font-normal uppercase leading-normal
    transition duration-150 ease-in-out px-4 pb-1 pt-1 text-grey-600
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
        {icon}{title}
      </button>
    </TERipple>
  </>;
};