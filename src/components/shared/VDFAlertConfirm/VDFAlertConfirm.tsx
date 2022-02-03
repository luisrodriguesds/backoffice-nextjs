import React from 'react';

import Modal from '../Modal/Modal';
import Button from '../Button/Button';

import style from './VDFAlertConfirm.module.scss';

interface IVDFAlertConfirm {
  title?: string;
  message: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleConfirm: () => void;
}

const VDFAlertConfirm: React.FC<IVDFAlertConfirm> = ({ isOpen, setIsOpen, handleConfirm, title, message }) => {
  async function handleConfirmModal() {
    await handleConfirm();
    setIsOpen(false);
  }

  const modalActions: JSX.Element = (
    <div className={style.btnsWrap}>
      <Button clickFn={() => setIsOpen(false)} type='button' color='white' text='Cancel' data-testid='btn-cancel' />
      <Button clickFn={() => handleConfirmModal()} type='button' color='black' text='Confirm' data-testid='btn-confirm' />
    </div>
  );
  return (
    <Modal
      handleClose={() => setIsOpen(false)}
      hasActions={true}
      open={isOpen}
      hasCloseButton={true}
      actions={modalActions}
      title={title}>
      <h2
        className={style.title}
        dangerouslySetInnerHTML={{
          __html: message,
        }}
      />
    </Modal>
  );
};

export default VDFAlertConfirm;
