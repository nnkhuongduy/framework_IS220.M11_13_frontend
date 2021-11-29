import { useMemo } from 'react';
import { Button, Dropdown, Menu, Badge } from 'antd';
import styled from 'styled-components';
import { AiFillBell } from 'react-icons/ai';
import { useAppSelector } from 'src/hooks/store';
import { selectCurrentUser } from 'src/slices/auth';

const StyledButton = styled(Button)`
  color: white !important;
`;

export const MenuNotifications = () => {
  const user = useAppSelector(selectCurrentUser);

  const menu = useMemo(
    () => (
      <Menu>
        <Menu.Item key="1">Item 1</Menu.Item>
      </Menu>
    ),
    []
  );

  if (user) {
    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <Badge count={0} offset={[-10, 5]} size="small">
          <StyledButton type="text" icon={<AiFillBell className="button-icon" />}>
            Thông báo
          </StyledButton>
        </Badge>
      </Dropdown>
    );
  }

  return null;
};
