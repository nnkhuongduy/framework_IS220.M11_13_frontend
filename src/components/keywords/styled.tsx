import styled from 'styled-components';
import { Row } from 'antd';

export const KeywordsMain = styled(Row)`
  margin-top: 30px;
  margin-bottom: 10px;

  a {
    color: unset;

    &:hover {
      color: ${(props) => props.theme.colors.primary.main};
    }
  }
`;
