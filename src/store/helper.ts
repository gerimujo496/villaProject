import { Villa } from "../types/villas";
import { ZustandStore } from "../types/zustandStore";


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
    villaBuyList: [...store.villaBuyList, villa],
  }));
};

export const removeVillaFromBuyList = (set: any) => (id: string) => {
  set((store: ZustandStore) => ({
    villaBuyList: [...store.villaBuyList.filter((item) => item.id != id)],
  }));
};
export const setVillaOpenDetails = (set: any) => (villa: Villa) => {
  set({
    setVillaOpenDetails: villa,
  });
};
export const setVillaIsBoughtToTrue = (set: any) => (id: string) => {
  set((store: ZustandStore) => ({
    villaBuyList: store.villaBuyList.map((item) =>
      item.id === id ? { ...item, isForSale: false } : item
    ),
    villaWishList: store.villaWishList.map((item) =>
      item.id === id ? { ...item, isForSale: false } : item
    ),
  }));
};
