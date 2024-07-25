import { Card, notification, Badge } from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import { useStore } from "../../store/store";
import { Villa } from "../../types/villa";
import { NotificationPlacement } from "antd/es/notification/interface";

import {
  formatVillaCardProperties,
  handleAddVillaToCart,
  handleAddVillaToWishList,
  isVillaInBuyListHelper,
  isVillaInWishListHelper,
} from "./helper";
import useSellVilla from "../../hooks/useSellVilla";

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
    <Badge.Ribbon
      style={{ display: villa.isForSale ? "none" : "block" }}
      text="IS SOLD"
    >
      <Card
        style={{ width: 300, cursor: "pointer" }}
        cover={
          <img
            alt="example"
            src={villa.image}
          />
        }
        onClick={() => navigate(`/villas/id`)}
        actions={[
          isVillaInWishList ? (
            <HeartFilled
              style={{ color: "#1890ff" }}
              onClick={(e) => {
                e.stopPropagation();
                handleAddVillaToWishList({
                  villa: villa,
                  isInTheList: isVillaInWishList,
                  removeFromTheList: removeVillaFromWishList,
                  addToList: addVillaToWishList,
                });
              }}
              key="like"
            />
          ) : (
            <HeartOutlined
              onClick={(e) => {
                e.stopPropagation();
                handleAddVillaToWishList({
                  villa: villa,
                  isInTheList: isVillaInWishList,
                  removeFromTheList: removeVillaFromWishList,
                  addToList: addVillaToWishList,
                });
              }}
              key="like"
            />
          ),
          <strong
            style={{
              opacity: villa.isForSale ? "1" : "0.3",
            }}
            onClick={(e) => {
              e.stopPropagation();
              buyVilla();
            }}
          >
            BUY NOW
          </strong>,

          <ShoppingCartOutlined
            style={{
              color: isVillaInBuyList ? "#1890ff" : "rgba(0, 0, 0, 0.45)",
              opacity: villa.isForSale ? "1" : "0.3",
            }}
            onClick={(e) => {
              e.stopPropagation();
              if(villa.isForSale){
                handleAddVillaToCart({
                  villa: villa,
                  isInTheList: isVillaInBuyList,
                  removeFromTheList: removeVillaFromBuyList,
                  addToList: addVillaToBuyList,
                });
              }
             
            }}
            key="cart"
          />,
        ]}
      >
        {contextHolder}
        <Meta title={villa.location} />
        <div style={{ marginTop: 16 }}>
          {formatVillaCardProperties(villa).map((item) => (
            <p key={item.propertyName}>
              <strong>{item.propertyName}</strong>
              {` ${item.propertyData}`}
            </p>
          ))}
        </div>
      </Card>
    </Badge.Ribbon>
  );
};

export default VillaCard;
