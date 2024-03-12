import { Breadcrumb, Card, Layout } from 'antd';

const { Content } = Layout;

export default function Home() {
  return (
    <div>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb>
      <Content>
        <Card>
          <h1>Home</h1>
        </Card>
      </Content>
    </div>
  )
}