import VillaCard from "../VillaCard/VillaCard";
import styles from "./WishList.module.css";
import { useStore } from "../../store/store";

export const WishList = () => {
  const { villaWishList } = useStore();

  return (
    <div className={styles.wishListContainer}>
      {villaWishList.map((item) => (
        <VillaCard key={item.id} villa={item} />
      ))}
    </div>
  );
};
