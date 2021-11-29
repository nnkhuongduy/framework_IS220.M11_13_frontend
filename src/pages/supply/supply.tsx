import { useParams } from 'react-router-dom';
import { Col } from 'antd';

import { useGetSupplyQuery } from 'src/services/supply';
import { SupplyDetail } from 'src/components/supply/detail';

import { Main } from './styled';

export const SupplyPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: supply } = useGetSupplyQuery(id);

  return (
    <Main>
      <Col span={24}>
        <SupplyDetail supply={supply} />
      </Col>
    </Main>
  );
};
