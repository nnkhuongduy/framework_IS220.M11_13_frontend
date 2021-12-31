import styled from 'styled-components';
import { Row, Col, Divider, Typography, Image } from 'antd';

export const ProductDetailMain = styled(Row)`
  .ant-carousel .slick-initialized .slick-slide {
    text-align: center;
  }
`;

export const UploadedImage = styled(Image)`
  width: 100%;
  height: 400px;
  object-fit: contain;
`;

export const ContentCol = styled(Col)`
  padding: 0 40px;
`;

export const ContentDivider = styled(Divider)`
  margin: 8px;
`;

export const PriceParagraph = styled(Typography.Paragraph)`
  color: ${(props) => props.theme.colors.primary.main};
  font-size: 18px;
`;

export const CardMain = styled.div<{ grayFilter?: boolean; checked?: boolean }>`
  text-align: left;
  position: relative;
  overflow: hidden;
  transition: ${(props) => props.theme.transition};
  filter: ${(props) =>
    props.grayFilter ? (props.checked ? 'none' : 'grayscale(1)') : 'none'};

  &:hover {
    filter: none;
  }

  h4 {
    font-weight: 600;
    margin: 0;
    margin-top: 10px;
    line-height: 140%;
  }

  p {
    margin: 0;
  }

  .price {
    color: ${(props) => props.theme.colors.primary.main};
    font-size: 20px;
    font-weight: bold;
  }

  .location {
    font-size: 10px;
    color: gray;
  }
`;

export const ProductStatusText = styled(Typography.Text)`
  font-size: 16px;
  color: ${(props) => props.theme.colors.primary.main};
  font-weight: 600;
`;

export const CheckboxContainer = styled.div`
  position: absolute;
  top: -50px;
  right: -50px;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background: rgba(0, 0, 0, 0.75);

  .ant-checkbox-wrapper {
    position: absolute;
    bottom: 20%;
    left: 20%;
  }
`;

export const RequestModalContent = styled.div`
  max-height: 65vh;
  padding: 20px 0;
  overflow: hidden;
  overflow-y: auto;
`