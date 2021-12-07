import { useState } from 'react';
import {
  Row,
  Col,
  Avatar,
  Input,
  Button,
  Drawer,
  Menu,
  Divider,
  Typography,
} from 'antd';
import {
  AiOutlineUser,
  AiOutlineFileAdd,
  AiOutlineSearch,
  AiOutlineMenu,
  AiOutlineLogout,
} from 'react-icons/ai';
import { Link, useHistory, useParams } from 'react-router-dom';

import { MenuNotifications } from '../notifications';
import { useMediaQuery } from 'react-responsive';
import { theme } from 'src/theme';
import { MENU_ITEMS } from './menu-items';
import { useAppDispatch, useAppSelector } from 'src/hooks/store';
import { logout, selectCurrentUser } from 'src/slices/auth';
import { HeaderUserMenu } from './user-menu';

import { StyledHeader, StyledMenu, SecondaryButton } from '../styled';

export const Header = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { query } = useParams<{ query: string }>();

  const isMobile = useMediaQuery({
    query: `(max-width: ${theme.breakpoints.sm}px)`,
  });
  const [mobileDrawer, setMobileDrawer] = useState(false);

  const user = useAppSelector(selectCurrentUser);

  const onClose = () => {
    setMobileDrawer(false);
  };

  const onLogout = () => {
    dispatch(logout());
    onClose();
  };

  const onSearch = (query: string) => {
    history.push(`/query/${query}`);
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
                placeholder="Ô tô giá rẻ"
                enterButton="Tìm kiếm"
                size="large"
                defaultValue={query || ''}
                prefix={<AiOutlineSearch />}
                onSearch={onSearch}
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
              {user ? (
                <Button type="primary" size="small">
                  {user.lastName} {user.firstName}
                </Button>
              ) : (
                <Link to="/login">
                  <Button type="primary" size="small">
                    Đăng nhập
                  </Button>
                </Link>
              )}
            </Col>
          </Row>
          <Divider />
          <Menu>
            {MENU_ITEMS.filter(
              ({ onlyUser }) => !onlyUser || (onlyUser && Boolean(user))
            ).map(({ label, link, Icon }, index) => (
              <Menu.Item key={index} icon={Icon} onClick={onClose}>
                <Link to={`${link}`}>{label}</Link>
              </Menu.Item>
            ))}
            {user ? (
              <Menu.Item
                key="log-out"
                icon={<AiOutlineLogout />}
                onClick={onLogout}
              >
                <Typography.Text>Đăng xuất</Typography.Text>
              </Menu.Item>
            ) : null}
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
                {MENU_ITEMS.filter(
                  ({ onlyUser }) => !onlyUser || (onlyUser && Boolean(user))
                ).map(({ label, link, Icon }, index) => (
                  <StyledMenu.Item key={index} icon={Icon}>
                    <Link to={`${link}`}>{label}</Link>
                  </StyledMenu.Item>
                ))}
                <HeaderUserMenu />
              </StyledMenu>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={16}>
            <Col flex="auto">
              <Input.Search
                placeholder="Ô tô giá rẻ"
                enterButton="Tìm kiếm"
                size="large"
                prefix={<AiOutlineSearch />}
                defaultValue={query || ''}
                onSearch={onSearch}
              />
            </Col>
            <Col>
              <MenuNotifications />
            </Col>
            <Col>
              <Link to={user ? '/post' : '/login'}>
                <SecondaryButton
                  icon={<AiOutlineFileAdd className="button-icon" />}
                >
                  Đăng tin bán
                </SecondaryButton>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </StyledHeader>
  );
};
