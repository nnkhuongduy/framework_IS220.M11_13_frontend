import { FC } from 'react';
import { Button, Col } from 'antd';
import { useMediaQuery } from 'react-responsive';

import { Post } from 'src/models/post';
import { theme } from 'src/theme';
import { PostItem, PostMain } from './styled';

interface PostListingProps {
  posts: Post[];
}

export const PostListing: FC<PostListingProps> = ({ posts }) => {
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

  return (
    <PostMain gutter={[16, 16]}>
      {posts.map(({ images, name, price, locations }, index) => (
        <PostItem
          key={index}
          span={
            isXXsSmall ? 24 : isXsSmall ? 12 : isSmall ? 8 : isMedium ? 6 : 4
          }
        >
          <img
            src={images[0]}
            alt={name}
            height="220px"
            width="100%"
            style={{ objectFit: 'cover' }}
          />
          <h4>{name}</h4>
          <p className="price">{price.toLocaleString()} VNĐ</p>
          <p className="location">{locations[0].name}</p>
        </PostItem>
      ))}
      <Col span={24}>
        <Button type="default">Xem thêm</Button>
      </Col>
    </PostMain>
  );
};
