import { Form, Input, Modal, Select } from 'antd';
import { createUser, updateUser } from '../../../services/userService';
import { User } from '../../../types';
import { useEffect, useState } from 'react';

type Props = {
  readonly open: boolean
  readonly onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void
  readonly onOk: (values: unknown) => void
  readonly data: User
}

export default function UserModal({ open, onCancel, onOk, data }: Props) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    form.resetFields()
    form.setFieldsValue(data)
  }, [data, form])

  const handleOk = async () => {
    setLoading(true)

    const values = await form.validateFields()
    if (values.userId) {
      await updateUser(values)
    } else {
      await createUser(values)
    }
    setLoading(false)

    if (onOk) onOk(values)
  }

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    form.resetFields()
    if (onCancel) onCancel(e)
  }

  return <Modal
    title="Add User"
    open={open}
    onCancel={handleCancel}
    onOk={handleOk}
    okText='Submit'
    confirmLoading={loading}
  >
    <Form
      form={form}
      layout='vertical'
    >
      <Form.Item name='userId' hidden>
        <Input />
      </Form.Item>
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
      <Form.Item
        label="Role"
        name="role"
        rules={[
          { required: true, message: 'Please select role' }
        ]}
      >
        <Select
          options={[
            { value: 'Administrator', label: 'Administrator' },
            { value: 'Support', label: 'Support' },
            { value: 'Accouting', label: 'Accouting' },
          ]}
        >
        </Select>
      </Form.Item>
    </Form>
  </Modal >
}