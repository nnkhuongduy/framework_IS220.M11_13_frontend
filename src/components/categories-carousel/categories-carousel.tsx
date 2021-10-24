import { FC } from 'react';
import { Col, Row } from 'antd';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { chunk } from 'lodash';

import { Category } from 'src/models/category';
import { useMediaQuery } from 'react-responsive';
import { theme } from 'src/theme';
import { StyledCarousel } from './styled';

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
          <div>
            <Row key={i} gutter={16} wrap={false}>
              {cateChunk.map((cate, j) => (
                <Col key={j} span={isXXsSmall ? 12 : isXsSmall ? 6 : 4}>
                  <img
                    src={cate.image}
                    alt={cate.name}
                    width="80%"
                    style={{ margin: '0 auto' }}
                  />
                  <span>{cate.name}</span>
                </Col>
              ))}
            </Row>
          </div>
        )
      )}
    </StyledCarousel>
  );
};
