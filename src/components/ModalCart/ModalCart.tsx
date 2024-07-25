import React from "react";
import { Modal, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { BuyListElement } from "../BuyListElement/BuyListElement";
import styles from "./ModalCart.module.css";

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
  return (
    <Modal
      title="Cart List"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div  >
        <div>
          <BuyListElement /> <BuyListElement /> <BuyListElement />
        </div>
        <div className={styles.footer}>
          Total
          <Button type="primary" icon={<ShoppingCartOutlined />} />
        </div>
      </div>
    </Modal>
  );
};
