import React from 'react';

import { InputLabel } from '@material-ui/core';

import style from './VDFTextarea.module.scss';

interface VDFTextareaProps {
  value: any;
  handleChange: Function;
  label?: string;
}

const VDFTextarea = (props: VDFTextareaProps) => {
  return (
    <div className={style.container}>
      {props.label ? <InputLabel children={props.label} className={style.title} /> : ''}
      <textarea className={style.textarea} onChange={(e) => props.handleChange(e.target.value)}>
        {props.value}
      </textarea>
    </div>
  );
};

export default VDFTextarea;
