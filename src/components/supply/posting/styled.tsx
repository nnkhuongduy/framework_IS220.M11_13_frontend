import styled from 'styled-components';
import { Form } from 'antd';

export const UploadHolder = styled.div`
  border: 1px dashed rgba(0, 0, 0, 0.25);
  transition: border-color 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 24px;

  &:hover {
    border: 1px dashed ${(props) => props.theme.colors.primary.light};
  }

  p {
    text-align: center;
    margin: 0;
  }
`;

export const SpecFormItem = styled(Form.Item)`
  &:before {
    display: ${(props) => (props.required ? 'inline-block' : 'none')};
    margin-right: 4px;
    color: #ff4d4f;
    font-size: 14px;
    font-family: SimSun, sans-serif;
    content: '*';
  }
`;
