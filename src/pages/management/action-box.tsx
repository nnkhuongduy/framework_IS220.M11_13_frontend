import { FC, useContext } from 'react';
import { Row, Col, Typography, Tag, Button, Divider } from 'antd';
import { truncate } from 'lodash';

import { PostsMangementContext } from 'src/contexts/management';

export const ActionBox: FC = () => {
  const { supplies, setSupplies } = useContext(PostsMangementContext);

  const onClose = (index: number) => {
    const newSupplies = [...supplies];
    newSupplies[index].selected = false;

    setSupplies(newSupplies);
  };

  return (
    <Row gutter={[0, 8]}>
      <Col span={24}>
        <Typography.Title level={5}>Tin đã chọn:</Typography.Title>
      </Col>
      <Col span={24}>
        {supplies
          .filter((_) => _.selected === true)
          .map((supply, index) => (
            <Tag closable onClose={() => onClose(index)}>
              {truncate(supply.name)}
            </Tag>
          ))}
      </Col>
      <Divider />
      <Col span={24}>
        <Button
          type="primary"
          disabled={!supplies.filter((_) => _.selected === true).length}
          danger
        >
          Xóa
        </Button>
      </Col>
      <Col span={24}>
        <Typography.Paragraph type="secondary">
          Xóa tin đăng về sản phẩm. Tin sẽ không còn xuất hiện trên kết quả tìm
          kiếm lẫn trang cá nhân
        </Typography.Paragraph>
      </Col>
    </Row>
  );
};
