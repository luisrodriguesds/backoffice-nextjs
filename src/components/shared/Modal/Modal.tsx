import { Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from '@mui/material';
import React from 'react';
import closeIcon from '../../../../public/icons/close-system.svg';
import styleClass from './Modal.module.scss';

interface ModalProps {
  handleClose: Function;
  hasActions?: boolean;
  children?: JSX.Element;
  actions?: JSX.Element;
  title?: string;
  open: boolean;
  style?: Object;
  hasCloseButton?: boolean;
  headerButton?: JSX.Element;
}

interface HeaderButtonModel {
  text: string;
  clickFn?: Function;
  style?: Object;
}

const Modal = (props: ModalProps) => {
  const [open, setOpen] = React.useState(props.open);
  const [style, setStyle] = React.useState(props.style);

  React.useEffect(() => {
    setOpen(props.open);
    setStyle(props.style);
  }, [props]);

  return (
    <Dialog open={open} onClose={() => props.handleClose()} classes={style}>
      <DialogTitle className={styleClass.dialogTitle}>
        {props.title}
        {props.headerButton}
        {props.hasCloseButton && (
          <img src={closeIcon} className={styleClass.closeButton} onClick={() => props.handleClose()} />
        )}
      </DialogTitle>
      <DialogContent>
        {props.children}
        {props.hasActions && <DialogActions className={styleClass.actions}>{props.actions}</DialogActions>}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
