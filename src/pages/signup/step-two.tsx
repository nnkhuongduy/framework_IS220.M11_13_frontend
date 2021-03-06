import { useEffect, useState } from 'react';
import { Col, Row, Divider, Form, Input, Button, Select } from 'antd';
import { useHistory } from 'react-router-dom';

import { useToggleLayoutHeader } from 'src/hooks/toggle-layout-header';
import {
  useLazyGetBlocksFromWardQuery,
  useGetProvincesQuery,
  useLazyGetWardsFromProvinceQuery,
} from 'src/services/location';
import { StepTwoForm } from 'src/models/auth';
import { useHttpError } from 'src/hooks/http';
import {
  useLazyAuthenticateQuery,
  useStepTwoUpdateMutation,
} from 'src/services/auth';

import { SignupBox } from './styled';

const { useForm } = Form;

export const SignupStepTwoPage = () => {
  useToggleLayoutHeader();
  const [form] = useForm();
  const httpError = useHttpError();
  const history = useHistory();

  const { data: provinces, isLoading: loadingProvinces } =
    useGetProvincesQuery();
  const [getWards, { isLoading: loadingWards, data: wards }] =
    useLazyGetWardsFromProvinceQuery();
  const [getBlocks, { data: blocks, isLoading: loadingBlocks }] =
    useLazyGetBlocksFromWardQuery();
  const [stepTwoUpdate, { isLoading: isUpdating }] = useStepTwoUpdateMutation();
  const [
    authenticate,
    { isSuccess: isAuthenticateSuccess, isLoading: isAuthenticating },
  ] = useLazyAuthenticateQuery();

  const [provinceId, setProvinceId] = useState<string>();
  const [wardId, setWardId] = useState<string>();

  useEffect(() => {
    if (provinceId) {
      getWards(provinceId);
      setWardId(undefined);

      form.setFieldsValue({
        ward: undefined,
        block: undefined,
      });
    }
    //eslint-disable-next-line
  }, [provinceId]);

  useEffect(() => {
    if (wardId) {
      getBlocks(wardId);

      form.setFieldsValue({
        block: undefined,
      });
    }
    //eslint-disable-next-line
  }, [wardId]);

  useEffect(() => {
    if (isAuthenticateSuccess) {
      history.push('/');
    }
    //eslint-disable-next-line
  }, [isAuthenticateSuccess]);

  const onFinish = async (form: StepTwoForm) => {
    try {
      await stepTwoUpdate(form).unwrap();

      authenticate();
    } catch (error) {
      httpError(error);
    }
  };

  return (
    <Row align='middle' justify='center' style={{ margin: '32px 0' }}>
      <Col span={24} style={{ textAlign: 'center' }}>
        <img
          src='/assets/images/Logo-Primarycolor.png'
          alt='logo'
          width='150px'
          style={{ marginBottom: '16px' }}
        />
      </Col>
      <Col span={24}>
        <SignupBox className='page-layout-spacing'>
          <h1>Ho??n t???t ????ng k??</h1>
          <p className='subtitle'>
            Ch??o m???ng b???n ?????n v???i 99Ph???ntr??m. Xin b???n vui l??ng ??i???n c??c th??ng
            tin sau ????? 99Ph???ntr??m c?? th??? cung c???p cho b???n tr???i nghi???m v?? d???ch v???
            t???t nh???t!
          </p>
          <Divider />
          <Form
            form={form}
            labelCol={{ span: 0 }}
            size='large'
            requiredMark={false}
            onFinish={onFinish}
          >
            <p>
              <b>Th??ng tin c?? nh??n:</b>
            </p>
            <Form.Item
              name='phoneNumber'
              rules={[
                { required: true, message: 'Vui l??ng nh???p s??? ??i???n tho???i!' },
                {
                  pattern: /[0-9]{10,12}/,
                  message: 'Vui l??ng nh???p s??t ph?? h???p',
                },
                { min: 10, message: 'S??T t???i thi???u 10 k?? t???' },
                { max: 12, message: 'S??T t???i ??a 12 k?? t???' },
              ]}
            >
              <Input placeholder='S??? ??i???n tho???i' />
            </Form.Item>
            <Form.Item
              name='province'
              rules={[
                { required: true, message: 'Vui l??ng ch???n t???nh/ th??nh ph???!' },
              ]}
            >
              <Select
                placeholder='Ch???n t???nh/ th??nh ph???'
                loading={loadingProvinces}
                onChange={(value) => setProvinceId(value as string)}
              >
                {(provinces || []).map((province) => (
                  <Select.Option key={province.id} value={province.id}>
                    {province.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name='ward'
              rules={[
                {
                  required: true,
                  message: 'Vui l??ng ch???n qu???n/ huy???n/ th??? x??!',
                },
              ]}
            >
              <Select
                placeholder='Ch???n qu???n/ huy???n/ th??? x??'
                loading={loadingWards}
                disabled={!Boolean(provinceId)}
                onChange={(value) => setWardId(value as string)}
              >
                {(wards || []).map((ward) => (
                  <Select.Option key={ward.id} value={ward.id}>
                    {ward.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name='block'
              rules={[
                {
                  required: true,
                  message: 'Vui l??ng ch???n ph?????ng/ th??? x??/ th??? tr???n!',
                },
              ]}
            >
              <Select
                placeholder='Ch???n ph?????ng/ th??? x??/ th??? tr???n'
                loading={loadingBlocks}
                disabled={!Boolean(wardId)}
              >
                {(blocks || []).map((block) => (
                  <Select.Option key={block.id} value={block.id}>
                    {block.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name='address'
              rules={[{ required: true, message: 'Vui l??ng nh???p ?????a ch???!' }]}
            >
              <Input placeholder='?????a ch???' />
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                style={{ width: '100%' }}
                loading={isUpdating || isAuthenticating}
              >
                Ho??n t???t
              </Button>
            </Form.Item>
          </Form>
        </SignupBox>
      </Col>
    </Row>
  );
};
