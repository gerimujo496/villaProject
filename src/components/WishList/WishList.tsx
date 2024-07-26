import VillaCard from "../VillaCard/VillaCard";
import styles from "./WishList.module.css";
import { useStore } from "../../store/store";
import { Empty } from "antd";

export const WishList = () => {
  const { villaWishList } = useStore();

  return (
    <div className={styles.wishListContainer}>
      {villaWishList.length>0?  villaWishList.map((item) => (
        <VillaCard key={item.id} villa={item} />
      )):<Empty/>}
    </div>
  );
};
