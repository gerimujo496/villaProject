import React from "react";
import { Card, Row, Col, Button, Typography } from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  ArrowLeftOutlined,
  HeartFilled,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { useNavigate, useParams } from "react-router-dom";
import {
  MdOutlineBathroom,
  MdOutlineBedroomChild,
  MdOutlineAreaChart,
} from "react-icons/md";
import { useVillaDetail } from "../hooks/useVillaDetail";
import {
  handleAddVillaToCart,
  handleAddVillaToWishList,
  isVillaInBuyListHelper,
  isVillaInWishListHelper,
} from "../components/VillaCard/helper";
import { useStore } from "../store/store";

const { Title, Text } = Typography;

const VillaDetails: React.FC = () => {
  const navigate = useNavigate();

  const { villaId } = useParams();
  const { data } = useVillaDetail(villaId);
  const {
    villaWishList,
    villaBuyList,
    removeVillaFromWishList,
    addVillaToWishList,
    removeVillaFromBuyList,
    addVillaToBuyList,
  } = useStore();

  if (data) {
    const isVillaInWishList = isVillaInWishListHelper(villaWishList, data.id);
    const isVillaInBuyList = isVillaInBuyListHelper(villaBuyList, data.id);
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
                src={data?.image}
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              />
            </Col>
            <Col span={12}>
              <Meta
                title={
                  <Title level={3} style={{ marginBottom: 8 }}>
{data.location}
                  </Title>
                }
              />
              <div style={{ marginTop: 40 }}>
                <Text strong style={{ fontSize: "18px" }}>
                  <MdOutlineAreaChart style={{ marginRight: 8 }} />
                  Size:
                </Text>{" "}
                <Text style={{ fontSize: "18px" }}>{data?.area} m²</Text>
                <br />
                <Text strong style={{ fontSize: "18px" }}>
                  <HeartOutlined style={{ marginRight: 8 }} />
                  Location:
                </Text>{" "}
                <Text style={{ fontSize: "18px" }}>{data?.location}</Text>
                <br />
                <Text strong style={{ fontSize: "18px" }}>
                  <ShoppingCartOutlined style={{ marginRight: 8 }} />
                  Price:
                </Text>{" "}
                <Text style={{ fontSize: "18px" }}>€{data?.price}</Text>
                <br />
                <Text strong style={{ fontSize: "18px" }}>
                  <HeartOutlined style={{ marginRight: 8 }} />
                  Floors:
                </Text>{" "}
                <Text style={{ fontSize: "18px" }}>{data?.floors}</Text>
                <br />
                <Text strong style={{ fontSize: "18px" }}>
                  <MdOutlineBedroomChild style={{ marginRight: 8 }} />
                  Rooms:
                </Text>{" "}
                <Text style={{ fontSize: "18px" }}>{data?.rooms}</Text>
                <br />
                <Text strong style={{ fontSize: "18px" }}>
                  <MdOutlineBathroom style={{ marginRight: 8 }} />
                  Bathrooms:
                </Text>{" "}
                <Text style={{ fontSize: "18px" }}>{data?.bathrooms}</Text>
              </div>
              <div style={{ marginTop: 30 }}>
                {isVillaInWishList ? (
                  <HeartFilled
                    style={{ color: "#1890ff", cursor: "pointer", fontSize:40 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddVillaToWishList({
                        villa: data,
                        isInTheList: isVillaInWishList,
                        removeFromTheList: removeVillaFromWishList,
                        addToList: addVillaToWishList,
                      });
                    }}
                  />
                ) : (
                  <HeartOutlined
                    style={{ cursor: "pointer", fontSize:40 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddVillaToWishList({
                        villa: data,
                        isInTheList: isVillaInWishList,
                        removeFromTheList: removeVillaFromWishList,
                        addToList: addVillaToWishList,
                      });
                    }}
                  />
                )}
                <ShoppingCartOutlined

                  style={{
                    color: isVillaInBuyList ? "#1890ff" : "rgba(0, 0, 0, 0.45)",
                    cursor: "pointer",
                    fontSize:40
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddVillaToCart({
                      villa: data,
                      isInTheList: isVillaInBuyList,
                      removeFromTheList: removeVillaFromBuyList,
                      addToList: addVillaToBuyList,
                    });
                  }}
                />
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
};

export default VillaDetails;
