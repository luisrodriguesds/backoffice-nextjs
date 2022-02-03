import React, { HTMLAttributes } from 'react';
import style from './ButtonBold.module.scss';

interface ButtonPageProps extends HTMLAttributes<HTMLButtonElement> {
  text: String;
  clickFn: any;
  disabledFn?: any;
  color?: 'white' | 'black' | 'gray' | 'gray.primary' | 'dark-gray' | 'white-outlined';
  type?: 'submit' | 'button';
}

const ButtonBold: React.FC<ButtonPageProps> = ({
  text,
  clickFn,
  color = 'black',
  disabledFn = false,
  type = 'button',
  ...rest
}) => {
  let classButton;
  switch (color) {
    case 'white':
      classButton = style.buttonWhite;
      break;
    case 'black':
      classButton = style.buttonBlack;
      break;
    case 'gray':
      classButton = style.buttonGray;
      break;
    case 'dark-gray':
      classButton = style.buttonDarkGray;
      break;
    case 'gray.primary':
      classButton = style.buttonGrayPrimary;
      break;
    case 'white-outlined':
      classButton = style.buttonWhiteOutlined;
      break;
  }

  return (
    <div className={style.container}>
      <button type={type} onClick={clickFn} disabled={disabledFn} className={classButton} {...rest}>
        {text}
      </button>
    </div>
  );
};

export default ButtonBold;
