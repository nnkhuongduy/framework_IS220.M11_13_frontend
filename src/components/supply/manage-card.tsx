import React, { FC } from 'react';
import { Checkbox, Tag, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';

import { Supply, SupplyStatusText } from 'src/models/supply';
import { formatPrice } from 'src/helpers/format-price';

import { CardMain, CheckboxContainer } from './styled';
import { SUPPLY_CONSTANTS } from 'src/constants/supply';

interface Props {
  supply: Supply;
  checked: boolean;
  onCheck: () => void;
  editable?: boolean;
  grayFilter?: boolean;
}

const Content: FC<Pick<Props, 'supply'>> = ({ supply }) => {
  return (
    <>
      <img
        src={supply.thumbnail}
        alt={supply.name}
        height="220px"
        width="100%"
        style={{ objectFit: 'cover' }}
      />
      <Link to={`/supply/${supply.id}`}>
        <h4>{supply.name}</h4>
      </Link>
      <p className="price">{formatPrice(supply.price)}</p>
      <p className="location">
        {supply.locations[0].name}, {supply.locations[1].name},{' '}
        {supply.locations[2].name}
      </p>
    </>
  );
};

export const ManagementSupplyCard: FC<Props> = ({
  supply,
  checked,
  onCheck,
  editable = true,
  grayFilter = false,
}) => {
  return (
    <CardMain grayFilter={grayFilter} checked={checked}>
      <CheckboxContainer>
        <Checkbox onChange={onCheck} checked={checked} />
      </CheckboxContainer>
      <Content supply={supply} />
      <Row align="middle" justify="space-between">
        <Col>
          <Tag color={SUPPLY_CONSTANTS.STATUS_COLOR[supply.status]}>
            {SupplyStatusText[supply.status]}
          </Tag>
        </Col>
        {editable ? (
          <Col>
            <Button size="small">Sửa</Button>
          </Col>
        ) : null}
      </Row>
    </CardMain>
  );
};
