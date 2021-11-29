import styled from 'styled-components';
import { Row, Col, Card } from 'antd';

export const LoginMain = styled(Row)`
  height: 600px;
`;

export const LeftSection = styled(Col)`
  max-width: 500px;

  img {
    margin-bottom: 16px;
  }
`;

export const RightSection = styled(Col)`
  max-width: 450px;
`;

export const LoginBox = styled(Card)`
  box-shadow: 0px 4px 10px 5px rgba(0, 0, 0, 0.05);

  h1 {
    color: ${(props) => props.theme.colors.primary.main};
    font-weight: bold;
    text-align: center;
    margin-bottom: 16px;
    font-size: 24px;
  }

  button {
    width: 100%;
    font-weight: bold;
  }

  .ant-row.ant-form-item:last-child {
    margin-bottom: 8px;
  }

  .forgot-btn {
    color: ${(props) => props.theme.colors.primary.main};
  }

  .signup-btn {
    width: 50%;
    background: ${(props) => props.theme.colors.secondary.main};
    color: black;
    margin: 20px auto 0;
    border: none;

    &:hover {
      background: ${(props) => props.theme.colors.secondary.light};
      color: black;
      border: none;
    }
  }
`;
