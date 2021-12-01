import { FC, useState } from 'react';
import { Modal, Row, Col, Typography, Divider, Skeleton } from 'antd';

import { useGetOwnSuppliesQuery } from 'src/services/supply';
import { ManagementSupplyCard } from '../manage-card';

import { RequestModalContent } from '../styled';
import { SupplyStatus } from 'src/models/supply';

interface Props {
  visible: boolean;
  onSubmit: (supplyId: string) => void;
  onCancel: () => void;
}

export const RequestPaymentModal: FC<Props> = ({
  visible,
  onSubmit,
  onCancel,
}) => {
  const { data: supplies, isFetching } = useGetOwnSuppliesQuery();

  const [selected, setSelected] = useState<string>();

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      cancelText="Trở về"
      okText="Gửi"
      onOk={() => onSubmit(selected!)}
      okButtonProps={{ disabled: !selected }}
      width={1000}
    >
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Typography.Title level={5}>Chọn sản phẩm</Typography.Title>
        </Col>
        <Divider />
        <Col span={24}>
          <RequestModalContent>
            <Row gutter={[8, 8]}>
              {isFetching
                ? [...Array(8).keys()].map((index) => (
                    <Col key={index} xs={24} sm={12} md={6}>
                      <Skeleton.Image />
                      <Skeleton active />
                    </Col>
                  ))
                : (supplies || [])
                    .filter((_) => _.status === SupplyStatus.ACTIVE)
                    .map((supply) => (
                      <Col key={supply.id} xs={24} sm={12} md={6}>
                        <ManagementSupplyCard
                          checked={selected === supply.id}
                          onCheck={() => setSelected(supply.id)}
                          supply={supply}
                          editable={false}
                          grayFilter={true}
                        />
                      </Col>
                    ))}
            </Row>
          </RequestModalContent>
        </Col>
      </Row>
    </Modal>
  );
};
