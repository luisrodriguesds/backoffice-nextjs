import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React from 'react';

type VDFCheckboxProps = {
    label: string;
    checked:boolean,
    handleFieldChange: Function,
}

const VDFCheckbox: React.FC<VDFCheckboxProps> = ({label, checked, handleFieldChange}) => {
    

    return (
      <FormGroup>
      <FormControlLabel
        key={Math.random()}
        control={
          <Checkbox
            style={{ color: '#428600' }}
            checked={checked}
            onClick={() => {
              handleFieldChange(!checked);
            }}
          />
        }
        label={label}
      />
    </FormGroup>
    );
};

export default VDFCheckbox;
