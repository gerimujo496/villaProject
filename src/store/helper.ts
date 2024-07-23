import { Villa } from "../types/villas";
import { ZustandStore } from "./store";

export const addVillaToWishList = (set: any) => (villa: Villa) => {
  set((store: ZustandStore) => ({
    villaWishList: [...store.villaWishList, villa],
  }));
};

export const removeVillaFromWishList = (set: any) => (id: string) => {
  set((store: ZustandStore) => ({
    villaWishList: [...store.villaWishList.filter((item) => item.id != id)],
  }));
};

export const addVillaToBuyList = (set: any) => (villa: Villa) => {
  set((store: ZustandStore) => ({
    villaWishList: [...store.villaWishList, villa],
  }));
};

export const removeVillaFromBuyList = (set: any) => (id: string) => {
  set((store: ZustandStore) => ({
    villaWishList: [...store.villaWishList.filter((item) => item.id != id)],
  }));
};
