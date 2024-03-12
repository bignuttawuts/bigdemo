import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import AppHeader from './AppHeader';

const AppLayout = () => {
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <Outlet />
      </Layout>
    </Layout>
  );
};

export default AppLayout;