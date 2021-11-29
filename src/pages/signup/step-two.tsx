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
    <Row align="middle" justify="center" style={{ margin: '32px 0' }}>
      <Col span={24} style={{ textAlign: 'center' }}>
        <img
          src="/assets/images/Logo-Primarycolor.png"
          alt="logo"
          width="150px"
          style={{ marginBottom: '16px' }}
        />
      </Col>
      <Col span={24}>
        <SignupBox className="page-layout-spacing">
          <h1>Hoàn tất đăng ký</h1>
          <p className="subtitle">
            Chào mừng bạn đến với 99Phầntrăm. Xin bạn vui lòng điền các thông
            tin sau để 99Phầntrăm có thể cung cấp cho bạn trải nghiệm và dịch vụ
            tốt nhất!
          </p>
          <Divider />
          <Form
            form={form}
            labelCol={{ span: 0 }}
            size="large"
            requiredMark={false}
            onFinish={onFinish}
          >
            <p>
              <b>Thông tin cá nhân:</b>
            </p>
            <Form.Item
              name="phoneNumber"
              rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại!' },
                {
                  pattern: /[0-9]{10,12}/,
                  message: 'Vui lòng nhập sđt phù hợp',
                },
                { min: 10, message: 'SĐT tối thiểu 10 ký tự' },
                { max: 12, message: 'SĐT tối đa 12 ký tự' },
              ]}
            >
              <Input placeholder="Số điện thoại" />
            </Form.Item>
            <Form.Item
              name="province"
              rules={[
                { required: true, message: 'Vui lòng chọn tỉnh/ thành phố!' },
              ]}
            >
              <Select
                placeholder="Chọn tỉnh/ thành phố"
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
              name="ward"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn quận/ huyện/ thị xã!',
                },
              ]}
            >
              <Select
                placeholder="Chọn quận/ huyện/ thị xã"
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
              name="block"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn phường/ thị xã/ thị trấn!',
                },
              ]}
            >
              <Select
                placeholder="Chọn phường/ thị xã/ thị trấn"
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
              name="address"
              rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
            >
              <Input placeholder="Địa chỉ" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
                loading={isUpdating || isAuthenticating}
              >
                Hoàn tất
              </Button>
            </Form.Item>
          </Form>
        </SignupBox>
      </Col>
    </Row>
  );
};
