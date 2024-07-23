import { create } from "zustand";
import { LocationType } from "../types/locationType";
import { Villa } from "../types/villas";
import { addVillaToWishList, removeVillaFromWishList } from "./helper";


export interface ZustandStore {
  villaWishList: Villa[];
  addVillaToWishList: (villa: Villa) => void;
  removeVillaFromWishList: (id: string) => void;
}

const useStore = create<ZustandStore>((set) => ({
  villaWishList: [],
  addVillaToWishList: addVillaToWishList(set),
  removeVillaFromWishList: removeVillaFromWishList(set),
}));



