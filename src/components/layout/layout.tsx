import { FC } from 'react';
import { Layout as AntdLayout } from 'antd';

import { useAppSelector } from 'src/hooks/store';
import { selectLayoutHeaderState } from 'src/slices/global';

import { StyledContent } from './styled';
import { Header } from './header/header';
import { Footer } from './footer';

export const Layout: FC = ({ children }) => {
  const headerState = useAppSelector(selectLayoutHeaderState);

  return (
    <AntdLayout>
      {headerState ? <Header /> : null}
      <StyledContent className="page-layout-spacing">{children}</StyledContent>
      <Footer />
    </AntdLayout>
  );
};
