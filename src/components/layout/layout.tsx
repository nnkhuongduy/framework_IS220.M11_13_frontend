import { FC } from 'react';
import { Layout as AntdLayout } from 'antd';

import { StyledContent } from './styled';
import { Header } from './header';
import { Footer } from './footer';

export const Layout: FC = ({ children }) => {
  return (
    <AntdLayout>
      <Header />
      <StyledContent className="page-layout-spacing">{children}</StyledContent>
      <Footer />
    </AntdLayout>
  );
};
