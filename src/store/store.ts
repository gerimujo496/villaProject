import { create } from "zustand";
import { LocationType } from "../types/locationType";
import { Villa } from "../types/villas";
import { addVillaToBuyList, addVillaToWishList, removeVillaFromBuyList, removeVillaFromWishList } from "./helper";

export interface ZustandStore {
  villaWishList: Villa[];
  addVillaToWishList: (villa: Villa) => void;
  removeVillaFromWishList: (id: string) => void;
  villaBuyList: Villa[];
  addVillaToBuyList: (villa: Villa) => void;
  removeVillaFromBuyList: (id: string) => void;
}

const useStore = create<ZustandStore>((set) => ({
  villaWishList: [],
  addVillaToWishList: addVillaToWishList(set),
  removeVillaFromWishList: removeVillaFromWishList(set),
  villaBuyList: [],
  addVillaToBuyList: addVillaToBuyList(set),
  removeVillaFromBuyList: removeVillaFromBuyList(set),
}));
