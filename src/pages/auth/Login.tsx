import { GoogleOutlined } from '@ant-design/icons';
import { Button, Card, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate()

  const handleOnClick = () => {
    navigate('/admin')
  }

  return (
    <Card>
      <Flex justify='center'>
        <Button

          icon={<GoogleOutlined />}
          onClick={handleOnClick}

        >Google Login</Button>
      </Flex>
    </Card>
  )
}