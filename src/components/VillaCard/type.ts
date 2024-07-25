import { Villa } from "../../types/villa";

export interface FunctionPropsHandleWishAndBuy {
  villa: Villa;
  isInTheList: boolean;
  removeFromTheList: (id: string) => void;
  addToList: (villa: Villa) => void;
}
