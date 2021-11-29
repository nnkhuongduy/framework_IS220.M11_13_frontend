import { FC, useRef } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { message } from 'antd';

import { UploadHolder } from './styled';

interface Props {
  onUpload: (file: File) => void;
  height?: number;
  width?: number;
}

const fileChecking = (file: File) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('Bạn chỉ có thể tài lên file JPG/PNG!');
  }
  const isLt8M = file.size! / 1024 / 1024 < 8;
  if (!isLt8M) {
    message.error('Ảnh không được vướt quá 8MB!');
  }
  return isJpgOrPng && isLt8M;
};

export const UploadImage: FC<Props> = ({ onUpload, width, height = 400 }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const _onUpload = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      if (fileChecking(file)) {
        onUpload(file);
      }
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        style={{ display: 'none' }}
        type="file"
        accept="image/*"
        onChange={(event) => _onUpload(event.target.files)}
      />
      <UploadHolder
        onClick={() => inputRef.current?.click()}
        style={{ height, width: width || '100%' }}
      >
        <AiOutlinePlus />
        <p>Tải ảnh</p>
      </UploadHolder>
    </>
  );
};
