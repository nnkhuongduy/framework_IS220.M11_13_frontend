import { FC } from 'react';
import { Typography, Skeleton, Button } from 'antd';
import { useParams } from 'react-router-dom';

import { ChatMessage } from 'src/models/chat-message';
import { useAppSelector } from 'src/hooks/store';
import { selectCurrentUser } from 'src/slices/auth';
import { useGetOrderQuery, usePaidOrderMutation } from 'src/services/order';
import { OrderCard } from 'src/components/order/card';
import { useHttpError } from 'src/hooks/http';
import { OrderStatus, PutOrderBody } from 'src/models/order';

interface Props {
  message: ChatMessage;
}

export const PaymentMessage: FC<Props> = ({ message }) => {
  const { data: order, isFetching } = useGetOrderQuery(message.orderId, {
    refetchOnMountOrArgChange: true,
  });
  const [paid, { isLoading: isPaidProcessing }] = usePaidOrderMutation();

  const { id: chatId } = useParams<{ id: string }>();
  const currentUser = useAppSelector(selectCurrentUser);
  const httpError = useHttpError();

  const onPaid = async () => {
    try {
      if (order) {
        const body: PutOrderBody = {
          chatId,
        };

        await paid({ id: order.id, body }).unwrap();
      }
    } catch (error) {
      httpError(error);
    }
  };

  if (isFetching)
    return (
      <>
        <Skeleton.Image />
        <Skeleton />
      </>
    );

  if (order && currentUser) {
    return (
      <>
        <Typography.Paragraph italic>
          {message.sender === currentUser.id
            ? 'Chờ xác nhận thanh toán!'
            : 'Yêu cầu thanh toán sản phẩm!'}
        </Typography.Paragraph>
        <OrderCard order={order} />
        {message.sender !== currentUser.id &&
        order.status === OrderStatus.CREATED ? (
          <Button
            size="large"
            type="primary"
            onClick={onPaid}
            disabled={isPaidProcessing}
          >
            Đã thanh toán
          </Button>
        ) : null}
      </>
    );
  }

  return null;
};
