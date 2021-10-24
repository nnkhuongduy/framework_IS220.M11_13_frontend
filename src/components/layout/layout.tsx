import { FC } from 'react';
import { Layout as AntdLayout } from 'antd';

import { Header } from './header';

const { Content, Footer } = AntdLayout;

export const Layout: FC = ({ children }) => {
  return (
    <AntdLayout>
      <Header />
      <Content className="page-layout-spacing">{children}</Content>
      <Footer>
        <div className="page-layout-spacing">Footer</div>
      </Footer>
    </AntdLayout>
  );
};
