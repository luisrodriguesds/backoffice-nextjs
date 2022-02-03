import React from 'react';

import { v4 as uuidv4 } from 'uuid';

import { InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';

import style from './VDFSelect.module.scss';

interface VDFSelectProps {
  options: {
    value: string;
    label: string;
  }[];
  value: any;
  handleChange: Function;
  width?: string;
  label?: string;
  styleId?: string;
}

const VDFSelect = (props: VDFSelectProps) => {
  return (
    <>
      {props.label ? <InputLabel children={props.label} className={style.title} /> : ''}
      <Select
        data-testid='selectInput'
        value={props.value}
        input={<OutlinedInput margin='dense' />}
        onChange={(e) => props.handleChange(e)}
        variant='outlined'
        accessKey='select'
        className={style.formSelect}
        style={{ width: props.width ? props.width : '100%' }}>
        {props.options.map((option) => (
          <MenuItem value={option.value} key={uuidv4()}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default VDFSelect;
