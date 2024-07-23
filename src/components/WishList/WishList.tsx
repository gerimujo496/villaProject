import React from "react";
import VillaCard from "../VillaCard";
import styles from "./WishList.module.css";

export const WishList = () => {
  return (
    <div className={styles.wishListContainer}>
      <VillaCard />
      <VillaCard />
      <VillaCard />
      <VillaCard />
    </div>
  );
};
