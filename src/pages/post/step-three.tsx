import { useState, useEffect, useContext } from 'react';
import { Form, Input, Select, Button, Spin } from 'antd';

import {
  useLazyGetBlocksFromWardQuery,
  useGetProvincesQuery,
  useLazyGetWardsFromProvinceQuery,
} from 'src/services/location';
import { PostContext } from './post';
import { useAppSelector } from 'src/hooks/store';
import { selectCurrentUser } from 'src/slices/auth';

import { StepThreeForm } from './styled';

const { useForm } = Form;

export const StepThree = () => {
  const [form] = useForm();
  const user = useAppSelector(selectCurrentUser);

  const { setCurrentStep, steps, setSteps } = useContext(PostContext);

  const { data: provinces, isLoading: loadingProvinces } =
    useGetProvincesQuery();
  const [getWards, { isLoading: loadingWards, data: wards }] =
    useLazyGetWardsFromProvinceQuery();
  const [getBlocks, { data: blocks, isLoading: loadingBlocks }] =
    useLazyGetBlocksFromWardQuery();

  const [provinceId, setProvinceId] = useState<string>();
  const [wardId, setWardId] = useState<string>();
  const [prefetched, setPrefetched] = useState<boolean>(false);

  useEffect(() => {
    if (user && !prefetched) {
      setProvinceId(user.locationProvinceRef.id);
    }
    //eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (wards && user && !prefetched) {
      setWardId(user.locationWardRef.id);
    }
    //eslint-disable-next-line
  }, [wards]);

  useEffect(() => {
    if (blocks && !prefetched) {
      setPrefetched(true);
    }
    //eslint-disable-next-line
  }, [blocks]);

  useEffect(() => {
    if (provinceId) {
      getWards(provinceId);

      if (prefetched) {
        setWardId(undefined);

        form.setFieldsValue({
          ward: undefined,
          block: undefined,
        });
      }
    }
    //eslint-disable-next-line
  }, [provinceId]);

  useEffect(() => {
    if (wardId) {
      getBlocks(wardId);

      if (prefetched) {
        form.setFieldsValue({
          block: undefined,
        });
      }
    }
    //eslint-disable-next-line
  }, [wardId]);

  const onFinish = (form: any) => {
    const newSteps = [...steps];
    newSteps[2].content = {
      ...form,
    };
    newSteps[2].finished = true;

    setSteps(newSteps);
    setCurrentStep(3);
  };

  return (
    <>
      {prefetched ? (
        <StepThreeForm
          form={form}
          layout='vertical'
          requiredMark={false}
          size='large'
          onFinish={onFinish}
          initialValues={{
            province: user?.locationProvinceRef.id,
            ward: user?.locationWardRef.id,
            block: user?.locationBlockRef.id,
            address: user?.address,
          }}
        >
          <Form.Item
            name='province'
            rules={[
              { required: true, message: 'Vui lòng chọn tỉnh/ thành phố!' },
            ]}
          >
            <Select
              placeholder='Chọn tỉnh/ thành phố'
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
                message: 'Vui lòng chọn quận/ huyện/ thị xã!',
              },
            ]}
          >
            <Select
              placeholder='Chọn quận/ huyện/ thị xã'
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
                message: 'Vui lòng chọn phường/ thị xã/ thị trấn!',
              },
            ]}
          >
            <Select
              placeholder='Chọn phường/ thị xã/ thị trấn'
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
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
          >
            <Input placeholder='Địa chỉ' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
              Tiếp tục
            </Button>
          </Form.Item>
        </StepThreeForm>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <Spin size='large' />
        </div>
      )}
    </>
  );
};
