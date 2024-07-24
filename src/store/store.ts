// // store.ts
// import {create} from 'zustand';
// import { createFilterSlice, FilterSlice } from './filterSlice';


// // Combine the slices into a single store type
// interface Store extends FilterSlice {}

// // Create the Zustand store
// export const useStore = create<Store>((...set) => ({
//   ...createFilterSlice(...set),
// }));
import { create } from "zustand";
import { Villa } from "../types/villas";
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


export const useStore = create<ZustandStore>((...set) => ({
  villaWishList: [],
  addVillaToWishList: addVillaToWishList(set),
  removeVillaFromWishList: removeVillaFromWishList(set),
  villaBuyList: [],
  villaOpenDetails: {},
  addVillaToBuyList: addVillaToBuyList(set),
  removeVillaFromBuyList: removeVillaFromBuyList(set),
  setVillaOpenDetails: setVillaOpenDetails(set),
  setVillaIsBoughtToTrue: setVillaIsBoughtToTrue(set),
  ...createFilterSlice(...set)
}));
