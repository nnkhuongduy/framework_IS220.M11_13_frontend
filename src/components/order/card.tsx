import { FC } from 'react';

import { Order } from 'src/models/order';
import { SupplySnapshot } from 'src/models/supply';
import { formatPrice } from 'src/helpers/format-price';

import { CardMain } from './styled';

interface MainProps {
  order: Order;
}

interface ContentProps {
  supply: SupplySnapshot;
}

const Content: FC<ContentProps> = ({ supply }) => {
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

export const OrderCard: FC<MainProps> = ({ order }) => {
  return (
    <CardMain>
      <Content supply={order.supply} />
    </CardMain>
  );
};
