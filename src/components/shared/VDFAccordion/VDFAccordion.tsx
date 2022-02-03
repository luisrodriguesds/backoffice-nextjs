import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import style from './VDFAccordion.module.scss';
interface accordion {
  top: any;
  details: any;
  expanded?: boolean;
  onClick?: () => void;
}

const VDFAccordion: React.FC<accordion> = (props) => {
  return (
    <Accordion className={style.accordion} expanded={props.expanded} onClick={() => props.onClick && props.onClick()}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id={Math.random().toString()}>
        {props.top}
      </AccordionSummary>
      <AccordionDetails>{props.details}</AccordionDetails>
    </Accordion>
  );
};

export default VDFAccordion;
