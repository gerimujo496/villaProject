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
import { createFilterSlice } from "./slices/filterSlice";


export const useStore = create<ZustandStore>((set, get, state) => ({
    villaWishList: [],
    addVillaToWishList: addVillaToWishList(set),
    removeVillaFromWishList: removeVillaFromWishList(set),
    villaBuyList: [],
    villaOpenDetails: {},
    addVillaToBuyList: addVillaToBuyList(set),
    removeVillaFromBuyList: removeVillaFromBuyList(set),
    setVillaOpenDetails: setVillaOpenDetails(set),
    setVillaIsBoughtToTrue: setVillaIsBoughtToTrue(set),
    ...createFilterSlice(set, get, state)
  }));
