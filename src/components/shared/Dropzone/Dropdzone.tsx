import React from 'react';
import { useDropzone } from 'react-dropzone';
import Style from './Dropzone.module.scss';

interface DropzoneProps {
  handleAddFile: Function;
}

function Dropzone(props: DropzoneProps) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => {
      props.handleAddFile(files);
    },
    noClick: true,
  });

  return (
    <div {...getRootProps({ className: Style.baseStyle })}>
      <input {...getInputProps()} />
      <p>Drop files here to upload</p>
    </div>
  );
}

export default Dropzone;
