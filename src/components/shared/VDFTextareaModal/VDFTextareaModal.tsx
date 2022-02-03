import React, { useState } from 'react';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import { Editor } from '@tinymce/tinymce-react';

import style from './VDFTextareaModal.module.scss';

interface IVDFTextareaModal {
  label?: string;
  sublabel?: string;
  textareaValue: string;
  setTextareaValue: (textareaValue: string) => void;
}

const VDFTextareaModal: React.FC<IVDFTextareaModal> = ({ label, sublabel, textareaValue, setTextareaValue }) => {
  const [isOpen, setIsopen] = useState(false);

  const [value, setValue] = useState(textareaValue);
  const [text, setText] = useState('');

  function handleSave() {
    setTextareaValue(text);
    setIsopen(false);
  }

  const modalActions: JSX.Element = (
    <>
      <Button clickFn={() => setIsopen(false)} data-testid='btn-cancel' type='button' color='white' text='Cancel' />
      <Button clickFn={() => handleSave()} data-testid='btn-save' type='button' color='black' text='Done' />
    </>
  );
  return (
    <>
      <div className={style.formField}>
        <label>
          {label && label} {sublabel && <span>{sublabel}</span>}
        </label>
        <div
          className={style.textareaStyle}
          dangerouslySetInnerHTML={{
            __html: textareaValue,
          }}
        />
        <Button text='Edit' color='white' clickFn={() => setIsopen(true)} />
      </div>
      <Modal
        handleClose={() => setIsopen(false)}
        hasActions={true}
        open={isOpen}
        hasCloseButton={true}
        actions={modalActions}
        title={`Edit ${label}`}>
        <Editor
          apiKey='axlffsz6yupj0absinlwjuqg3dsacm5k3dxhocb0h022b37k'
          value={value}
          onInit={(_, editor) => {
            setText(editor.getContent({ format: 'html' }));
          }}
          onEditorChange={(newValue, editor) => {
            setValue(newValue);
            setText(editor.getContent({ format: 'html' }));
          }}
          init={{
            height: 400,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
            ],
            toolbar:
              'undo redo | formatselect | ' +
              'bold italic backcolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
        />
      </Modal>
    </>
  );
};

export default VDFTextareaModal;
