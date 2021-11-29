import styled from 'styled-components';
import { Col, Row } from 'antd';

export const PostMain = styled(Row)`
  margin-top: 50px;
  margin-bottom: 20px;
`;

export const PostItem = styled(Col)`
  text-align: left;

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
