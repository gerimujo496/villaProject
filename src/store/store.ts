import { create } from "zustand";

import {
  addVillaToBuyList,
  addVillaToWishList,
  removeVillaFromBuyList,
  removeVillaFromWishList,
  returnVillaBuyList,
  returnVillaWishList,
  setVillaIsBoughtToTrue,
  
} from "./helper";
import { ZustandStore } from "../types/zustandStore";
import { createFilterSlice } from "./slices/filterSlice";


export const useStore = create<ZustandStore>((set, get, state) => ({
    villaWishList: returnVillaWishList(),
    addVillaToWishList: addVillaToWishList(set),
    removeVillaFromWishList: removeVillaFromWishList(set),
    villaBuyList: returnVillaBuyList(),
    
    addVillaToBuyList: addVillaToBuyList(set),
    removeVillaFromBuyList: removeVillaFromBuyList(set),
   
    setVillaIsBoughtToTrue: setVillaIsBoughtToTrue(set),
    ...createFilterSlice(set, get, state)
  }));
