import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { Supply } from 'src/models/supply';
import { formatPrice } from 'src/helpers/format-price';

import { CardMain } from './styled';

interface Props {
  supply: Supply;
  style?: React.CSSProperties;
  preview?: boolean;
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
      <h4>{supply.name}</h4>
      <p className="price">{formatPrice(supply.price)}</p>
      <p className="location">
        {supply.locations[0].name}, {supply.locations[1].name},{' '}
        {supply.locations[2].name}
      </p>
    </>
  );
};

export const SupplyCard: FC<Props & React.RefAttributes<HTMLDivElement>> = ({
  supply,
  preview,
  ...props
}) => {
  return (
    <CardMain {...props}>
      {preview ? (
        <Content supply={supply} />
      ) : (
        <Link to={`/supply/${supply.id}`}>
          <Content supply={supply} />
        </Link>
      )}
    </CardMain>
  );
};
