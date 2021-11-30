import { useRef, useMemo, FC } from 'react';
import { Row, Col, Button, Carousel, Typography, Skeleton } from 'antd';
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineExclamationCircle,
} from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md';
import { CarouselRef } from 'antd/lib/carousel';

import { SupplyUser } from './user';
import { ProductStatus, Supply } from 'src/models/supply';
import { LocationLevel } from 'src/models/location';
import { formatPrice } from 'src/helpers/format-price';

import {
  ProductDetailMain,
  UploadedImage,
  ContentCol,
  ContentDivider,
  PriceParagraph,
  ProductStatusText,
} from './styled';

interface Props {
  supply?: Supply;
  preview?: boolean;
}

export const SupplyDetail: FC<Props> = ({ supply, preview }) => {
  const carousel = useRef<CarouselRef>(null);

  const addressText = useMemo(() => {
    if (supply) {
      const province = supply.locations.find(
        (_) => _.locationLevel === LocationLevel.PROVINCE
      )!;
      const ward = supply.locations.find(
        (_) => _.locationLevel === LocationLevel.WARD
      )!;
      const block = supply.locations.find(
        (_) => _.locationLevel === LocationLevel.BLOCK
      )!;

      return `${province.name}, ${ward.name}, ${block.name} ${supply.address}`;
    }

    return '';
    //eslint-disable-next-line
  }, [supply]);

  if (!supply) {
    return (
      <ProductDetailMain>
        <Col span={18}>
          <Row>
            <Col span={24}>
              <Row
                style={{ height: '400px' }}
                align="middle"
                gutter={8}
                wrap={false}
              >
                <Col flex="40px">
                  <Button
                    type="text"
                    icon={<AiOutlineArrowLeft className="button-icon" />}
                    onClick={() => carousel.current?.prev()}
                  />
                </Col>
                <Col flex="auto">
                  <Carousel ref={carousel} dots={false}>
                    <Skeleton.Image
                      style={{ height: '400px', width: '100%' }}
                    />
                  </Carousel>
                </Col>
                <Col flex="40px">
                  <Button
                    type="text"
                    icon={<AiOutlineArrowRight className="button-icon" />}
                    onClick={() => carousel.current?.next()}
                  />
                </Col>
              </Row>
            </Col>
            <ContentCol span={24} style={{ marginTop: '16px' }}>
              <Skeleton active />
            </ContentCol>
            <ContentDivider />
            <Skeleton active />
            <ContentDivider />
            <Skeleton.Input active />
          </Row>
        </Col>
        <Col span={6}>
          <Skeleton avatar />
        </Col>
      </ProductDetailMain>
    );
  }

  return (
    <ProductDetailMain>
      <Col span={18}>
        <Row>
          <Col span={24}>
            <Row
              style={{ height: '400px' }}
              align="middle"
              gutter={8}
              wrap={false}
            >
              <Col flex="40px">
                <Button
                  type="text"
                  icon={<AiOutlineArrowLeft className="button-icon" />}
                  onClick={() => carousel.current?.prev()}
                />
              </Col>
              <Col flex="auto">
                <Carousel ref={carousel} dots={false}>
                  {supply.images.map((image, index) => (
                    <UploadedImage
                      src={image}
                      alt={`${supply.name} ${index}`}
                      key={index}
                    />
                  ))}
                </Carousel>
              </Col>
              <Col flex="40px">
                <Button
                  type="text"
                  icon={<AiOutlineArrowRight className="button-icon" />}
                  onClick={() => carousel.current?.next()}
                />
              </Col>
            </Row>
          </Col>
          <ContentCol span={24} style={{ marginTop: '16px' }}>
            <Row>
              <Col flex="auto">
                <Typography.Title
                  level={3}
                  style={{ fontWeight: 'bold', marginBottom: '0' }}
                >
                  {supply.name}{' '}
                  <ProductStatusText>
                    ({ProductStatus[supply.productStatus]})
                  </ProductStatusText>
                </Typography.Title>
                <PriceParagraph strong>
                  {formatPrice(supply.price)}
                </PriceParagraph>
              </Col>
              {/* <Col>
                <Button type="primary">Lưu tin</Button>
              </Col> */}
            </Row>
          </ContentCol>
          <ContentCol span={24}>
            <Typography.Paragraph style={{ whiteSpace: 'pre-wrap' }}>
              {supply.description}
            </Typography.Paragraph>
          </ContentCol>
          <ContentDivider />
          <ContentCol span={24} style={{ marginBottom: '8px' }}>
            <Row align="bottom" gutter={8}>
              <Col>
                <AiOutlineExclamationCircle size={18} />
              </Col>
              <Col>
                <Typography.Title level={4} style={{ margin: 0 }}>
                  Thông tin sản phẩm
                </Typography.Title>
              </Col>
            </Row>
          </ContentCol>
          {supply.specs.map((spec, index) => (
            <ContentCol span={24} key={index}>
              <Typography.Paragraph>
                {spec.name}: {spec.value}
              </Typography.Paragraph>
            </ContentCol>
          ))}
          <ContentDivider />
          <ContentCol span={24} style={{ marginBottom: '8px' }}>
            <Row align="bottom" gutter={8}>
              <Col>
                <MdLocationOn size={18} />
              </Col>
              <Col>
                <Typography.Title level={5} style={{ margin: 0 }}>
                  Khu vực
                </Typography.Title>
              </Col>
            </Row>
          </ContentCol>
          <ContentCol span={24}>
            <Typography.Paragraph>{addressText}</Typography.Paragraph>
          </ContentCol>
        </Row>
      </Col>
      <Col span={6}>
        <SupplyUser supply={supply} user={supply.owner} preview={preview} />
      </Col>
    </ProductDetailMain>
  );
};
