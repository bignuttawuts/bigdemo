import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Flex, Input, Layout, Table } from 'antd';

const { Search } = Input;
const { Content } = Layout;

export default function Users() {
  return (
    <div>
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
                <Button type="primary" icon={<PlusOutlined />}>Add User</Button>
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