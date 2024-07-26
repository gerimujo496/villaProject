import { Villa } from "../../types/villa";
import { FunctionPropsHandleWishAndBuy } from "./type";
import styles from "./VillaCard.module.css";
export const isVillaInWishListHelper = (
  villaWishList: Villa[],
  villaId: string
) => {
  return villaWishList.some((villa) => villa.id === villaId);
};

export const isVillaInBuyListHelper = (
  villaBuyList: Villa[],
  villaId: string
) => {
  return villaBuyList.some((villa) => villa.id === villaId);
};

export const handleAddVillaToWishList = (
  args: FunctionPropsHandleWishAndBuy
) => {
  if (args.isInTheList) {
    args.removeFromTheList(args.villa.id);
    return;
  }
  args.addToList(args.villa);
};

export const handleAddVillaToCart = (args: FunctionPropsHandleWishAndBuy) => {
  if (args.isInTheList) {
    args.removeFromTheList(args.villa.id);
    return;
  }
  args.addToList(args.villa);
};

export const formatVillaCardProperties = (villa: Villa) => {
  return [
    { propertyName: "Price", propertyData: `${villa.price} €` },
    { propertyName: "Area", propertyData: `${villa.area} m²` },
    {
      propertyName: "Location",
      propertyData: `${villa.locationType} ,${villa.location} `,
    },
    { propertyName: "Floors", propertyData: villa.floors },
    { propertyName: "Rooms", propertyData: villa.rooms },
    { propertyName: "Bathrooms", propertyData: villa.bathrooms },
  ];
};

export const BadgeRibonStyle = (isForSale: boolean) => {
  if (isForSale) {
    return styles.BadgeRibonDisplayNone;
  }
  return styles.BadgeRibonDisplayBlock;
};

export const BuyNowOpacity = (isForSale: boolean) => {
  if (isForSale) {
    return styles.buyNowOpacity1;
  }
  return styles.buyNowOpacity03;
};
