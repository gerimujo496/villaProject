import React from 'react';
import { Layout, Menu, Input, Card, Row, Col } from 'antd';
import "./App.css"

const { Header, Content } = Layout;

const VillaCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <Card title={title} style={{ width: 300, margin: '16px' }}>
    <p>{description}</p>
  </Card>
);

const Filter: React.FC = () => {
  return (
    <div style={{ padding: '16px' }}>
      <Input placeholder="Search for villas..." style={{ width: 300 }} />
    </div>
  );
};

const VillaList: React.FC = () => {
  const villas = [
    { title: 'Villa Sunshine', description: 'A beautiful villa with a sea view.' },
    { title: 'Villa Moonlight', description: 'A cozy villa in the mountains.' },
    { title: 'Villa Paradise', description: 'Luxurious villa with a private pool.' },
  ];

  return (
    <Row gutter={16}>
      {villas.map((villa, index) => (
        <Col span={8} key={index}>
          <VillaCard title={villa.title} description={villa.description} />
        </Col>
      ))}
    </Row>
  );
};

const App: React.FC = () => {
  return (
    <Layout>
      <Header style={{ background: '#fff', padding: 0 }}>
        <Menu mode="horizontal">
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">About</Menu.Item>
          <Menu.Item key="3">Contact</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '20px' }}>
        <Filter />
        <VillaList />
      </Content>
    </Layout>
  );
};

export default App;