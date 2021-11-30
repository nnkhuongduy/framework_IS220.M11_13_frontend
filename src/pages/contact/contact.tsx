import { Col, Row } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';

import { theme } from 'src/theme';
import { ContactList } from 'src/components/message/contact-list';
import { ChatBox } from 'src/components/message/chatbox';

const ConditionalRender = () => {
  const { id: contactId } = useParams<{ id: string }>();

  const isSmall = useMediaQuery({
    query: `(max-width: ${theme.breakpoints.sm}px)`,
  });

  if (isSmall) {
    if (contactId) {
      return (
        <Col span={24}>
          <ChatBox />
        </Col>
      );
    } else {
      return (
        <Col span={24}>
          <ContactList />
        </Col>
      );
    }
  }

  return (
    <>
      <Col span={8}>
        <ContactList />
      </Col>
      <Col span={16}>
        <ChatBox />
      </Col>
    </>
  );
};

export const ContactPage = () => {
  return (
    <Row gutter={16}>
      <ConditionalRender />
    </Row>
  );
};
