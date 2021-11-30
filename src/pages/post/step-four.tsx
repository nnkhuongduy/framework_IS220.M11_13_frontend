import { useContext, useEffect, useRef, useState } from 'react';
import { Row, Col, Carousel, Button, Divider, Form, Alert } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineClose,
} from 'react-icons/ai';

import { PostContext } from 'src/pages/post/post';
import { UploadImage } from 'src/components/supply/posting/upload';
import { SupplyPostingInfoForm } from 'src/components/supply/posting/info-form';
import { SupplyPostingSpecsForm } from 'src/components/supply/posting/specs-form';
import { PostSupply } from 'src/models/supply';
import { getBase64 } from 'src/helpers/get-base-64';

import { UploadedImage, UploadedContainer } from './styled';

export const StepFour = () => {
  const carousel = useRef<CarouselRef>(null);
  const { steps, setSteps, setCurrentStep, currentStep } =
    useContext(PostContext);
  const [fileUrl, setFileUrl] = useState<string>();
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [fileError, setFileError] = useState<boolean>();
  const [form] = Form.useForm<PostSupply>();

  useEffect(() => {
    if (steps[3].content.images) {
      steps[3].content.images.forEach((image: File) => {
        getBase64(image, (result) => {
          setFileUrl(result);
        });
      });
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (fileUrl) {
      setFileUrls([...fileUrls, fileUrl])
    }
    //eslint-disable-next-line
  }, [fileUrl])

  const onUpload = (file: File) => {
    const newSteps = [...steps];
    newSteps[3].content = {
      ...newSteps[3].content,
      images: [...(newSteps[3].content.images || []), file],
    };

    getBase64(file, (result) => {
      const newFileUrls = [...fileUrls, result];
      setFileUrls(newFileUrls);
    });

    setFileError(false);
    setSteps(newSteps);
  };

  const onFinish = (form: PostSupply) => {
    const newSteps = [...steps];
    newSteps[3].content = {
      ...newSteps[3].content,
      ...form,
    };
    newSteps[3].finished = true;

    setSteps(newSteps);

    if (
      !newSteps[3].content.images ||
      newSteps[3].content.images.length === 0 ||
      !newSteps[3].content.thumbnail
    ) {
      setFileError(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const onRemoveImage = (index: number) => {
    const newSteps = [...steps];
    if (newSteps[3].content.images) {
      newSteps[3].content.images.splice(index, 1);
    }

    const newFileUrls = [...fileUrls];
    newFileUrls.splice(index, 1);

    setFileUrls(newFileUrls);
    setSteps(newSteps);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      requiredMark={false}
      initialValues={{ ...steps[3].content }}
    >
      <Row style={{ height: '400px' }} align="middle" gutter={8} wrap={false}>
        <Col flex="40px">
          <Button
            type="text"
            icon={<AiOutlineArrowLeft className="button-icon" />}
            onClick={() => carousel.current?.prev()}
          />
        </Col>
        <Col flex="auto">
          <Carousel ref={carousel} dots={false}>
            {fileUrls.map((url, index) => (
              <UploadedContainer key={index}>
                <UploadedImage
                  src={url}
                  alt={`Uploaded ${index}`}
                />
                <Button
                  type="text"
                  icon={<AiOutlineClose className="button-icon" />}
                  onClick={() => onRemoveImage(index)}
                />
              </UploadedContainer>
            ))}
            <UploadImage onUpload={onUpload} />
          </Carousel>
        </Col>
        <Col flex="40px">
          <Button
            type="text"
            icon={<AiOutlineArrowRight className="button-icon" />}
            onClick={() => carousel.current?.next()}
          />
        </Col>
      </Row>
      <Divider />
      <SupplyPostingInfoForm />
      <Divider />
      <SupplyPostingSpecsForm />
      <Divider />
      <Row gutter={16}>
        <Col>
          <Button
            size="large"
            onClick={() => form.resetFields()}
            htmlType="reset"
          >
            Nhập lại
          </Button>
        </Col>
        <Col>
          <Button size="large" type="primary" htmlType="submit">
            Lưu
          </Button>
        </Col>
      </Row>
      {fileError ? (
        <Alert
          style={{ marginTop: '16px' }}
          message="Vui lòng tải lên ảnh tổng quát và ít nhất một ảnh về sản phẩm!"
          type="error"
          showIcon
        />
      ) : null}
    </Form>
  );
};
