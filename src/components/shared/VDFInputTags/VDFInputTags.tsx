import React, { useState } from 'react';
import { Chip, InputLabel, TextField } from '@mui/material';
import { Close } from '@material-ui/icons';
import Autocomplete from '@mui/material/Autocomplete';
import FormStyle from './VDFInputTags.module.scss';
import infoIcon from '../../../../public/icons/info-gray.svg';
import VDFErrorMessage from '../VDFErrorMessage/VDFErrorMessage';

interface VDFInputTagsProps {
  title?: string;
  options: any;
  value: any;
  loading?: any;
  onChangeFunc: any;
  getAvailableTags?: any;
  getOptionLabelFunc: any;
  hasInfo: boolean;
  infoText?: string;
  deleteSelectedValue?: Function;
  disabled?: boolean;
  showErrorMessage?: boolean;
  errorMessage?: string;
  chipLabel?: string;
  placeholder?: string;
  noOptionsText?: string;
}

const VDFInputTags: React.FC<VDFInputTagsProps> = ({
  title,
  options,
  loading,
  value,
  onChangeFunc,
  getAvailableTags,
  getOptionLabelFunc,
  hasInfo,
  infoText,
  deleteSelectedValue,
  disabled = false,
  showErrorMessage = false,
  errorMessage = '',
  chipLabel,
  placeholder = '',
  noOptionsText = '',
}) => {
  const [displayAppInfo, setDisplayAppInfo] = useState(false);

  return (
    <div accessKey='inputTags'>
      <div className={FormStyle.top} tabIndex={0}>
        <InputLabel children={title} className={FormStyle.title} />
        {hasInfo && (
          <div className={FormStyle.appInfo}>
            <img
              src={infoIcon}
              onMouseOver={() => setDisplayAppInfo(true)}
              onMouseOut={() => setDisplayAppInfo(false)}
            />
            {displayAppInfo && <p>{infoText}</p>}
          </div>
        )}
      </div>
      <Autocomplete
        className={FormStyle.autocomplete}
        multiple
        disableClearable
        options={options}
        loading={loading}
        getOptionLabel={getOptionLabelFunc}
        getOptionSelected={(option, value) => option?.id === value?.id}
        value={value}
        onChange={onChangeFunc}
        disabled={disabled}
        noOptionsText={noOptionsText || 'No options'}
        renderInput={(params) => (
          <TextField
            {...params}
            id='autocompleteTextField'
            placeholder={value.length ? '' : placeholder}
            variant='outlined'
            onClick={() => getAvailableTags()}
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              classes={{ root: FormStyle.chip }}
              deleteIcon={<Close />}
              // disabled={disabled}
              label={getOptionLabelFunc(option)}
              {...getTagProps({ index })}
            />
          ))
        }
      />
      {showErrorMessage && <VDFErrorMessage errorMessage={errorMessage}></VDFErrorMessage>}
    </div>
  );
};

export default VDFInputTags;
