import { Carousel, Col, Row } from 'antd';
import { useParams } from 'react-router-dom';

import { PostListing } from 'src/components/post-listing/post-listing';
import { CategoriesCarousel } from 'src/components/categories-carousel/categories-carousel';
import {
  useGetSecondaryCategoriesQuery,
  useGetCategoryQuery,
} from 'src/services/category';

import { StyledCol } from './styled';

export const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: categories, isLoading } = useGetSecondaryCategoriesQuery(slug);
  const { data: category } = useGetCategoryQuery(slug);

  return (
    <Row gutter={[0, 16]}>
      <Col span={24}>
        <Carousel autoplay>
          <img src='/assets/images/banner.png' alt='banner' />
          <img src='/assets/images/banner.png' alt='banner' />
          <img src='/assets/images/banner.png' alt='banner' />
          <img src='/assets/images/banner.png' alt='banner' />
        </Carousel>
      </Col>
      <StyledCol>
        <h1>
          DANH MỤC SẢN PHẨM {(category || { name: '' }).name.toUpperCase()}
        </h1>
        <p>Cơ hội tìm kiếm trong hàng ngàn sản phẩm tại 99phantram.com</p>
        <CategoriesCarousel categories={categories || []} loading={isLoading} />
      </StyledCol>
      <StyledCol>
        <h1>TIN MỚI HÀNG NGÀY</h1>
        <p>Cơ hội tìm kiếm trong hàng ngàn sản phẩm tại 99phantram.com</p>
        <PostListing />
      </StyledCol>
    </Row>
  );
};
