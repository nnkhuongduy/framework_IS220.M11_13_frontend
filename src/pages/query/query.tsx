import { Row, Col, Carousel } from 'antd';
import { useParams } from 'react-router-dom';
import { PostListing } from 'src/components/post-listing/post-listing';

import { StyledCol } from './styled';

export const QueryPage = () => {
  const { query } = useParams<{ query: string }>();

  return (
    <Row gutter={[0, 16]}>
      <Col span={24}>
        <Carousel autoplay>
          <img src="/assets/images/banner.png" alt="banner" />
          <img src="/assets/images/banner.png" alt="banner" />
          <img src="/assets/images/banner.png" alt="banner" />
          <img src="/assets/images/banner.png" alt="banner" />
        </Carousel>
      </Col>
      {/* <StyledCol>
        <h1>Kết quả tìm kiếm người dùng "{query}"</h1>
      </StyledCol> */}
      <StyledCol>
        <h1>Kết quả tìm kiếm sản phẩm "{query}"</h1>
        <PostListing />
      </StyledCol>
    </Row>
  );
};
