import { List, Typography, Avatar, Badge } from 'antd';
import { truncate } from 'lodash';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import { useGetChatsQuery } from 'src/services/chat';

import { ContactSectionMain, ChatListItem } from './styled';

export const ContactList = () => {
  const { data: chats, isFetching } = useGetChatsQuery();

  return (
    <ContactSectionMain>
      <List
        header={<Typography.Title level={3}>Danh sách</Typography.Title>}
        loading={isFetching}
        dataSource={chats}
        renderItem={({ user, lastMessage, unseens, id }) => (
          <Link to={`/contact/${id}`}>
            <ChatListItem>
              <List.Item.Meta
                avatar={<Avatar src={user.avatar}>{user.firstName[0]}</Avatar>}
                title={`${user.lastName} ${user.firstName}`}
                // description={truncate(lastMessage.content, { length: 50 })}
              />
              <Typography.Text type="secondary">
                {dayjs(lastMessage.createdOn).format('l')}
              </Typography.Text>
              {/* {unseens > 0 ? (
                <Badge style={{ marginLeft: '5px' }} count={unseens} />
              ) : null} */}
            </ChatListItem>
          </Link>
        )}
      />
    </ContactSectionMain>
  );
};
