import { IdcardOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';

import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';

const { Sider } = Layout;

const items2: MenuProps['items'] = [
  // {
  //   icon: DashboardOutlined,
  //   label: 'Dashbaord',
  //   path: '/admin/home'
  // },
  {
    icon: NotificationOutlined,
    label: 'Campaign',
    path: '',
  },
  {
    icon: IdcardOutlined,
    label: 'Member',
    path: '',
  },
  {
    icon: UserOutlined,
    label: 'User Management',
    subMenu: [
      { label: 'Users', path: '/admin/users' },
      { label: 'Roles', path: '/admin/roles' },
      { label: 'Permissions', path: '/admin/permissions' },
    ]
  }
].map(
  (menu, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(menu.icon),
      label: menu.path ? <Link to={menu.path}>{menu.label}</Link> : menu.label,

      children: menu.subMenu?.map((subMenu, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: <Link to={subMenu.path}>{subMenu.label}</Link>,
        };
      }),
    };
  },
);

const AdminLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <AppHeader />
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <div>
            <Outlet />
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;