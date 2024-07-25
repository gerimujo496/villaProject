import { CloseOutlined } from "@ant-design/icons";
import styles from "./BuyListElement.module.css";

export const BuyListElement = () => {
  return (
    <div className={styles.buyListElementContainer}>
      <img
        className={styles.imageBuyListElement}
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      ></img>
      <p>Emri i viles</p>
      <p>Cmimi</p>

      <CloseOutlined className={styles.remove} />
    </div>
  );
};
