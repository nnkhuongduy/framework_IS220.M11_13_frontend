import styled from 'styled-components';
import { Col, List } from 'antd';

interface WithDirection {
  direction: 'left' | 'right';
}

export const ChatboxSectionMain = styled.div`
  background-color: white;
  padding: 20px !important;
  height: 100%;
`;

export const ContactSectionMain = styled.div`
  background-color: white;
  padding: 20px !important;
  height: 100%;
  max-height: 800px;
  overflow-y: auto;
`

export const ChatListItem = styled(List.Item)`
  padding-left: 10px;
  padding-right: 10px;
  transition: ${(props) => props.theme.transition};

  &:hover {
    background: ${(props) => props.theme.colors.hover.gray};
  }
`;

export const ChatBoxMain = styled.div<{ ref?: any }>`
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  max-height: 500px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`;

export const MessageBox = styled.div<WithDirection>`
  padding: 10px 15px;
  max-width: 80%;
  white-space: pre-wrap;
  box-shadow: 2px 2px 5px rgb(0, 0, 0, 25%);
  margin: 0 ${(props) => (props.direction === 'left' ? 'auto' : '0')} 0
    ${(props) => (props.direction === 'right' ? 'auto' : '0')};
`;

export const MessageCol = styled(Col)<WithDirection>`
  text-align: ${(props) => props.direction};
`;

export const MessageItemMain = styled.div`
  height: max-content;
  width: 100%;
  margin-bottom: 16px;
`;
