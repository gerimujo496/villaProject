import { Villa } from "../types/villa";
import { ZustandStore } from "../types/zustandStore";

export const returnVillaWishList = (): Villa[] => {
  const vilaWishListFromLocalStorage = localStorage.getItem("vilaWishList");
  if (vilaWishListFromLocalStorage == null) {
    return [];
  }
  return JSON.parse(vilaWishListFromLocalStorage);
};

export const addVillaToWishList = (set: any) => (villa: Villa) => {
  const villaWishListFromLocalStorage = localStorage.getItem("vilaWishList");

  if (villaWishListFromLocalStorage == null) {
    localStorage.setItem("vilaWishList", `[${JSON.stringify(villa)}]`);
  } else {
    const villaWishListFromLocalStorageInArray: Villa[] = JSON.parse(
      villaWishListFromLocalStorage
    );
    villaWishListFromLocalStorageInArray.push(villa);
    localStorage.setItem(
      "vilaWishList",
      JSON.stringify(villaWishListFromLocalStorageInArray)
    );
  }

  set((store: ZustandStore) => ({
    villaWishList: [...store.villaWishList, villa],
  }));
};

export const removeVillaFromWishList = (set: any) => (id: string) => {
  const villaWishListFromLocalStorage = localStorage.getItem("vilaWishList");

  if (villaWishListFromLocalStorage) {
    const villaWishListFromLocalStorageInArray: Villa[] = JSON.parse(
      villaWishListFromLocalStorage
    );
    const newVilaWishList = villaWishListFromLocalStorageInArray.filter(
      (item) => item.id != id
    );
    localStorage.setItem("vilaWishList", JSON.stringify(newVilaWishList));
  }

  set((store: ZustandStore) => ({
    villaWishList: [...store.villaWishList.filter((item) => item.id != id)],
  }));
};

export const returnVillaBuyList = (): Villa[] => {
  const vilaBuyListFromLocalStorage = localStorage.getItem("vilaBuyList");
  if (vilaBuyListFromLocalStorage == null) {
    return [];
  }
  return JSON.parse(vilaBuyListFromLocalStorage);
};

export const addVillaToBuyList = (set: any) => (villa: Villa) => {
  const villaBuyListFromLocalStorage = localStorage.getItem("vilaBuyList");

  if (villaBuyListFromLocalStorage == null) {
    localStorage.setItem("vilaBuyList", `[${JSON.stringify(villa)}]`);
  } else {
    const villaBuyListFromLocalStorageInArray: Villa[] = JSON.parse(
      villaBuyListFromLocalStorage
    );
    villaBuyListFromLocalStorageInArray.push(villa);
    localStorage.setItem(
      "vilaBuyList",
      JSON.stringify(villaBuyListFromLocalStorageInArray)
    );
  }
  set((store: ZustandStore) => ({
    villaBuyList: [...store.villaBuyList, villa],
  }));
};

export const removeVillaFromBuyList = (set: any) => (id: string) => {
  const villaBuyListFromLocalStorage = localStorage.getItem("vilaBuyList");

  if (villaBuyListFromLocalStorage) {
    const villaBuyListFromLocalStorageInArray: Villa[] = JSON.parse(
      villaBuyListFromLocalStorage
    );
    const newVilaBuyList = villaBuyListFromLocalStorageInArray.filter(
      (item) => item.id != id
    );
    localStorage.setItem("vilaBuyList", JSON.stringify(newVilaBuyList));
  }

  set((store: ZustandStore) => ({
    villaBuyList: [...store.villaBuyList.filter((item) => item.id != id)],
  }));
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
