import { useMemo } from 'react';
import { Menu, Dropdown, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';

import { useAppDispatch, useAppSelector } from 'src/hooks/store';
import { logout, selectCurrentUser } from 'src/slices/auth';

import { StyledMenu } from '../styled';

export const HeaderUserMenu = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectCurrentUser);

  const onLogout = () => {
    dispatch(logout());
  };

  const menu = useMemo(
    () => (
      <Menu>
        {user ? <Menu.Item icon={<AiOutlineUser />} key="profile">
          <Link to={`/user/${user.id}`}>Trang cá nhân</Link>
        </Menu.Item> : null}
        <Menu.Item icon={<AiOutlineLogout />} key="log-out" onClick={onLogout}>
          Đăng xuất
        </Menu.Item>
      </Menu>
    ),
    //eslint-disable-next-line
    []
  );

  return (
    <>
      {user ? (
        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
          <StyledMenu.Item key="user">
            <Avatar src={user.avatar} icon={<AiOutlineUser />} />
            <Typography.Text style={{ marginLeft: '10px', color: 'white' }}>
              {user.lastName} {user.firstName}
            </Typography.Text>
          </StyledMenu.Item>
        </Dropdown>
      ) : (
        <StyledMenu.Item key="user">
          <Link to="/login">
            <Avatar icon={<AiOutlineUser />} />
            <Typography.Text style={{ marginLeft: '10px', color: 'white' }}>
              Đăng nhập
            </Typography.Text>
          </Link>
        </StyledMenu.Item>
      )}
    </>
  );
};
