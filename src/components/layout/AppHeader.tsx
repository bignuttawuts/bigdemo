import { HomeOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';

import type { MenuProps } from 'antd';
import { Button, Dropdown, Layout, Menu, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;
const { Header } = Layout;

const items1: MenuProps['items'] = [
  {
    key: '1',
    icon: <HomeOutlined />,
    label: (
      <Link to="/admin">
        Home
      </Link>
    ),
  },
];

const items: MenuProps['items'] = [
  {
    key: '1',
    icon: <LogoutOutlined />,
    label: (
      <Link to="/login">
        Log out
      </Link>
    ),
  },
];

const AppHeader = () => {
  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <Link to={'/admin'}>
        <Title level={3} style={{ color: 'white', marginTop: 0, marginBottom: 0 }}>
          Big Demo
        </Title>
      </Link>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={items1}
        style={{ flex: 1, minWidth: 0, marginLeft: 24 }}
      />
      <Dropdown menu={{ items }} placement="bottomLeft" >
        <Button icon={<UserOutlined />}><span>Nuttawut Singhabut</span></Button>
      </Dropdown>
    </Header>
  );
};

export default AppHeader;