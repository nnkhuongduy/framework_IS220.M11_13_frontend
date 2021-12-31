import { useEffect, useMemo, useState } from 'react';
import { Col, Divider, Avatar, Skeleton, Typography, Row, Button } from 'antd';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

import {
  useConnectChatMutation,
  useDisconnectChatMutation,
} from 'src/services/chat';
import { MessageList } from './message-list';
import { useAppSelector } from 'src/hooks/store';
import { selectCurrentUser } from 'src/slices/auth';
import { User } from 'src/models/user';
import { MessageBox } from './message-box';
import { useChatHub } from 'src/hooks/chathub';
import { ChatMessage } from 'src/models/chat-message';
import { Chat } from 'src/models/chat';
import { RequestPaymentModal } from 'src/components/supply/dialog/request';
import { useCreateOrderMutation } from 'src/services/order';
import { useHttpError } from 'src/hooks/http';

import { ChatboxSectionMain } from './styled';

export const ChatBox = () => {
  const { start, connection } = useChatHub();
  const { id: chatId } = useParams<{ id: string }>();
  const currentUser = useAppSelector(selectCurrentUser);
  const httpError = useHttpError();

  const [connect, { data: chat, isLoading }] = useConnectChatMutation();
  const [createOrder, { isLoading: isCreatingOrder }] =
    useCreateOrderMutation();
  const [disconnect] = useDisconnectChatMutation();

  const [_chat, _setChat] = useState<Chat>();
  const [_newMessage, _setNewMessage] = useState<ChatMessage>();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    start();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const disconnectCallback = () => {
      disconnect(chatId);

      connection.invoke('LeaveGroup', chatId);
    };

    if (chatId) {
      connect(chatId).then(() => {
        connection.invoke('JoinGroup', chatId);

        connection.on('ReceiveMessage', (message: ChatMessage) =>
          _setNewMessage(message)
        );
      });

      window.addEventListener('unload', disconnectCallback);
    }

    return () => {
      if (chatId) {
        disconnect(chatId);

        connection.invoke('LeaveGroup', chatId);

        window.removeEventListener('unload', disconnectCallback);
      }
    };
    //eslint-disable-next-line
  }, [chatId]);

  useEffect(() => {
    if (socket && chatId) {
      connect(chatId).then(() => {});
    }
    //eslint-disable-next-line
  }, [socket, chatId]);

  useEffect(() => {
    _setChat(chat);
  }, [chat]);

  const oppositeUser = useMemo<User | undefined>(() => {
    if (chat && currentUser) {
      return chat.user1.id === currentUser.id ? chat.user1 : chat.user2;
    }

    return undefined;
  }, [currentUser, chat]);

  useEffect(() => {
    if (_chat && _newMessage) {
      const newChat = { ..._chat };
      newChat.content = [...(_chat.content || []), _newMessage];

      _setChat(newChat);
    }
    //eslint-disable-next-line
  }, [_newMessage]);

  if (isLoading && !oppositeUser) {
    return (
      <ChatboxSectionMain>
        <Row style={{ flexDirection: 'column', height: '100%' }}>
          <Col>
            <Skeleton paragraph={false} avatar active />
          </Col>
          <Divider />
        </Row>
      </ChatboxSectionMain>
    );
  }

  const onRequestSubmit = (supplyId: string) => {
    try {
      createOrder({
        chatId,
        supplyId,
      });
      setDialogVisible(false);
    } catch (error) {
      httpError(error);
    }
  };

  if (oppositeUser) {
    return (
      <>
        <ChatboxSectionMain>
          <Row style={{ flexDirection: 'column', height: '100%' }}>
            <Col>
              <Row align='middle' justify='space-between'>
                <Col>
                  <Avatar src={oppositeUser!.avatar}>
                    {oppositeUser!.firstName[0]}
                  </Avatar>
                  <Typography.Text strong style={{ marginLeft: '10px' }}>
                    {oppositeUser!.lastName} {oppositeUser!.firstName}
                  </Typography.Text>
                </Col>
                <Col>
                  <Button
                    type='primary'
                    onClick={() => setDialogVisible(true)}
                    disabled={isCreatingOrder}
                  >
                    Gửi yêu cầu thanh toán
                  </Button>
                </Col>
              </Row>
            </Col>
            <Divider />
            <Col flex='auto'>
              <MessageList chat={_chat} />
            </Col>
            <Divider />
            <Col>
              <MessageBox />
            </Col>
          </Row>
        </ChatboxSectionMain>
        <RequestPaymentModal
          visible={dialogVisible}
          onSubmit={onRequestSubmit}
          onCancel={() => setDialogVisible(false)}
        />
      </>
    );
  }

  return null;
};
