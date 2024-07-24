import { create } from "zustand";

import {
  addVillaToBuyList,
  addVillaToWishList,
  removeVillaFromBuyList,
  removeVillaFromWishList,
  setVillaIsBoughtToTrue,
  setVillaOpenDetails,
} from "./helper";
import { ZustandStore } from "../types/zustandStore";


export const useStore = create<ZustandStore>((set) => ({
  villaWishList: [],
  addVillaToWishList: addVillaToWishList(set),
  removeVillaFromWishList: removeVillaFromWishList(set),
  villaBuyList: [],
  villaOpenDetails: {},
  addVillaToBuyList: addVillaToBuyList(set),
  removeVillaFromBuyList: removeVillaFromBuyList(set),
  setVillaOpenDetails: setVillaOpenDetails(set),
  setVillaIsBoughtToTrue: setVillaIsBoughtToTrue(set),
}));
