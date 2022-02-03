import React, { HTMLAttributes } from 'react';
import style from './Button.module.scss';

interface ButtonPageProps extends HTMLAttributes<HTMLButtonElement> {
  text: String;
  clickFn: any;
  disabledFn?: any;
  color?: 'white' | 'black' | 'gray' | 'gray.primary' | 'dark-gray';
  type?: 'submit' | 'button';
  variant?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonPageProps> = ({
  text,
  clickFn,
  color = 'black',
  disabledFn = false,
  type = 'button',
  variant = 'md',
  ...rest
}) => {
  let classButton;
  switch (color) {
    case 'white':
      classButton = `${style.buttonWhite} ${style[variant]}`;
      break;
    case 'black':
      classButton = `${style.buttonBlack} ${style[variant]}`;
      break;
    case 'gray':
      classButton = `${style.buttonGray} ${style[variant]}`;
      break;
    case 'dark-gray':
      classButton = `${style.buttonDarkGray} ${style[variant]}`;
      break;
    case 'gray.primary':
      classButton = `${style.buttonGrayPrimary} ${style[variant]}`;
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

export default Button;
