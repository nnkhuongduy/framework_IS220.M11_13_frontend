import { Carousel, Col, Row, Spin } from 'antd';

import { CategoriesCarousel } from 'src/components/categories-carousel/categories-carousel';
import { Keywords } from 'src/components/keywords/keywords';
import { PostListing } from 'src/components/post-listing/post-listing';
import { useGetPrimaryCategoriesQuery } from 'src/services/category';

import { MOCK_KEYWORDS } from './mock_data';
import { StyledCol } from './styled';

export const HomePage = () => {
  const { data: categories, isLoading: isLoadingCategories } =
    useGetPrimaryCategoriesQuery();

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
        {isLoadingCategories ? (
          <Spin size="large" />
        ) : (
          <CategoriesCarousel categories={categories || []} />
        )}
      </StyledCol>
      <StyledCol>
        <h1>TIN MỚI HÀNG NGÀY</h1>
        <p>Cơ hội tìm kiếm trong hàng ngàn sản phẩm tại 99phantram.com</p>
        <PostListing supplies={supplies || []} loading={isLoadingSupplies} />
      </StyledCol>
      {/* <StyledCol>
        <h1>TỪ KHÓA NỔI BẬT</h1>
        <Keywords keywords={MOCK_KEYWORDS} />
      </StyledCol> */}
    </Row>
  );
};
