import { Card, notification, Tooltip, Typography } from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
  EnvironmentOutlined,
  EuroOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import { useStore } from "../../store/store";
import { Villa } from "../../types/villa";
import { NotificationPlacement } from "antd/es/notification/interface";
import { FaRegBuilding } from "react-icons/fa";
import {
  MdOutlineBathroom,
  MdOutlineBedroomChild,
  MdOutlineAreaChart,
} from "react-icons/md";

import {
  formatVillaCardProperties,
  handleAddVillaToCart,
  handleAddVillaToWishList,
  isVillaInBuyListHelper,
  isVillaInWishListHelper,
} from "./helper";
import useSellVilla from "../../hooks/useSellVilla";

const { Text } = Typography;

interface Props {
  villa: Villa;
}

const VillaCard = ({ villa }: Props) => {
  const navigate = useNavigate();
  const { mutate } = useSellVilla();

  const {
    addVillaToBuyList,
    addVillaToWishList,
    removeVillaFromWishList,
    removeVillaFromBuyList,
    setVillaIsBoughtToTrue,
    villaWishList,
    villaBuyList,
  } = useStore();

  const isVillaInWishList = isVillaInWishListHelper(villaWishList, villa.id);
  const isVillaInBuyList = isVillaInBuyListHelper(villaBuyList, villa.id);

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (
    message: string,
    description: string,
    placement: NotificationPlacement
  ) => {
    api.info({
      message,
      description,
      placement,
    });
  };

  const buyVilla = () => {
    if (villa.isForSale) {
      mutate(villa.id, {
        onSuccess: () => {
          setVillaIsBoughtToTrue(villa.id);
          openNotification("Success", "The villa is bought", "topLeft");
        },
        onError: () => {
          openNotification("Error", "An error occurred", "topLeft");
        },
      });
    }
  };

  return (
    <Card
      style={{
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s",
        overflow: "hidden",
      }}
      hoverable
      cover={
        <img
          alt="Villa"
          src={villa.image}
          style={{
            borderRadius: "8px 8px 0 0",
            height: "200px",
            objectFit: "cover",
          }}
        />
      }
      onClick={() => navigate(`/villas/${villa.id}`)}
    >
      {contextHolder}
      <Meta title={villa.location} />
      <div style={{ marginTop: 16 }}>
        {formatVillaCardProperties(villa).map((item) => (
          <div
            style={{
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
            }}
            key={item.propertyName}
          >
            {item.propertyName === "Location" && (
              <EnvironmentOutlined style={{ marginRight: 8 }} />
            )}
            {item.propertyName === "Price" && (
              <EuroOutlined style={{ marginRight: 8 }} />
            )}
            {item.propertyName === "Rooms" && (
              <MdOutlineBedroomChild style={{ marginRight: 8 }} />
            )}
            {item.propertyName === "Bathrooms" && (
              <MdOutlineBathroom style={{ marginRight: 8 }} />
            )}
            {item.propertyName === "Floors" && (
              <FaRegBuilding style={{ marginRight: 8 }} />
            )}
            {item.propertyName === "Area" && (
              <MdOutlineAreaChart style={{ marginRight: 8 }} />
            )}
            <Text strong>
              {item.propertyName}: {item.propertyData}
            </Text>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Tooltip title="Add villa to wishlist">
          {isVillaInWishList ? (
            <HeartFilled
              style={{ color: "#1890ff", cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                handleAddVillaToWishList({
                  villa: villa,
                  isInTheList: isVillaInWishList,
                  removeFromTheList: removeVillaFromWishList,
                  addToList: addVillaToWishList,
                });
              }}
            />
          ) : (
            <HeartOutlined
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                handleAddVillaToWishList({
                  villa: villa,
                  isInTheList: isVillaInWishList,
                  removeFromTheList: removeVillaFromWishList,
                  addToList: addVillaToWishList,
                });
              }}
            />
          )}
        </Tooltip>
        <strong
          style={{
            color: villa.isForSale ? "#1890ff" : "rgba(0, 0, 0, 0.45)",
            cursor: "pointer",
          }}
          onClick={(e) => {
            e.stopPropagation();
            buyVilla();
          }}
        >
          {villa.isForSale ? "BUY NOW" : "IS SOLD"}
        </strong>
        <Tooltip title="Add villa to shopping cart">
          <ShoppingCartOutlined
            style={{
              color: isVillaInBuyList ? "#1890ff" : "rgba(0, 0, 0, 0.45)",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleAddVillaToCart({
                villa: villa,
                isInTheList: isVillaInBuyList,
                removeFromTheList: removeVillaFromBuyList,
                addToList: addVillaToBuyList,
              });
            }}
          />
        </Tooltip>
      </div>
    </Card>
  );
};

export default VillaCard;
