import { Card, Row, Col, Button } from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router-dom";


function VillaDetails() {
  const navigate = useNavigate();
  const handleAddVillaToWishList = () => {
    console.log("adding to wishlist");
  };

  const handleAddVillaToCart = () => {
    console.log("adding to cart");
  };

  return (
    <div style={{ padding: "20px", marginBottom: "20px" }}>
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("..")}
        style={{
          position: "absolute",
          top: "4.5rem",
          left: "20px",
          fontSize: "24px",
        }}
      />
      <Card style={{ width: "100%", cursor: "pointer", marginTop: "40px" }}>
        <Row gutter={16}>
          <Col span={12}>
            <img
              alt="Villa"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              style={{ width: "100%", height: "auto" }}
            />
          </Col>
          <Col span={12}>
            <Meta
              title={
                <span style={{ fontSize: "24px" }}>Villa Sponxh Hamedani</span>
              }
              description={
                <span style={{ fontSize: "16px" }}>
                  A spacious villa with a great mountain view. Buying this villa
                  will make you much happier. Sometimes money can buy happiness.
                </span>
              }
            />
            <div style={{ marginTop: 16 }}>
              <p style={{ fontSize: "18px" }}>
                <strong>Size:</strong> 150 sqm
              </p>
              <p style={{ fontSize: "18px" }}>
                <strong>Location:</strong> Tirana
              </p>
              <p style={{ fontSize: "18px" }}>
                <strong>Price:</strong> €500,000
              </p>
              <p style={{ fontSize: "18px" }}>
                <strong>Floors:</strong> 2
              </p>
              <p style={{ fontSize: "18px" }}>
                <strong>Rooms:</strong> 7
              </p>
              <p style={{ fontSize: "18px" }}>
                <strong>Bathrooms:</strong> 3
              </p>
            </div>
            <div>
              <HeartOutlined
                onClick={handleAddVillaToWishList}
                style={{ marginRight: 16, fontSize: "24px", cursor: "pointer" }}
              />
              <ShoppingCartOutlined
                onClick={handleAddVillaToCart}
                style={{ fontSize: "24px", cursor: "pointer" }}
              />
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default VillaDetails;
