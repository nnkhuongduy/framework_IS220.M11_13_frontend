import { Row, Col, Form, Button, Input } from 'antd';
import { useParams } from 'react-router';
import { useSendMessageMutation } from 'src/services/chat';

export const MessageBox = () => {
  const { id: chatId } = useParams<{ id: string }>();
  const [form] = Form.useForm();

  const [sendMessage] = useSendMessageMutation();

  const onFinish = ({ message }: { message: string }) => {
    sendMessage({ message, chatId });
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Row gutter={16}>
        <Col flex="auto">
          <Form.Item
            name="message"
            rules={[{ required: true, message: 'Tin nhắn trống!' }]}
          >
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
          </Form.Item>
        </Col>
        <Col>
          <Button type="primary" htmlType="submit">Gửi</Button>
        </Col>
      </Row>
    </Form>
  );
};
