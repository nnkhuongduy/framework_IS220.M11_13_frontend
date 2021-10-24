import { Layout, Menu, Button } from 'antd';
import styled from 'styled-components';

const { Header } = Layout;

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

export const SecondaryButton = styled(Button)`
  background: ${(props) => props.theme.colors.secondary.main};
  border: none;
  color: black;
  font-weight: bold;
`;
