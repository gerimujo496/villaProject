import React from "react";
import { Modal, Button, Empty, notification, Spin } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { BuyListElement } from "../BuyListElement/BuyListElement";
import styles from "./ModalCart.module.css";
import { useStore } from "../../store/store";
import { buyAllVillas, totalVillasPriceCalculator } from "./helper";
import useSellVilla from "../../hooks/useSellVilla";
import { NotificationPlacement } from "antd/es/notification/interface";

interface Props {
  handleOk: () => void;
  handleCancel: () => void;
  isModalOpen: boolean;
}
export const ModalCart: React.FC<Props> = ({
  handleOk,
  handleCancel,
  isModalOpen,
}) => {
  const sellVilla = useSellVilla();
  const { villaBuyList, removeVillaFromBuyList } = useStore();
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
  return (
    <Modal
      title="Cart List"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div>
        <div>
          {villaBuyList.map((item) => (
            <BuyListElement
              id={item.id}
              image={item.image}
              location={item.location}
              price={item.price}
            />
          ))}
        </div>
        {villaBuyList.length > 0 ? (
          <div className={styles.footer}>
            {`Total Pirce: ${totalVillasPriceCalculator(villaBuyList)} €`}
            {sellVilla.isPending ? (
              <Spin />
            ) : (
              <Button
                type="primary"
                onClick={() =>
                  buyAllVillas({
                    data: villaBuyList,
                    sellVilla,
                    openNotification,
                    removeVillaFromBuyList,
                  })
                }
                icon={<ShoppingCartOutlined />}
              />
            )}
          </div>
        ) : (
          <Empty />
        )}
      </div>
    </Modal>
  );
};
