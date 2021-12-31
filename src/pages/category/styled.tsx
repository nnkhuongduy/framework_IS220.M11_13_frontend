import { Col } from 'antd';
import styled from 'styled-components';

export const StyledCol = styled(Col)`
  background-color: white;
  width: 100%;
  text-align: center;
  padding: 20px;

  h1 {
    color: ${(props) => props.theme.colors.primary.main};
    font-weight: bold;
    margin: 0;
  }
`;
