import { FC } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Button, Col, Skeleton } from 'antd';

import { Supply } from 'src/models/supply';
import { SupplyCard } from '../supply/card';
import { theme } from 'src/theme';

import { PostMain } from './styled';

interface PostListingProps {
  supplies: Supply[];
  loading: boolean;
}

export const PostListing: FC<PostListingProps> = ({ supplies, loading }) => {
  const isMedium = useMediaQuery({
    query: `(max-width: ${theme.breakpoints.md}px)`,
  });
  const isSmall = useMediaQuery({
    query: `(max-width: ${theme.breakpoints.sm}px)`,
  });
  const isXsSmall = useMediaQuery({
    query: `(max-width: ${theme.breakpoints.xs}px)`,
  });
  const isXXsSmall = useMediaQuery({
    query: `(max-width: ${theme.breakpoints.xxs}px)`,
  });

  if (loading) {
    return (
      <PostMain gutter={[16, 16]}>
        {[...Array(6).keys()].map((key) => (
          <Col
            key={key}
            span={
              isXXsSmall ? 24 : isXsSmall ? 12 : isSmall ? 8 : isMedium ? 6 : 4
            }
          >
            <Skeleton.Image />
            <Skeleton active />
          </Col>
        ))}
      </PostMain>
    );
  }

  return (
    <PostMain gutter={[16, 16]}>
      {supplies.map((supply) => (
        <Col
          key={supply.id}
          span={
            isXXsSmall ? 24 : isXsSmall ? 12 : isSmall ? 8 : isMedium ? 6 : 4
          }
        >
          <SupplyCard supply={supply} />
        </Col>
      ))}
      {supplies.length % 20 === 0 ? (
        <Col span={24}>
          <Button type="default">Xem thêm</Button>
        </Col>
      ) : null}
    </PostMain>
  );
};
