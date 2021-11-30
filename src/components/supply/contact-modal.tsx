import { Modal, Form, Input } from 'antd';
import { FC } from 'react';

interface Props {
  visible: boolean;
  title: string;
  initialMessage: string;
  onSubmit: (message: string) => Promise<void>;
  onCancel: () => void;
}

export const ContactModal: FC<Props> = ({
  visible,
  title,
  initialMessage,
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title={title}
      okText="Gửi"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={() => {
        form.validateFields().then((values) => {
          form.resetFields();
          onSubmit(values.message);
        });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ message: initialMessage }}
        requiredMark={false}
      >
        <Form.Item
          name="message"
          label="Lời nhắn"
          rules={[{ required: true, message: 'Vui lòng nhập lời nhắn!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
