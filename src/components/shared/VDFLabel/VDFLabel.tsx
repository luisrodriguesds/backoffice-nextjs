import React from 'react';
import { InputLabel } from '@mui/material';

import infoIcon from '../../../../public/icons/info-circle-system.svg';

import Style from './VDFLabel.module.scss';

interface VDFLabelProps {
  text: string;
  hasInfo?: boolean;
  infoText?: string;
}

const VDFLabel = (props: VDFLabelProps) => {
  const [displayInfo, setDisplayInfo] = React.useState<boolean>(false);

  return (
    <div className={Style.labelContainer}>
      <InputLabel children={props.text} classes={{ root: Style.label }} />
      {props.hasInfo && (
        <div className={Style.infoContainer}>
          <img src={infoIcon} onMouseOver={() => setDisplayInfo(true)} onMouseOut={() => setDisplayInfo(false)} />
          {displayInfo && <p>{props.infoText}</p>}
        </div>
      )}
    </div>
  );
};

export default VDFLabel;
