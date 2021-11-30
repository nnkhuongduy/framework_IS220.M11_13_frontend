import { FC, useState } from 'react';
import { Typography, Button, Skeleton, Rate, Input } from 'antd';
import { useParams } from 'react-router-dom';

import { useHttpError } from 'src/hooks/http';
import { useAppSelector } from 'src/hooks/store';
import { ChatMessage } from 'src/models/chat-message';
import { OrderStatus, PutOrderBody } from 'src/models/order';
import { PostRatingBody } from 'src/models/rating';
import { useGetOrderQuery, useReceivedOrderMutation } from 'src/services/order';
import { useCreateRatingMutation } from 'src/services/rating';
import { selectCurrentUser } from 'src/slices/auth';

interface Props {
  message: ChatMessage;
}

export const ReceivedMessage: FC<Props> = ({ message }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const httpError = useHttpError();
  const { id: chatId } = useParams<{ id: string }>();

  const { data: order, isFetching } = useGetOrderQuery(message.orderId, {
    refetchOnMountOrArgChange: true,
  });
  const [received, { isLoading: isConfirming }] = useReceivedOrderMutation();
  const [rating, { isLoading: isRating }] = useCreateRatingMutation();

  const [point, setPoint] = useState(5);
  const [comment, setComment] = useState('');

  const onReceived = async () => {
    try {
      if (order) {
        const ratingBody: PostRatingBody = {
          point,
          comment,
          ratingOnId: order.seller.id,
          orderId: order.id,
        };

        await rating(ratingBody);

        const body: PutOrderBody = {
          chatId,
        };

        await received({ id: order.id, body }).unwrap();
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
            ? 'Người nhận đang xác nhận đã nhận sản phẩm'
            : 'Xin hãy xác nhận đã nhận hàng đúng như mô tả!'}
        </Typography.Paragraph>
        {message.sender !== currentUser.id &&
        order.status === OrderStatus.PAID ? (
          <>
            <Rate value={point} onChange={(value) => setPoint(value)} />
            <Input.TextArea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              showCount
              maxLength={100}
              autoSize={{ minRows: 2, maxRows: 4 }}
            />
            <Button
              type="primary"
              disabled={isConfirming || isRating}
              onClick={onReceived}
              style={{ marginTop: '10px' }}
            >
              Xác nhận đã nhận hàng
            </Button>
          </>
        ) : null}
      </>
    );
  }

  return null;
};
