/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Modal } from 'antd';
import { createUser } from '../../../services/userService';
import { User } from '../../../types';

type Props = {
  readonly open: boolean
  readonly onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void
  readonly onOk: (values: unknown) => void
}

export default function UserModal({ open, onCancel, onOk }: Props) {
  const [form] = Form.useForm()

  const handleOk = () => {
    form.validateFields()
      .then((values: User) => {
        createUser(values)
        if (onOk) onOk(values)
      })
  }

  return <Modal
    title="Add User"
    open={open}
    onCancel={onCancel}
    onOk={handleOk}
  >
    <Form
      form={form}
      layout='vertical'
    >
      <Form.Item
        label="First name"
        name="firstname"
        rules={[
          { required: true, message: 'Please input first name' }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Last name"
        name="lastname"
        rules={[
          { required: true, message: 'Please input first name' }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please input email' }
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  </Modal >
}