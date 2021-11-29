import { useContext, useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, Select } from 'antd';
import { AiOutlineClose } from 'react-icons/ai';

import { getBase64 } from 'src/helpers/get-base-64';
import { PostContext } from 'src/pages/post/post';
import { UploadedContainer, UploadedImage } from 'src/pages/post/styled';
import { UploadImage } from './upload';
import { ProductStatus } from 'src/models/supply';
import { formatPrice } from 'src/helpers/format-price';

export const SupplyPostingInfoForm = () => {
  const { steps, setSteps } = useContext(PostContext);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>();

  useEffect(() => {
    if (steps[3].content.thumbnail) {
      getBase64(steps[3].content.thumbnail as File, (url) =>
        setThumbnailUrl(url)
      );
    }
    //eslint-disable-next-line
  }, []);

  const onThumbnailUpload = (file: File) => {
    const newSteps = [...steps];
    newSteps[3].content.thumbnail = file;

    getBase64(file, (url) => setThumbnailUrl(url));

    setSteps(newSteps);
  };

  const onRemoveThumbnail = () => {
    const newSteps = [...steps];
    delete newSteps[3].content.thumbnail;

    setThumbnailUrl(undefined);
    setSteps(newSteps);
  };

  return (
    <>
      <Form.Item label="Ảnh tổng quát" labelCol={{ span: 24 }}>
        {thumbnailUrl ? (
          <UploadedContainer style={{ width: '180px' }}>
            <UploadedImage
              src={thumbnailUrl}
              alt="thumbnail"
              style={{ width: '180px', height: '220px' }}
            />
            <Button
              type="text"
              icon={<AiOutlineClose className="button-icon" />}
              onClick={() => onRemoveThumbnail()}
              style={{ top: '10px', right: '10px' }}
            />
          </UploadedContainer>
        ) : (
          <UploadImage onUpload={onThumbnailUpload} height={220} width={180} />
        )}
      </Form.Item>
      <Form.Item
        label="Tên sản phẩm"
        name="name"
        rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
        labelCol={{ span: 24 }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Giá"
        name="price"
        rules={[
          { required: true, message: 'Vui lòng nhập giá sản phẩm!' },
          {
            validator: (_, value) => {
              if (value < 1000) {
                return Promise.reject(
                  new Error('Giá sản phẩm phải lớn hơn 1,000 đồng!')
                );
              }
              return Promise.resolve();
            },
          },
        ]}
        labelCol={{ span: 24 }}
      >
        <InputNumber
          formatter={(value) => formatPrice(value as number)}
          parser={(value) => value!.replace(/\s?VNĐ|(,*)/g, '')}
          step={1000}
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        label="Trạng thái"
        name="productStatus"
        rules={[
          { required: true, message: 'Vui lòng chọn trạng thái sản phẩm!' },
        ]}
        labelCol={{ span: 24 }}
      >
        <Select>
          {Object.keys(ProductStatus)
            .filter((key) => Number.isNaN(Number(key)))
            .map((key) => (
              <Select.Option value={ProductStatus[key as any]}>
                {key}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Mô tả"
        name="description"
        rules={[
          { required: true, message: 'Vui lòng nhập mô tả sản phẩm!' },
          { max: 500, message: 'Mô tả không quá 500 ký tự!' },
        ]}
        labelCol={{ span: 24 }}
      >
        <Input.TextArea showCount maxLength={500} autoSize={{minRows: 4}} />
      </Form.Item>
    </>
  );
};
