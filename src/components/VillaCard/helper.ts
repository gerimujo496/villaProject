import { Villa } from "../../types/villas";
import { FunctionPropsHandleWishAndBuy } from "./type";

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
