import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Flex, Input, Layout, Table } from 'antd';
import UserModal from './components/UserModal';
import { useState } from 'react';

const { Search } = Input;
const { Content } = Layout;

export default function Users() {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const handleAddUser = () => {
    setModalOpen(true)
  }

  const handleCancelUserModal = () => {
    setModalOpen(false)
  }

  const handleOkUserModal = () => {
    setModalOpen(false)
  }

  return (
    <div>
      <UserModal
        open={modalOpen}
        onCancel={handleCancelUserModal}
        onOk={handleOkUserModal}
      />
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>User Management</Breadcrumb.Item>
        <Breadcrumb.Item>Users</Breadcrumb.Item>
      </Breadcrumb>
      <Content>
        <Card>
          <Flex vertical gap={'small'}>
            <Flex justify="space-between">
              <div>
                <Search placeholder="Search user" style={{ width: 200 }} />
              </div>
              <Flex gap={'small'}>
                <Button icon={<DownloadOutlined />}>Export</Button>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddUser}
                >Add User</Button>
              </Flex>
            </Flex>
            <Table
              columns={
                [
                  {
                    title: 'User'
                  },
                  {
                    title: 'Role'
                  },
                  {
                    title: 'Last Login'
                  },
                  {
                    title: 'Joined Date'
                  },
                  {
                    title: 'Actions'
                  }
                ]
              }
            />
          </Flex>
        </Card>
      </Content>
    </div>
  )
}