import { DownOutlined, DownloadOutlined, ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Dropdown, Flex, Input, Layout, Modal, Space, Table } from 'antd';
import UserModal from './components/UserModal';
import { useEffect, useState } from 'react';
import { deleteUser, fetchUserList } from '../../services/userService';
import { TransferResponse, User } from '../../types';
import moment from 'moment';

const { Search } = Input;
const { Content } = Layout;

const initialUser = {} as User

export default function Users() {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [users, setUsers] = useState<User[]>([])
  const [userData, setUserData] = useState<User>(initialUser)

  useEffect(() => {
    fetchUserList()
      .then((response: TransferResponse<User[]>) => {
        setUsers(response.data)
      })
  }, []);

  const handleAddUser = () => {
    setUserData(initialUser)
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
        data={userData}
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
              dataSource={users}
              columns={
                [
                  {
                    title: 'User',
                    render: (_, record) => `${record.firstname} ${record.lastname}`
                  },
                  {
                    title: 'Role',
                    dataIndex: 'role'
                  },
                  {
                    title: 'Last Login',
                    dataIndex: 'lastLogin',
                    render: (value) => value ? moment(value).format('DD MMM YYYY HH:mm') : ''
                  },
                  {
                    title: 'Joined Date',
                    dataIndex: 'joinedDate',
                    render: (value) => value ? moment(value).format('DD MMM YYYY HH:mm') : ''
                  },
                  {
                    title: 'Actions',
                    dataIndex: 'userId',
                    render: (value, record) => <Dropdown menu={{
                      items: [
                        {
                          key: '0',
                          label: 'Edit',
                          onClick: () => {
                            setUserData(record)
                            setModalOpen(true)
                          }
                        }, {
                          key: '1',
                          label: 'Delete',
                          onClick: () => {
                            Modal.confirm({
                              title: 'Confirmation',
                              icon: <ExclamationCircleFilled />,
                              content: 'Are you sure you want to delete item',
                              onOk() {
                                deleteUser(value)
                              },
                            });
                          }
                        }
                      ]
                    }} trigger={['click']}>
                      <Button type='link'>
                        <Space>
                          Actions
                          <DownOutlined />
                        </Space>
                      </Button>
                    </Dropdown>
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