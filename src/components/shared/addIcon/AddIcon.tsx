import { Button } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { default as ImageService } from 'sdk/functions/images-service/images-service';
import addIcon from '../../../../public/icons/plus-system.svg';
import csvIcon from '../../../../public/icons/csv.svg';
import closeBtnCircle from '../../../../public/icons/close-btn-circle.svg';
import bg from '../../../../public/images/mask.png';
import Dropzone from '../Dropzone/Dropdzone';
import VDFErrorMessage from '../VDFErrorMessage/VDFErrorMessage';
import Style from './AddIcon.module.scss';

interface AddIconProps {
  fileState?: File | undefined;
  handleImageChange: Function;
  displayIconErrorMessage?: string;
  showErrorMessage: boolean;
  icon?: any;
  buttonText?: string;
  changeButtonFc?: Function;
  url?: string;
  isMandatory?: 'csv' | 'image';
}

export default function AddIcon(props: AddIconProps) {
  const [preview, setPreview] = useState<string | null>(null);

  async function setupPreview(): Promise<void> {
    if (props.url) {
      setPreview(props.url);
    } else if (props.icon && fileType === 'image') {
      await ImageService.getImageViewUrl(props.icon.id)
        .then((res) => {
          setPreview(`api/v1${res.config.url}`);
        })
        .catch((err) => {
          return;
        });
    } else {
      return;
    }
  }

  const [image, setImage] = useState<File | null>(null);
  const [fileType, setFileType] = useState('image');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasError, setHasError] = useState(false);
  const [settingUp, setSettingUp] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleRemoveIcon = useCallback(() => {
    setPreview(null);
    setImage(null);
    props.handleImageChange({});
    setFileType('image');
    setHasError(false);
  }, []);

  const handleAddIcon = (files: File[]) => {
    if (files.length > 1) {
      setErrorMessage('You can upload only 1 icon');
      setHasError(true);
    } else {
      let file = files[0];
      if (props.isMandatory && props.isMandatory === 'csv' && !file.name.match(/.(csv)$/i)) {
        setErrorMessage('File extension error. Please select a csv file.');
        setHasError(true);
      } else if (props.isMandatory && props.isMandatory === 'image' && !file.name.match(/.(jpg|jpeg|png)$/i)) {
        setErrorMessage('Invalid file format');
        setHasError(true);
      } else if (file.type === 'application/vnd.ms-excel') {
        setFileType('csv');
        setImage(file);
        setHasError(false);
      } else if (!file.name.match(/.(jpg|jpeg|png)$/i)) {
        setErrorMessage('Invalid file format');
        setHasError(true);
      } else {
        setHasError(false);
        setImage(file);
        setFileType('image');
      }
    }
  };

  useEffect(() => {
    if (settingUp) {
      setupPreview();
      setSettingUp(false);
    } else {
      if (image) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(image);
      } else {
        setPreview(null);
      }
      props.handleImageChange(image || {});
    }
  }, [image]);

  useEffect(() => {
    if (props.icon && props.icon !== image) {
      setSettingUp(true);
      setImage(props.icon);
    }
  }, [props]);

  useEffect(() => {
    if (props.fileState !== undefined && !props.fileState.name) {
      setPreview(null);
      setImage(null);
      setFileType('image');
      setHasError(false);
    }
  }, [props.fileState]);

  return (
    <div className={Style.container} accessKey='addIcon'>
      {(image || preview) && fileType === 'image' ? (
        <>
          <div className={Style.fileField}>
            <div className={Style.iconPreview} style={{ backgroundImage: `url(${bg})` }}>
              {preview && (
                <>
                  <button className={Style.closeIcon} onClick={handleRemoveIcon}>
                    X
                  </button>
                  <img src={preview} alt='iconPreview' />
                </>
              )}
            </div>
            <Button
              variant='outlined'
              classes={{ root: Style.changeIconButton }}
              onClick={(event) => {
                if (props.changeButtonFc) {
                  props.changeButtonFc();
                } else {
                  event.preventDefault();
                  fileInputRef.current?.click();
                }
              }}>
              {props.buttonText ? props.buttonText : 'Change Icon'}
            </Button>
          </div>
          <div className={Style.iconErrorMessageContainer}>
            {hasError && <VDFErrorMessage errorMessage={errorMessage} />}
          </div>
        </>
      ) : (
        <>
          {fileType === 'csv' ? (
            <>
              <div className={Style.containerCsv}>
                <div className={Style.iconPreviewCsv}>
                  <button className={Style.closeBtnCsv} onClick={handleRemoveIcon}>
                    <img src={closeBtnCircle} alt='close-btn-circle' />
                  </button>
                  <img src={csvIcon} alt='' />
                </div>
                <Button
                  variant='outlined'
                  className={Style.btnCloseCsv}
                  classes={{ root: Style.changeIconButton }}
                  onClick={(event) => {
                    if (props.changeButtonFc) {
                      props.changeButtonFc();
                    } else {
                      event.preventDefault();
                      fileInputRef.current?.click();
                    }
                  }}>
                  Change File
                </Button>
              </div>
              <div className={Style.iconErrorMessageContainer}>
                {hasError && <VDFErrorMessage errorMessage={errorMessage} />}
              </div>
            </>
          ) : (
            <>
              <div className={Style.fileField}>
                <Dropzone handleAddFile={(image) => handleAddIcon(image)} />
                <Button
                  id='addIconButton'
                  onClick={(event) => {
                    event.preventDefault();
                    (fileInputRef as any).current.click();
                  }}
                  variant='contained'
                  classes={{ root: Style.addIconButton }}>
                  <img src={addIcon} className={Style.addIcon} />
                </Button>
              </div>
              <div className={Style.iconErrorMessageContainer}>
                {hasError ? (
                  <VDFErrorMessage errorMessage={errorMessage} />
                ) : // <p className={Style.errorMessage}>{errorMessage}</p>
                props.showErrorMessage ? (
                  <VDFErrorMessage errorMessage={props.displayIconErrorMessage ? props.displayIconErrorMessage : ''} />
                ) : (
                  ''
                )}
              </div>
            </>
          )}
        </>
      )}
      <input
        type='file'
        style={{ display: 'none' }}
        ref={fileInputRef}
        accept='/*'
        onChange={(event: any) => {
          handleAddIcon(event.target.files);
        }}
        onClick={(event: any) => (event.target.value = '')}
        data-testid='input-file'
      />
    </div>
  );
}
