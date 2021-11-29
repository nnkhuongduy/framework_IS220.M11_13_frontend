import styled from 'styled-components';
import { Card } from 'antd';

export const SignupBox = styled(Card)`
  max-width: 600px !important;

  h1 {
    color: ${(props) => props.theme.colors.primary.main};
    font-size: 24px;
    font-weight: bold;
  }

  p,
  h1 {
    margin: 0;
  }

  .subtitle {
    color: gray;
  }

  .ant-divider-horizontal {
    margin: 16px 0;
  }

  .inline-form-item {
    display: inline-block;
    margin-left: 8px;
    margin-right: 8px;
    width: calc(50% - 8px);

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
`;

export const VerifyingCard = styled(Card)`
  width: 90%;
  max-width: 600px !important;
  margin: 0 auto;
`