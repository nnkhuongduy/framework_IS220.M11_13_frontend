import { FC } from 'react';
import { Typography, Button, Skeleton } from 'antd';
import { useParams } from 'react-router-dom';

import { useHttpError } from 'src/hooks/http';
import { useAppSelector } from 'src/hooks/store';
import { ChatMessage } from 'src/models/chat-message';
import { OrderStatus, PutOrderBody } from 'src/models/order';
import { useConfirmOrderMutation, useGetOrderQuery } from 'src/services/order';
import { selectCurrentUser } from 'src/slices/auth';

interface Props {
  message: ChatMessage;
}

export const ConfirmPaymentMessage: FC<Props> = ({ message }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const httpError = useHttpError();
  const { id: chatId } = useParams<{ id: string }>();

  const { data: order, isFetching } = useGetOrderQuery(message.orderId, {
    refetchOnMountOrArgChange: true,
  });
  const [confirm, { isLoading: isConfirming }] = useConfirmOrderMutation();

  const onConfirm = async () => {
    try {
      if (order) {
        const body: PutOrderBody = {
          chatId,
        };

        await confirm({ id: order.id, body }).unwrap();
      }
    } catch (error) {
      httpError(error);
    }
  };

  if (isFetching) {
    return <Skeleton.Input active />;
  }

  if (currentUser && order) {
    return (
      <>
        <Typography.Paragraph italic>
          {message.sender === currentUser.id
            ? 'Người bán đang xác nhận thanh toán!'
            : 'Tôi đã thanh toán cho sản phẩm xin hãy xác nhận!'}
        </Typography.Paragraph>
        {message.sender !== currentUser.id &&
        order.status === OrderStatus.CONFIRMING ? (
          <Button type="primary" disabled={isConfirming} onClick={onConfirm}>
            Xác nhận đã thanh toán
          </Button>
        ) : null}
      </>
    );
  }

  return null;
};
