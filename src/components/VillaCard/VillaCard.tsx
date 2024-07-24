import { Card, notification } from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import { useStore } from "../../store/store";
import { Villa } from "../../types/villas";
import React from "react";
import { NotificationPlacement } from "antd/es/notification/interface";

import {
  handleAddVillaToCart,
  handleAddVillaToWishList,
  isVillaInBuyListHelper,
  isVillaInWishListHelper,
} from "./helper";
import useSellVilla from "../../hooks/useSellVilla";


interface Props {
  villa: Villa;
}

const VillaCard: React.FC<Props> = (villaProps) => {
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

  const isVillaInWishList = isVillaInWishListHelper(
    villaWishList,
    villaProps.villa.id
  );
  const isVillaInBuyList = isVillaInBuyListHelper(
    villaBuyList,
    villaProps.villa.id
  );

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
    if (villaProps.villa.isForSale) {
      mutate(villaProps.villa.id, {
        onSuccess: () => {
          setVillaIsBoughtToTrue(villaProps.villa.id);
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
      style={{ width: 300, cursor: "pointer" }}
      cover={
        <img
          onClick={() => navigate(`/villas/id`)}
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        isVillaInWishList ? (
          <HeartFilled
            style={{ color: "#1890ff" }}
            onClick={(e) => {
              e.stopPropagation();
              handleAddVillaToWishList({
                villa: villaProps.villa,
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
                villa: villaProps.villa,
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
            color: villaProps.villa.isForSale
              ? "rgba(0, 0, 0, 0.45)"
              : "#1890ff",
          }}
          onClick={(e) => {
            e.stopPropagation();
            buyVilla();
          }}
        >
          {villaProps.villa.isForSale ? "BUY NOW" : "IS SOLD"}
        </strong>,

        <ShoppingCartOutlined
          style={{
            color: isVillaInBuyList ? "#1890ff" : "rgba(0, 0, 0, 0.45)",
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleAddVillaToCart({
              villa: villaProps.villa,
              isInTheList: isVillaInBuyList,
              removeFromTheList: removeVillaFromBuyList,
              addToList: addVillaToBuyList,
            });
          }}
          key="cart"
        />,
      ]}
    >
      {contextHolder}
      <Meta title={villaProps.villa.location} />
      <div style={{ marginTop: 16 }}>
        <p>
          <strong>Price:</strong> {`${villaProps.villa.price}€`}
        </p>
        <p>
          <strong>Size:</strong> {villaProps.villa.area} sqm
        </p>
        <p>
          <strong>Location:</strong>{" "}
          {`${villaProps.villa.locationType} ,${villaProps.villa.location} `}
        </p>
        <p>
          <strong>Price:</strong> €{villaProps.villa.price}
        </p>
        <p>
          <strong>Floors:</strong> {villaProps.villa.floors}
        </p>
        <p>
          <strong>Rooms:</strong> {villaProps.villa.numOfRooms}
        </p>
        <p>
          <strong>Bathrooms:</strong> {villaProps.villa.numOfBathrooms}
        </p>
      </div>
    </Card>
  );
};

export default VillaCard;
