import { Layout, Menu, Button } from 'antd';
import styled from 'styled-components';

const { Header, Content, Footer } = Layout;

export const StyledHeader = styled(Header)`
  background: ${(props) => props.theme.colors.primary.main};
  color: white;
  height: 120px;
  line-height: 40px;
  padding: 0;
  padding-top: 10px;

  .logo {
    vertical-align: baseline;
  }
`;

export const StyledMenu = styled(Menu)`
  background: ${(props) => props.theme.colors.primary.main};
  border-bottom: none;
  color: white;
  justify-content: end;

  a {
    color: white !important;
  }

  .ant-menu-item:hover {
    background: ${(props) => props.theme.colors.primary.light};
  }

  .ant-menu-item:hover,
  .ant-menu-item-active,
  .ant-menu-item-selected {
    color: white !important;
  }

  .ant-menu-item::after {
    display: none !important;
  }
`;

export const StyledContent = styled(Content)`
  padding: 16px 0;
`;

export const StyledFooter = styled(Footer)`
  background: ${(props) => props.theme.colors.primary.main};
  color: white;
  padding: 0;
  padding-top: 50px;
  padding-bottom: 50px;

  .logo {
    width: 100%;
    max-width: 200px;
  }

  .info {
    margin-top: 50px;
    text-align: center;
    font-size: 10px;
    color: #d8d8d8;

    p {
      margin: 0;
    }
  }
`;

export const SecondaryButton = styled(Button)`
  background: ${(props) => props.theme.colors.secondary.main};
  border: none;
  color: black;
  font-weight: bold;
`;
