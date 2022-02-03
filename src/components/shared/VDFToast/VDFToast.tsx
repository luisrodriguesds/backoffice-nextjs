import React from 'react';
import TickSmall from '../../../../public/icons/tick_small.png';
import closeIcon from '../../../../public/icons/close-system.svg';
import warningIcon from '../../../../public/icons/warning-system.svg';

import style from './VDFToast.module.scss';

type VDFToastProps = {
  text: string;
  closeButton?: boolean;
  onClose?: Function;
  type: 'success' | 'error' | 'error-big';
};

const VDFToast: React.FC<VDFToastProps> = (props: VDFToastProps) => {
  const [config, setConfig] = React.useState({
    containerStyle: '',
    icon: '',
    iconStyle: '',
  });
  React.useEffect(() => {
    switch (props.type) {
      case 'success':
        setConfig({
          containerStyle: style.successContainer,
          icon: TickSmall,
          iconStyle: style.image,
        });
        break;
      case 'error':
        setConfig({
          containerStyle: style.errorContainer,
          icon: warningIcon,
          iconStyle: style.errorIcon,
        });

        break;
      case 'error-big':
        setConfig({
          containerStyle: style.errorContainerBig,
          icon: warningIcon,
          iconStyle: style.errorIcon,
        });

        break;
    }
  }, []);

  return (
    <div className={config.containerStyle}>
      <img className={config.iconStyle} src={config.icon} />
      <h3 className={style.text}>{props.text}</h3>
      {props.closeButton && (
        <img
          className={style.closeButton}
          src={closeIcon}
          onClick={() => {
            if (props.onClose) props.onClose();
          }}
          title='close'
        />
      )}
    </div>
  );
};

export default VDFToast;
