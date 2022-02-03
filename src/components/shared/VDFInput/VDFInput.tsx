import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { OutlinedInput } from '@mui/material';
import style from './VDFInput.module.scss';
import VDFErrorMessage from '../VDFErrorMessage/VDFErrorMessage';

interface VDFInputProps {
  title?: string;
  label: string;
  nameInput: string;
  onChange: any;
  hasValidation?: boolean;
  showErrorMessage?: any;
  errorMessage?: string;
  value: any;
  top?: boolean;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

const VDFInput: React.FC<VDFInputProps> = ({
  title,
  label,
  nameInput,
  onChange,
  value,
  top = false,
  hasValidation = false,
  showErrorMessage,
  errorMessage,
  disabled = false,
  className,
  placeholder,
  ...rest
}) => {
  useEffect(() => {}, []);
  return (
    <div className={`${!top ? style.inputContainerTop : style.inputContainerLeft} ${className} ${style.title}`}>
      {title && <label className={!top ? style.inputTitleTop : style.inputTitleLeft}>{title}</label>}
      <OutlinedInput
        id={nameInput}
        name={nameInput}
        className={style.inputBox}
        label={label ? label : undefined}
        size='small'
        onChange={onChange}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        // value={value}
        {...rest}
      />
      {hasValidation && showErrorMessage && <VDFErrorMessage errorMessage={errorMessage ? errorMessage : ''} />}
    </div>
  );
};

export default VDFInput;
