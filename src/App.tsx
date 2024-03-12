import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AppLayout from './components/layout/AppLayout';
import AdminLayout from './components/layout/AdminLayout';
import Login from './pages/auth/Login';
import Home from './pages/home/Home';
import Users from './pages/user-management/Users';

const App: React.FC = () => {

  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "login",
          element: <Login />
        }
      ]
    }, {
      path: "admin",
      element: <AdminLayout />,
      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path: "users",
          element: <Users />
        }
      ]
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default App;