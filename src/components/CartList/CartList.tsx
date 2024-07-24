import VillaCard from "../VillaCard/VillaCard";
import styles from "./CardList.module.css";
import { useStore } from "../../store/store";

export const CartList = () => {
  const { villaBuyList } = useStore();

  return (
    <div className={styles.wishListContainer}>
      {villaBuyList.map((item) => (
        <VillaCard villa={item} />
      ))}
    </div>
  );
};
