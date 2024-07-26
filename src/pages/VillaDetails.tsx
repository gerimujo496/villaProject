import React from 'react';
import { Card, Row, Col, Button, Typography } from 'antd';
import { ShoppingCartOutlined, HeartOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';
import { useNavigate } from 'react-router-dom';
import { MdOutlineBathroom, MdOutlineBedroomChild, MdOutlineAreaChart } from "react-icons/md";

const { Title, Text } = Typography;

const VillaDetails: React.FC = () => {
  const navigate = useNavigate();

  const handleAddVillaToWishList = () => {
    console.log("Adding to wishlist");
  };

  const handleAddVillaToCart = () => {
    console.log("Adding to cart");
  };

  return (
    <div style={{ padding: "20px", position: "relative" }}>
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("..")}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          fontSize: "24px",
        }}
      />
      <Card style={{ width: "100%", marginTop: "60px", borderRadius: "8px" }}>
        <Row gutter={16}>
          <Col span={12}>
            <img
              alt="Villa"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
          </Col>
          <Col span={12}>
            <Meta
              title={<Title level={3} style={{ marginBottom: 8 }}>Villa Sponxh Hamedani</Title>}
              description={
                <Text type="secondary" style={{ fontSize: "16px", lineHeight: 1.5 }}>
                  A spacious villa with a great mountain view. Buying this villa will make you much happier. Sometimes money can buy happiness.
                </Text>
              }
            />
            <div style={{ marginTop: 40 }}>
              <Text strong style={{ fontSize: "18px" }}><MdOutlineAreaChart style={{ marginRight: 8 }} />Size:</Text> <Text style={{ fontSize: "18px" }}>150 sqm</Text>
              <br />
              <Text strong style={{ fontSize: "18px" }}><HeartOutlined style={{ marginRight: 8 }} />Location:</Text> <Text style={{ fontSize: "18px" }}>Tirana</Text>
              <br />
              <Text strong style={{ fontSize: "18px" }}><ShoppingCartOutlined style={{ marginRight: 8 }} />Price:</Text> <Text style={{ fontSize: "18px" }}>€500,000</Text>
              <br />
              <Text strong style={{ fontSize: "18px" }}><HeartOutlined style={{ marginRight: 8 }} />Floors:</Text> <Text style={{ fontSize: "18px" }}>2</Text>
              <br />
              <Text strong style={{ fontSize: "18px" }}><MdOutlineBedroomChild style={{ marginRight: 8 }} />Rooms:</Text> <Text style={{ fontSize: "18px" }}>7</Text>
              <br />
              <Text strong style={{ fontSize: "18px" }}><MdOutlineBathroom style={{ marginRight: 8 }} />Bathrooms:</Text> <Text style={{ fontSize: "18px" }}>3</Text>
            </div>
            <div style={{ marginTop: 30 }}>
              <HeartOutlined
                onClick={handleAddVillaToWishList}
                style={{ marginRight: 20, fontSize: "28px", cursor: "pointer" }}
              />
              <ShoppingCartOutlined
                onClick={handleAddVillaToCart}
                style={{ fontSize: "28px", cursor: "pointer" }}
              />
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default VillaDetails;