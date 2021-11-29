import { useState } from 'react';
import { Row, Col, Avatar, Input, Button, Drawer, Menu, Divider } from 'antd';
import {
  AiOutlineUser,
  AiOutlineFileAdd,
  AiOutlineSearch,
  AiOutlineMenu,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';

import { StyledHeader, StyledMenu, SecondaryButton } from './styled';
import { MenuNotifications } from './notifications';
import { useMediaQuery } from 'react-responsive';
import { theme } from 'src/theme';
import { MENU_ITEMS } from './menu-items';

export const Header = () => {
  const isMobile = useMediaQuery({
    query: `(max-width: ${theme.breakpoints.sm}px)`,
  });
  const [mobileDrawer, setMobileDrawer] = useState(false);

  const onClose = () => {
    setMobileDrawer(false);
  };

  if (isMobile) {
    return (
      <>
        <StyledHeader>
          <Row gutter={[0, 8]} className="page-layout-spacing">
            <Col span={24}>
              <Row justify="space-between">
                <Col>
                  <Link to="/">
                    <img
                      src="/assets/images/Logo-White.png"
                      alt="99phantram logo"
                      height="30px"
                      className="logo"
                    />
                  </Link>
                </Col>
                <Col>
                  <Button
                    icon={
                      <AiOutlineMenu
                        className="button-icon"
                        style={{ marginRight: '0' }}
                      />
                    }
                    onClick={() => setMobileDrawer(true)}
                  ></Button>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Input.Search
                placeholder="Ô tô giá rẻ HCM"
                enterButton="Tìm kiếm"
                size="large"
                prefix={<AiOutlineSearch />}
              />
            </Col>
          </Row>
        </StyledHeader>
        <Drawer visible={mobileDrawer} onClose={onClose} closable={false}>
          <Row align="middle" gutter={8}>
            <Col>
              <Avatar
                icon={<AiOutlineUser style={{ lineHeight: '46px' }} />}
                size="large"
              />
            </Col>
            <Col flex="auto">
              <Button type="primary" size="small">
                Đăng nhập
              </Button>
            </Col>
          </Row>
          <Divider />
          <Menu>
            {MENU_ITEMS.map(({ label, link, Icon }, index) => (
              <Menu.Item key={index} icon={Icon} onClick={onClose}>
                <Link to={`${link}`}>{label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Drawer>
      </>
    );
  }

  return (
    <StyledHeader>
      <Row gutter={[0, 8]} className="page-layout-spacing">
        <Col span={24}>
          <Row>
            <Col>
              <Link to="/">
                <img
                  src="/assets/images/Logo-White.png"
                  alt="99phantram logo"
                  height="30px"
                  className="logo"
                />
              </Link>
            </Col>
            <Col flex="auto">
              <StyledMenu mode="horizontal">
                {MENU_ITEMS.map(({ label, link, Icon }, index) => (
                  <StyledMenu.Item key={index} icon={Icon}>
                    <Link to={`${link}`}>{label}</Link>
                  </StyledMenu.Item>
                ))}
                <StyledMenu.Item key="user">
                  <Avatar icon={<AiOutlineUser />} />
                  <span style={{ marginLeft: '10px' }}>Đăng nhập</span>
                </StyledMenu.Item>
              </StyledMenu>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={16}>
            <Col flex="auto">
              <Input.Search
                placeholder="Ô tô giá rẻ HCM"
                enterButton="Tìm kiếm"
                size="large"
                prefix={<AiOutlineSearch />}
              />
            </Col>
            <Col>
              <MenuNotifications />
            </Col>
            <Col>
              <SecondaryButton
                icon={<AiOutlineFileAdd className="button-icon" />}
              >
                Đăng tin bán
              </SecondaryButton>
            </Col>
          </Row>
        </Col>
      </Row>
    </StyledHeader>
  );
};
