import { Carousel, Col, Row } from 'antd';

import { CategoriesCarousel } from 'src/components/categories-carousel/categories-carousel';
import { Keywords } from 'src/components/keywords/keywords';
import { PostListing } from 'src/components/post-listing/post-listing';

import { MOCK_CATEGORIES, MOCK_KEYWORDS, MOCK_POSTS } from './mock_data';
import { StyledCol } from './styled';

export const HomePage = () => {
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
      <StyledCol>
        <h1>KHÁM PHÁ DOANH MỤC SẢN PHẨM</h1>
        <p>Cơ hội tìm kiếm trong hàng ngàn sản phẩm tại 99phantram.com</p>
        <CategoriesCarousel categories={MOCK_CATEGORIES} />
      </StyledCol>
      <StyledCol>
        <h1>TIN MỚI HÀNG NGÀY</h1>
        <p>Cơ hội tìm kiếm trong hàng ngàn sản phẩm tại 99phantram.com</p>
        <PostListing posts={MOCK_POSTS} />
      </StyledCol>
      <StyledCol>
        <h1>TỪ KHÓA NỔI BẬT</h1>
        <Keywords keywords={MOCK_KEYWORDS} />
      </StyledCol>
    </Row>
  );
};
