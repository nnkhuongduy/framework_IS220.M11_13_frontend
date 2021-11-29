import { FC } from 'react';
import { Col, Row, Typography } from 'antd';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { chunk } from 'lodash';
import { Link } from 'react-router-dom';

import { Category } from 'src/models/category';
import { useMediaQuery } from 'react-responsive';
import { theme } from 'src/theme';
import { StyledCarousel, Image } from './styled';

interface ArrowProps {
  type: 'left' | 'right';
  className?: string;
  onClick?: () => void;
}

interface CategoriesCarouselProps {
  categories: Category[];
}

const Arrow: FC<ArrowProps> = ({ type, className, onClick }) => {
  return (
    <div className={className + ' arrow-container'} onClick={onClick}>
      {type === 'left' ? <AiOutlineArrowLeft /> : <AiOutlineArrowRight />}
    </div>
  );
};

export const CategoriesCarousel: FC<CategoriesCarouselProps> = ({
  categories,
}) => {
  const isXsSmall = useMediaQuery({
    query: `(max-width: ${theme.breakpoints.xs}px)`,
  });
  const isXXsSmall = useMediaQuery({
    query: `(max-width: ${theme.breakpoints.xxs}px)`,
  });

  return (
    <StyledCarousel
      arrows
      prevArrow={<Arrow type="left" />}
      nextArrow={<Arrow type="right" />}
      dots={false}
    >
      {chunk(categories, isXXsSmall ? 2 : isXsSmall ? 4 : 6).map(
        (cateChunk, i) => (
          <div key={i}>
            <Row gutter={16} wrap={false}>
              {cateChunk.map((cate, j) => (
                <Col key={j} span={isXXsSmall ? 12 : isXsSmall ? 6 : 4}>
                  <Link to={`/category/${cate.slug}`}>
                    <Image src={cate.image} alt={cate.name} />
                    <Typography.Text>{cate.name}</Typography.Text>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        )
      )}
    </StyledCarousel>
  );
};
