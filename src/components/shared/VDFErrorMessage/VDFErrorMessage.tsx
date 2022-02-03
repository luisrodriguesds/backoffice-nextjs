import React from 'react';
import style from './VDFErrorMessage.module.scss';
import warningIcon from '../../../../public/icons/warning_notification.png'

interface VDFErrorMessageProps {
 errorMessage:string;
}

const VDFErrorMessage: React.FC<VDFErrorMessageProps> = ( props ) => {
 
  return (
    <div className={style.errorDiv}>
      <img src={warningIcon} />
      <span className={style.errorMessage}>{props.errorMessage}</span>
    </div>
  );
};

export default VDFErrorMessage;
