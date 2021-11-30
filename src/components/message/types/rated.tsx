import { FC } from 'react';
import { Skeleton, Typography } from 'antd';

import { ChatMessage } from 'src/models/chat-message';
import { useGetRatingQuery } from 'src/services/rating';
import { RatingRow } from 'src/components/rating/rating';

interface Props {
  message: ChatMessage;
}

export const RatedMessage: FC<Props> = ({ message }) => {
  const { data: rating, isFetching } = useGetRatingQuery(message.ratingId);

  if (isFetching) {
    return <Skeleton active />;
  }

  if (rating) {
    return (
      <>
        <Typography.Paragraph italic>
          Người mua đã để lại nhận xét:
        </Typography.Paragraph>
        <RatingRow rating={rating} />
      </>
    );
  }

  return null;
};
