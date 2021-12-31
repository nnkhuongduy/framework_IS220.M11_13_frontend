import { FC, useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';
import { Button, Col, Skeleton, Typography } from 'antd';

import { Supply } from 'src/models/supply';
import { SupplyCard } from '../supply/card';
import { theme } from 'src/theme';
import {
  useGetSuppliesQuery,
  useLazyGetSuppliesQuery,
} from 'src/services/supply';

import { PostMain } from './styled';

export const PostListing: FC = () => {
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
  const { slug } = useParams<{ slug: string }>();
  const { query } = useParams<{query: string}>();

  const [page, setPage] = useState(0);
  const [_supplies, _setSupplies] = useState<Supply[]>([]);
  const [ended, setEnded] = useState(false);

  const { data: supplies, isLoading: isLoadingSupplies } = useGetSuppliesQuery({
    page: 0,
    categorySlug: slug,
    queryText: query
  });
  const [getMoreSupplies, { data: moreSupplies, isLoading: isLoadingMore }] = useLazyGetSuppliesQuery();

  useEffect(() => {
    setEnded(false);
  }, [slug]);

  useEffect(() => {
    if (supplies) {
      _setSupplies([...supplies]);
    }
    //eslint-disable-next-line
  }, [supplies]);

  useEffect(() => {
    if (moreSupplies) {
      _setSupplies([..._supplies, ...moreSupplies]);
      setEnded(moreSupplies.length === 0);
    }
    //eslint-disable-next-line
  }, [moreSupplies]);

  const onLoadMore = () => {
    setPage(page + 1);
    getMoreSupplies({
      page: page + 1,
      categorySlug: slug,
    });
  };

  if (isLoadingSupplies) {
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
      {_supplies.map((supply) => (
        <Col
          key={supply.id}
          span={
            isXXsSmall ? 24 : isXsSmall ? 12 : isSmall ? 8 : isMedium ? 6 : 4
          }
        >
          <SupplyCard supply={supply} />
        </Col>
      ))}
      {_supplies.length % 20 === 0 && _supplies.length !== 0 && !ended ? (
        <Col span={24}>
          <Button
            type="default"
            onClick={onLoadMore}
            disabled={isLoadingMore}
          >
            Xem thêm
          </Button>
        </Col>
      ) : null}
      {_supplies.length === 0 ? (
        <Col span={24}>
          <Typography.Paragraph>
            Không có sản phẩm trong danh mục này
          </Typography.Paragraph>
        </Col>
      ) : null}
    </PostMain>
  );
};
